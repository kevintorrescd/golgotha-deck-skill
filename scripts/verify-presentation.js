#!/usr/bin/env node

const fs = require("fs");
const os = require("os");
const path = require("path");
const { pathToFileURL } = require("url");

const ROOT = path.resolve(__dirname, "..");
const DEFAULT_WIDTH = 1280;
const DEFAULT_HEIGHT = 720;
const SEVERITY_ORDER = { error: 0, warning: 1, info: 2 };

function usage() {
  console.log(`Usage:
  node scripts/verify-presentation.js <presentation-file> [--out <qa-dir>] [--format pptx|html|auto]

Examples:
  node scripts/verify-presentation.js outputs/deck.pptx --out outputs/qa/deck
  node scripts/verify-presentation.js outputs/deck.pptx --out outputs/qa/deck --render
  node scripts/verify-presentation.js examples/educational-synthetic.html --out outputs/qa/html-check
`);
}

function parseArgs(argv) {
  const options = {
    input: null,
    outDir: null,
    format: "auto",
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    overlapRatio: 0.02,
    lineThickness: 10,
    lineLength: 42,
    render: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--out") {
      options.outDir = argv[++i];
    } else if (arg === "--format") {
      options.format = argv[++i] || "auto";
    } else if (arg === "--width") {
      options.width = Number(argv[++i]) || DEFAULT_WIDTH;
    } else if (arg === "--height") {
      options.height = Number(argv[++i]) || DEFAULT_HEIGHT;
    } else if (arg === "--overlap-ratio") {
      options.overlapRatio = Number(argv[++i]) || options.overlapRatio;
    } else if (arg === "--allow-thin-lines") {
      options.allowThinLines = true;
    } else if (arg === "--render") {
      options.render = true;
    } else if (!options.input) {
      options.input = arg;
    } else {
      throw new Error(`Unexpected argument: ${arg}`);
    }
  }

  return options;
}

function makeReport(input, format) {
  return {
    input: path.resolve(input),
    format,
    generatedAt: new Date().toISOString(),
    status: "pending",
    stats: {},
    findings: [],
    artifacts: {},
  };
}

function addFinding(report, severity, code, message, detail = {}) {
  report.findings.push({ severity, code, message, ...detail });
}

function inferFormat(input, requested) {
  if (requested && requested !== "auto") return requested.toLowerCase();
  const ext = path.extname(input).toLowerCase();
  if (ext === ".pptx") return "pptx";
  if (ext === ".html" || ext === ".htm") return "html";
  return ext.replace(/^\./, "") || "unknown";
}

function ensureFile(input) {
  if (!input) {
    usage();
    process.exit(2);
  }
  if (!fs.existsSync(input)) {
    throw new Error(`Input file does not exist: ${input}`);
  }
}

function ensureOutDir(outDir) {
  if (!outDir) return null;
  const resolved = path.resolve(outDir);
  fs.mkdirSync(resolved, { recursive: true });
  return resolved;
}

function parseNdjson(ndjson) {
  return String(ndjson || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function boxFromRecord(record) {
  if (!Array.isArray(record.bbox) || record.bbox.length < 4) return null;
  const [left, top, width, height] = record.bbox.map(Number);
  if (![left, top, width, height].every(Number.isFinite)) return null;
  return {
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    area: Math.max(0, width) * Math.max(0, height),
  };
}

function intersection(a, b) {
  const left = Math.max(a.left, b.left);
  const top = Math.max(a.top, b.top);
  const right = Math.min(a.right, b.right);
  const bottom = Math.min(a.bottom, b.bottom);
  const width = Math.max(0, right - left);
  const height = Math.max(0, bottom - top);
  return { left, top, right, bottom, width, height, area: width * height };
}

function containmentRatio(a, b) {
  const ix = intersection(a, b);
  const smaller = Math.min(a.area, b.area);
  if (smaller <= 0) return 0;
  return ix.area / smaller;
}

function overlapRatio(a, b) {
  const ix = intersection(a, b);
  const smaller = Math.min(a.area, b.area);
  if (smaller <= 0) return 0;
  return ix.area / smaller;
}

function isLineLike(box, options) {
  return (
    (box.height <= options.lineThickness && box.width >= options.lineLength) ||
    (box.width <= options.lineThickness && box.height >= options.lineLength)
  );
}

function isBackgroundLike(record, box, options) {
  const slideArea = options.width * options.height;
  return (
    ["image", "shape"].includes(record.kind) &&
    box.area >= slideArea * 0.82 &&
    box.left <= 4 &&
    box.top <= 4 &&
    box.right >= options.width - 4 &&
    box.bottom >= options.height - 4
  );
}

function isTextual(record) {
  return record.kind === "textbox" || record.kind === "table";
}

function isPrimaryVisual(record) {
  return ["image", "chart", "table"].includes(record.kind);
}

function shortText(record) {
  const text = record.textPreview || record.text || record.name || record.id || "";
  return String(text).replace(/\s+/g, " ").slice(0, 90);
}

function checkRecords(report, records, options) {
  const slides = records.filter((record) => record.kind === "slide");
  const items = records
    .map((record) => ({ record, box: boxFromRecord(record) }))
    .filter((item) => item.box && Number.isFinite(item.record.slide));

  report.stats.slides = slides.length;
  report.stats.positionedObjects = items.length;

  for (const item of items) {
    const { record, box } = item;
    if (box.width <= 0 || box.height <= 0) {
      addFinding(report, "error", "invalid-bounds", "Element has invalid bounds.", {
        slide: record.slide,
        objectId: record.id,
        kind: record.kind,
        bbox: record.bbox,
      });
    }

    if (box.left < -1 || box.top < -1 || box.right > options.width + 1 || box.bottom > options.height + 1) {
      addFinding(report, "error", "off-slide", "Element extends outside the slide canvas.", {
        slide: record.slide,
        objectId: record.id,
        kind: record.kind,
        bbox: record.bbox,
      });
    }

    if (!options.allowThinLines && record.kind === "shape" && isLineLike(box, options)) {
      addFinding(report, "error", "thin-decorative-line", "Thin line-like shape found; Golgotha decks should use spacing and hierarchy instead of decorative title lines.", {
        slide: record.slide,
        objectId: record.id,
        bbox: record.bbox,
      });
    }

    const text = `${record.text || ""} ${record.textPreview || ""}`;
    if (/\b(lorem ipsum|feature one|placeholder text)\b/i.test(text)) {
      addFinding(report, "error", "filler-text", "Filler text remains in the presentation.", {
        slide: record.slide,
        objectId: record.id,
        text: shortText(record),
      });
    }

    if (/\b(imagen pendiente|dato pendiente|fuente pendiente|pendiente)\b/i.test(text) || /(^|\s)(---|—)(\s|$)/.test(text)) {
      addFinding(report, "warning", "unresolved-placeholder", "A pending placeholder or missing-data marker remains; verify it is intentional before delivery.", {
        slide: record.slide,
        objectId: record.id,
        text: shortText(record),
      });
    }

    if (/^(ga|golgotha academy)$/i.test(String(record.textPreview || record.text || "").trim()) && box.top < 110 && box.width < 360) {
      addFinding(report, "warning", "possible-text-logo", "Possible text-built logo found; use real logo assets from assets/brand when the format supports images.", {
        slide: record.slide,
        objectId: record.id,
        text: shortText(record),
      });
    }
  }

  const bySlide = new Map();
  for (const item of items) {
    const slide = item.record.slide;
    if (!bySlide.has(slide)) bySlide.set(slide, []);
    bySlide.get(slide).push(item);
  }

  for (const [slide, slideItems] of bySlide.entries()) {
    for (let i = 0; i < slideItems.length; i += 1) {
      for (let j = i + 1; j < slideItems.length; j += 1) {
        const a = slideItems[i];
        const b = slideItems[j];
        if (isBackgroundLike(a.record, a.box, options) || isBackgroundLike(b.record, b.box, options)) continue;

        const ratio = overlapRatio(a.box, b.box);
        if (ratio < options.overlapRatio) continue;

        const nested = containmentRatio(a.box, b.box) >= 0.88;
        if (nested && (a.record.kind === "shape" || b.record.kind === "shape")) continue;
        if (isLineLike(a.box, options) || isLineLike(b.box, options)) continue;

        const bothText = isTextual(a.record) && isTextual(b.record);
        const textAndVisual =
          (isTextual(a.record) && isPrimaryVisual(b.record)) ||
          (isTextual(b.record) && isPrimaryVisual(a.record));

        if (bothText || textAndVisual) {
          addFinding(report, "error", "object-overlap", "Objects overlap in a way likely to affect readability.", {
            slide,
            overlapRatio: Number(ratio.toFixed(3)),
            a: { id: a.record.id, kind: a.record.kind, text: shortText(a.record), bbox: a.record.bbox },
            b: { id: b.record.id, kind: b.record.kind, text: shortText(b.record), bbox: b.record.bbox },
          });
        } else if (a.record.kind === "shape" && b.record.kind === "shape" && ratio >= 0.05) {
          addFinding(report, "error", "shape-overlap", "Large layout shapes overlap; this usually means cards, blocks, or media frames are colliding.", {
            slide,
            overlapRatio: Number(ratio.toFixed(3)),
            a: { id: a.record.id, kind: a.record.kind, bbox: a.record.bbox },
            b: { id: b.record.id, kind: b.record.kind, bbox: b.record.bbox },
          });
        } else if (isPrimaryVisual(a.record) || isPrimaryVisual(b.record)) {
          addFinding(report, "warning", "visual-overlap", "Visual objects overlap; inspect the rendered slide to confirm this is intentional.", {
            slide,
            overlapRatio: Number(ratio.toFixed(3)),
            a: { id: a.record.id, kind: a.record.kind, bbox: a.record.bbox },
            b: { id: b.record.id, kind: b.record.kind, bbox: b.record.bbox },
          });
        }
      }
    }
  }
}

async function loadArtifactTool() {
  const candidates = [
    "@oai/artifact-tool",
    path.join(process.cwd(), "node_modules", "@oai", "artifact-tool", "dist", "artifact_tool.mjs"),
    path.resolve(path.dirname(process.execPath), "..", "node_modules", "@oai", "artifact-tool", "dist", "artifact_tool.mjs"),
    path.join(os.homedir(), ".cache", "codex-runtimes", "codex-primary-runtime", "dependencies", "node", "node_modules", "@oai", "artifact-tool", "dist", "artifact_tool.mjs"),
  ];

  const errors = [];
  for (const candidate of candidates) {
    try {
      if (candidate.startsWith("@")) return await import(candidate);
      if (fs.existsSync(candidate)) return await import(pathToFileURL(candidate).href);
    } catch (error) {
      errors.push(`${candidate}: ${error.message}`);
    }
  }

  throw new Error(
    "PPTX inspection engine was not found. Run this verifier in an environment that can read PPTX layout data, or render the deck and complete the manual QA checklist.\n" +
      errors.map((item) => `- ${item}`).join("\n"),
  );
}

async function writeBlob(filePath, blob) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  fs.writeFileSync(filePath, bytes);
}

async function verifyPptx(input, report, options) {
  const { FileBlob, PresentationFile } = await loadArtifactTool();
  const presentation = await PresentationFile.importPptx(await FileBlob.load(input));
  const inspection = await presentation.inspect({
    kind: "slide,textbox,shape,image,table,chart,layout,notes",
    maxChars: 500000,
  });

  const records = parseNdjson(inspection.ndjson || inspection);
  checkRecords(report, records, options);

  if (options.outDir) {
    const inspectPath = path.join(options.outDir, "inspect.ndjson");
    fs.writeFileSync(inspectPath, inspection.ndjson || String(inspection), "utf8");
    report.artifacts.inspect = inspectPath;

    if (options.render) {
      try {
        const montagePath = path.join(options.outDir, "montage.webp");
        await writeBlob(montagePath, await presentation.export({ format: "webp", montage: true, scale: 1 }));
        report.artifacts.montage = montagePath;
      } catch (error) {
        addFinding(report, "warning", "montage-render-failed", "Could not render montage preview.", { detail: error.message });
      }
    }

    if (options.render && presentation.slides && Array.isArray(presentation.slides.items)) {
      const previewDir = path.join(options.outDir, "slides");
      fs.mkdirSync(previewDir, { recursive: true });
      for (const [index, slide] of presentation.slides.items.entries()) {
        const stem = `slide-${String(index + 1).padStart(2, "0")}`;
        try {
          await writeBlob(path.join(previewDir, `${stem}.png`), await presentation.export({ slide, format: "png", scale: 1 }));
          const layout = await slide.export({ format: "layout" });
          fs.writeFileSync(path.join(previewDir, `${stem}.layout.json`), await layout.text(), "utf8");
        } catch (error) {
          addFinding(report, "warning", "slide-render-failed", "Could not render one slide preview.", {
            slide: index + 1,
            detail: error.message,
          });
        }
      }
      report.artifacts.slidePreviews = previewDir;
    } else if (!options.render) {
      addFinding(report, "info", "render-not-requested", "Automatic layout checks ran without preview rendering. Use --render or inspect exported slide images before delivery.");
    }
  }
}

function verifyHtml(input, report) {
  const html = fs.readFileSync(input, "utf8");
  const classLists = [...html.matchAll(/class\s*=\s*["']([^"']+)["']/gi)]
    .map((match) => match[1].split(/\s+/).filter(Boolean));
  const slideClassLists = classLists.filter((classes) => classes.includes("slide"));

  report.stats.bytes = Buffer.byteLength(html, "utf8");
  report.stats.slides = slideClassLists.length;

  if (/accent-bar/.test(html)) {
    addFinding(report, "error", "accent-bar", "Decorative accent bars are not allowed in the Golgotha deck system.");
  }
  if (/filter:\s*brightness/i.test(html)) {
    addFinding(report, "error", "logo-filter", "Logo variants must be real assets, not simulated with CSS filters.");
  }
  if (/\b(lorem ipsum|feature one|placeholder text)\b/i.test(html)) {
    addFinding(report, "error", "filler-text", "Filler text remains in the HTML source.");
  }
  if (/\b(imagen pendiente|dato pendiente|fuente pendiente|pendiente)\b/i.test(html)) {
    addFinding(report, "warning", "unresolved-placeholder", "A pending placeholder remains; verify it is intentional before delivery.");
  }
  if (/assets\/logo\.svg|src=["'][^"']*logo\.svg/i.test(html)) {
    addFinding(report, "warning", "raw-logo-source", "HTML references the raw logo source; prefer a specific variant from assets/brand.");
  }
  if (/brand\/logo-(?:lockup|mark)-[^"')\s]+\.svg/i.test(html)) {
    addFinding(report, "error", "svg-logo-variant", "Logo variants must use transparent PNG files from assets/brand, not SVG files.");
  }
  if (/backgrounds\/(?:grid-(?:light|green|dark)|presenter-placeholder|media-placeholder)\.svg/i.test(html)) {
    addFinding(report, "error", "svg-background-asset", "Background and placeholder assets must use PNG files from assets/backgrounds, not SVG files.");
  }

  const isNavigableDeck = classLists.some((classes) => classes.includes("deck-stage")) || /id=["']deck-stage["']/.test(html);
  const activeSlides = slideClassLists.filter((classes) => classes.includes("active")).length;
  if (isNavigableDeck && report.stats.slides > 0 && activeSlides !== 1) {
    addFinding(report, "error", "active-slide-count", "HTML reference decks should have exactly one active slide by default.", {
      activeSlides,
    });
  }

  addFinding(report, "info", "manual-visual-review", "HTML overlap requires rendered visual review. Export or open the presentation and inspect every slide before delivery.");
}

function verifyUnsupported(report, format) {
  addFinding(report, "error", "unsupported-format", `Automatic layout verification is not implemented for ${format || "this format"}. Render the presentation and complete references/delivery-qa.md before delivery.`);
}

function printReport(report) {
  const counts = report.findings.reduce(
    (acc, finding) => {
      acc[finding.severity] = (acc[finding.severity] || 0) + 1;
      return acc;
    },
    { error: 0, warning: 0, info: 0 },
  );

  console.log(`Verification ${report.status}: ${report.input}`);
  console.log(`Findings: ${counts.error || 0} error(s), ${counts.warning || 0} warning(s), ${counts.info || 0} info`);
  if (report.stats.slides) console.log(`Slides: ${report.stats.slides}`);

  const sorted = [...report.findings].sort((a, b) => {
    const severity = SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity];
    if (severity !== 0) return severity;
    return String(a.code).localeCompare(String(b.code));
  });

  for (const finding of sorted.slice(0, 40)) {
    const where = finding.slide ? ` slide ${finding.slide}` : "";
    console.log(`- [${finding.severity}]${where} ${finding.code}: ${finding.message}`);
  }
  if (sorted.length > 40) console.log(`- ... ${sorted.length - 40} more finding(s) in report.json`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    usage();
    return;
  }

  ensureFile(options.input);
  options.outDir = ensureOutDir(options.outDir);

  const format = inferFormat(options.input, options.format);
  const report = makeReport(options.input, format);

  if (format === "pptx") {
    await verifyPptx(path.resolve(options.input), report, options);
  } else if (format === "html" || format === "htm") {
    verifyHtml(path.resolve(options.input), report);
  } else {
    verifyUnsupported(report, format);
  }

  const errors = report.findings.filter((finding) => finding.severity === "error");
  report.status = errors.length > 0 ? "failed" : "passed";

  if (options.outDir) {
    const reportPath = path.join(options.outDir, "report.json");
    report.artifacts.report = reportPath;
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), "utf8");
  }

  printReport(report);
  process.exit(errors.length > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error(`Verification failed to run: ${error.message}`);
  process.exitCode = 1;
});
