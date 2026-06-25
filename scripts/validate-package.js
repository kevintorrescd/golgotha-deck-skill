#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const rel = (...parts) => path.join(root, ...parts);

const requiredFiles = [
  "SKILL.md",
  "DESIGN.md",
  "references/layouts.md",
  "references/checklist.md",
  "references/source-to-deck.md",
  "references/brand-assets.md",
  "references/production-engines.md",
  "references/delivery-qa.md",
  "assets/template.html",
  "assets/template.html.artifact.json",
  "assets/logo.png",
  "assets/tokens.css",
  "assets/brand/logo-lockup-light.png",
  "assets/brand/logo-lockup-white.png",
  "assets/brand/logo-lockup-black.png",
  "assets/brand/logo-lockup-gray.png",
  "assets/brand/logo-mark-green.png",
  "assets/brand/logo-mark-white.png",
  "assets/brand/logo-mark-black.png",
  "assets/brand/logo-mark-gray.png",
  "assets/backgrounds/grid-light.png",
  "assets/backgrounds/grid-green.png",
  "assets/backgrounds/grid-dark.png",
  "assets/backgrounds/presenter-placeholder.png",
  "assets/backgrounds/media-placeholder.png",
  "examples/educational-synthetic.html",
  "examples/institutional-synthetic.html",
  "examples/charts-explanatory.html",
  "scripts/verify-presentation.js",
];

const docsToScan = [
  "SKILL.md",
  "DESIGN.md",
  "references/layouts.md",
  "references/checklist.md",
  "references/source-to-deck.md",
  "references/brand-assets.md",
  "references/production-engines.md",
  "references/delivery-qa.md",
];

const errors = [];
const warnings = [];

function read(file) {
  return fs.readFileSync(rel(file), "utf8");
}

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

  for (const file of requiredFiles) {
  if (!fs.existsSync(rel(file))) fail(`Missing required file: ${file}`);
}

for (const file of fs.readdirSync(rel("assets"), { recursive: true })) {
  if (typeof file === "string" && file.toLowerCase().endsWith(".svg")) {
    fail(`SVG files are not allowed in packaged assets: assets/${file}`);
  }
}

if (errors.length === 0) {
  const template = read("assets/template.html");
  const layouts = read("references/layouts.md");
  const examples = [
    read("examples/educational-synthetic.html"),
    read("examples/institutional-synthetic.html"),
    read("examples/charts-explanatory.html"),
  ].join("\n");
  const artifact = JSON.parse(read("assets/template.html.artifact.json"));

  const requiredTemplateFragments = [
    ".deck-shell",
    ".deck-stage",
    ".slide",
    ".deck-counter",
    ".deck-hint",
    "@media print",
    "function fit()",
    "function onKey(e)",
  ];
  for (const fragment of requiredTemplateFragments) {
    if (!template.includes(fragment)) fail(`Template is missing framework fragment: ${fragment}`);
  }

  for (const cls of ["specimen-grid", "specimen", "thumb", "placeholder"]) {
    if (!template.includes(`.${cls}`)) fail(`Template CSS is missing .${cls}`);
  }

  if (/accent-bar/.test(template) || /accent-bar/.test(layouts)) {
    fail("accent-bar is not allowed; use spacing, hierarchy, and media scale instead of decorative title bars");
  }

  if (/filter:\s*brightness/i.test(template)) {
    fail("Template must use real logo variants from assets/brand instead of CSS filter inversion");
  }

  if (!template.includes("brand/logo-lockup-light.png") || !template.includes("brand/logo-lockup-white.png")) {
    fail("Template must use positive and negative logo assets from assets/brand");
  }

  if (/brand\/logo-(?:lockup|mark)-[^"')\s]+\.svg/i.test(template) || /brand\/logo-(?:lockup|mark)-[^"')\s]+\.svg/i.test(layouts)) {
    fail("Logo variants used in deliverables must be transparent PNG files, not SVG files");
  }

  for (const background of ["grid-light.png", "grid-green.png", "grid-dark.png", "media-placeholder.png"]) {
    if (!template.includes(`backgrounds/${background}`)) {
      fail(`Template must use the packaged background asset: backgrounds/${background}`);
    }
  }

  for (const background of ["grid-light.png", "grid-green.png", "grid-dark.png"]) {
    if (!examples.includes(`backgrounds/${background}`)) {
      fail(`Synthetic examples must use the packaged background asset: backgrounds/${background}`);
    }
  }

  if (/backgrounds\/(?:grid-(?:light|green|dark)|presenter-placeholder|media-placeholder)\.svg/i.test(`${template}\n${layouts}\n${examples}`)) {
    fail("Background assets used in deliverables must be PNG files, not SVG files");
  }

  const placeholderBlock = template.match(/\.placeholder\s*\{[\s\S]*?\}/);
  if (!placeholderBlock) {
    fail("Template CSS is missing .placeholder block");
  } else {
    const block = placeholderBlock[0];
    if (!/width:\s*100%/.test(block) || !/height:\s*100%/.test(block)) {
      fail(".placeholder must be full-size in the reference template");
    }
  }

  if (artifact.entry !== "template.html") {
    fail('Artifact entry must be portable: "template.html"');
  }

  const cssClasses = new Set();
  for (const match of template.matchAll(/\.([a-zA-Z_][\w-]*)/g)) {
    cssClasses.add(match[1]);
  }

  const usedClasses = new Set();
  const classAttrPattern = /class="([^"]+)"/g;
  for (const source of [template, layouts]) {
    for (const match of source.matchAll(classAttrPattern)) {
      for (const cls of match[1].split(/\s+/).filter(Boolean)) {
        usedClasses.add(cls);
      }
    }
  }

  const allowedDynamic = new Set(["active"]);
  const missingClasses = [...usedClasses]
    .filter((cls) => !cssClasses.has(cls) && !allowedDynamic.has(cls))
    .sort();
  if (missingClasses.length > 0) {
    fail(`Classes used by template/layout references but not defined in template CSS: ${missingClasses.join(", ")}`);
  }

  const mandatoryHtmlPatterns = [
    /\bdebe\s+generar\s+html\b/i,
    /\bgenera\s+html\b/i,
    /\bhtml\s+obligatorio\b/i,
    /\bdebe\s+usar\s+html\b/i,
    /\bcopiar\s+`?assets\/template\.html`?\s+al\s+proyecto\b/i,
    /\bpegar\s+dentro\s+de\s+`?\.deck-stage`?\b/i,
  ];

  const prohibitedToolPatterns = [
    /\bopen\s*design\b/i,
    /\bopendesign\b/i,
    /\bkimi\b/i,
    /\bcodex\b/i,
    /\bllm\b/i,
    /\bmodelo\s+de\s+lenguaje\b/i,
    /\bprograma\s+de\s+ia\b/i,
  ];

  for (const file of docsToScan) {
    const content = read(file);
    for (const pattern of mandatoryHtmlPatterns) {
      if (pattern.test(content)) fail(`${file} implies HTML is mandatory: ${pattern}`);
    }
    for (const pattern of prohibitedToolPatterns) {
      if (pattern.test(content)) fail(`${file} mentions a specific external generation tool or model: ${pattern}`);
    }
  }

  const checklist = read("references/checklist.md");
  if (!/Universal/.test(checklist) || !/opcional si se usa la plantilla HTML/i.test(checklist)) {
    fail("Checklist must separate universal validation from optional HTML validation");
  }
  if (!/verify-presentation\.js/.test(checklist)) {
    fail("Checklist must require the pre-delivery presentation verifier when the final format supports it");
  }

  const skill = read("SKILL.md");
  if (!/verify-presentation\.js/.test(skill) || !/delivery-qa\.md/.test(skill)) {
    fail("SKILL.md must document the pre-delivery QA verifier and delivery-qa reference");
  }
  if (!/production-engines\.md/.test(skill) || !/pptxgenjs/.test(skill) || !/python-pptx/.test(skill)) {
    fail("SKILL.md must require production engine selection before final deck generation");
  }

  const deliveryQa = read("references/delivery-qa.md");
  for (const term of ["superposicion", "fuera del canvas", "lineas decorativas", "placeholders"]) {
    if (!deliveryQa.toLowerCase().includes(term)) fail(`delivery-qa.md is missing QA topic: ${term}`);
  }

  const sourceGuide = read("references/source-to-deck.md");
  for (const heading of ["Lectura inicial", "Decidir número de slides", "Mapeo de contenido", "Manejo de datos faltantes"]) {
    if (!sourceGuide.includes(heading)) fail(`source-to-deck.md is missing section: ${heading}`);
  }

  const optionalHtmlCount = (layouts.match(/```html/g) || []).length;
  if (optionalHtmlCount < 9) {
    warn(`layouts.md has ${optionalHtmlCount} optional HTML examples; expected at least 9 core examples`);
  }
}

if (warnings.length > 0) {
  console.log("Warnings:");
  for (const message of warnings) console.log(`- ${message}`);
  console.log("");
}

if (errors.length > 0) {
  console.error("Validation failed:");
  for (const message of errors) console.error(`- ${message}`);
  process.exit(1);
}

console.log("Validation passed: Golgotha deck skill package is consistent.");
