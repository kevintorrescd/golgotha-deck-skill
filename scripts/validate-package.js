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
  "references/delivery-qa.md",
  "assets/template.html",
  "assets/template.html.artifact.json",
  "assets/logo.svg",
  "assets/tokens.css",
  "assets/brand/logo-lockup-light.svg",
  "assets/brand/logo-lockup-white.svg",
  "assets/brand/logo-lockup-black.svg",
  "assets/brand/logo-lockup-gray.svg",
  "assets/brand/logo-mark-green.svg",
  "assets/brand/logo-mark-white.svg",
  "assets/brand/logo-mark-black.svg",
  "assets/brand/logo-mark-gray.svg",
  "assets/backgrounds/grid-light.svg",
  "assets/backgrounds/grid-green.svg",
  "assets/backgrounds/grid-dark.svg",
  "assets/backgrounds/presenter-placeholder.svg",
  "assets/backgrounds/media-placeholder.svg",
  "examples/educational-synthetic.html",
  "examples/institutional-synthetic.html",
  "scripts/verify-presentation.js",
];

const docsToScan = [
  "SKILL.md",
  "DESIGN.md",
  "references/layouts.md",
  "references/checklist.md",
  "references/source-to-deck.md",
  "references/brand-assets.md",
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

if (errors.length === 0) {
  const template = read("assets/template.html");
  const layouts = read("references/layouts.md");
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

  if (!template.includes("brand/logo-lockup-light.svg") || !template.includes("brand/logo-lockup-white.svg")) {
    fail("Template must use positive and negative logo assets from assets/brand");
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
