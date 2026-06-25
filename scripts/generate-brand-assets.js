#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourceLogo = process.env.GA_LOGO_SOURCE ? path.resolve(process.env.GA_LOGO_SOURCE) : null;
const brandDir = path.join(root, "assets", "brand");
const bgDir = path.join(root, "assets", "backgrounds");

const palette = {
  bg: "#F8FAFC",
  surface: "#FFFFFF",
  fg: "#111111",
  muted: "#4B5563",
  neutral: "#F3F4F6",
  border: "#E5E7EB",
  accent: "#00D47E",
  accentDeep: "#059669",
  accentSoft: "#ECFDF5",
  dark: "#111111",
  darkSoft: "#242424",
  gray: "#6B7280",
  white: "#FFFFFF",
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function normalize(content) {
  return content.replace(/\n{3,}/g, "\n\n");
}

function write(file, content) {
  fs.writeFileSync(file, normalize(content), "utf8");
}

async function writePng(sharp, file, svg, width, height) {
  await sharp(Buffer.from(normalize(svg)), { density: 288 })
    .resize(width, height, { fit: "contain" })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(file);
}

function removeOldBrandSvgFiles() {
  for (const file of fs.readdirSync(brandDir)) {
    if (/^logo-(mark|lockup)-.*\.svg$/i.test(file)) {
      fs.rmSync(path.join(brandDir, file));
    }
  }
}

function removeOldBackgroundSvgFiles() {
  for (const file of fs.readdirSync(bgDir)) {
    if (/^(grid-(light|green|dark)|presenter-placeholder|media-placeholder)\.svg$/i.test(file)) {
      fs.rmSync(path.join(bgDir, file));
    }
  }
}

function requireSharp() {
  let lastError;
  try {
    return require("sharp");
  } catch (error) {
    lastError = error;
  }

  for (const nodePath of (process.env.NODE_PATH || "").split(path.delimiter).filter(Boolean)) {
    try {
      return require(require.resolve("sharp", { paths: [nodePath] }));
    } catch (error) {
      lastError = error;
      // Try the next NODE_PATH entry.
    }
  }

  const detail = lastError && lastError.message ? ` Last error: ${lastError.message}` : "";
  throw new Error(
    `Missing dependency: sharp. Install it locally with \`npm install sharp\` or run this script with NODE_PATH pointing to a Node runtime that includes sharp and its dependencies.${detail}`,
  );
}

function recolor(svg, color) {
  return svg
    .replace(/<\?xml[\s\S]*?\?>\s*/i, "")
    .replace(/<!DOCTYPE[\s\S]*?>\s*/i, "")
    .replace(/fill:white/g, `fill:${color}`)
    .replace(/fill-opacity:0\.99/g, "fill-opacity:1");
}

function innerSvg(svg) {
  return svg.replace(/^[\s\S]*?<svg[^>]*>/i, "").replace(/<\/svg>\s*$/i, "");
}

function markSvg(source, color) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="100%" height="100%" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
${innerSvg(recolor(source, color))}
</svg>
`;
}

function lockupSvg(source, markColor, textColor, name) {
  const mark = innerSvg(recolor(source, markColor));
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="900" height="180" viewBox="0 0 900 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Golgotha Academy ${name}">
  <defs>
    <symbol id="ga-mark" viewBox="0 0 2048 2048">
      ${mark}
    </symbol>
  </defs>
  <use href="#ga-mark" x="0" y="20" width="140" height="140"/>
  <text x="166" y="110" fill="${textColor}" font-family="Montserrat, Inter, Arial, sans-serif" font-size="54" font-weight="800" letter-spacing="-1">Golgotha Academy</text>
</svg>
`;
}

function gridBackground({ name, base, line, glow, dark = false }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${name}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${base}"/>
      <stop offset="1" stop-color="${glow}"/>
    </linearGradient>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M 64 0 L 0 0 0 64" fill="none" stroke="${line}" stroke-width="1"/>
    </pattern>
    <radialGradient id="light" cx="50%" cy="100%" r="75%">
      <stop offset="0" stop-color="${dark ? "#00D47E" : "#FFFFFF"}" stop-opacity="${dark ? "0.16" : "0.30"}"/>
      <stop offset="1" stop-color="${dark ? "#00D47E" : "#FFFFFF"}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#bg)"/>
  <rect width="1920" height="1080" fill="url(#grid)" opacity="0.72"/>
  <rect width="1920" height="1080" fill="url(#light)"/>
</svg>
`;
}

function placeholder({ name, bg, fg, border, label }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${name}">
  <defs>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="${border}" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1280" height="720" rx="52" fill="${bg}"/>
  <rect width="1280" height="720" rx="52" fill="url(#grid)" opacity="0.7"/>
  <text x="640" y="368" text-anchor="middle" fill="${fg}" font-family="Montserrat, Inter, Arial, sans-serif" font-size="32" font-weight="700">${label}</text>
</svg>
`;
}

ensureDir(brandDir);
ensureDir(bgDir);

async function renderPngVariants() {
  const sharp = requireSharp();

  removeOldBrandSvgFiles();

  if (sourceLogo) {
    if (!fs.existsSync(sourceLogo)) {
      throw new Error(`GA_LOGO_SOURCE does not exist: ${sourceLogo}`);
    }

    const source = fs.readFileSync(sourceLogo, "utf8");
    const variants = [
      ["logo-mark-white", markSvg(source, palette.white), 1024, 1024],
      ["logo-mark-black", markSvg(source, palette.fg), 1024, 1024],
      ["logo-mark-green", markSvg(source, palette.accentDeep), 1024, 1024],
      ["logo-mark-gray", markSvg(source, palette.gray), 1024, 1024],
      ["logo-lockup-light", lockupSvg(source, palette.accentDeep, palette.fg, "positive color lockup"), 1800, 360],
      ["logo-lockup-white", lockupSvg(source, palette.white, palette.white, "negative white lockup"), 1800, 360],
      ["logo-lockup-black", lockupSvg(source, palette.fg, palette.fg, "black lockup"), 1800, 360],
      ["logo-lockup-gray", lockupSvg(source, palette.gray, palette.gray, "grayscale lockup"), 1800, 360],
    ];

    await writePng(sharp, path.join(root, "assets", "logo.png"), markSvg(source, palette.accentDeep), 1024, 1024);

    for (const [name, svg, width, height] of variants) {
      await writePng(sharp, path.join(brandDir, `${name}.png`), svg, width, height);
    }
  }

  const backgrounds = [
    [
      "grid-green",
      gridBackground({ name: "Golgotha green grid background", base: palette.accentDeep, line: "rgba(255,255,255,0.18)", glow: palette.accent, dark: true }),
      1920,
      1080,
    ],
    [
      "grid-dark",
      gridBackground({ name: "Golgotha dark grid background", base: palette.dark, line: "rgba(255,255,255,0.08)", glow: palette.darkSoft, dark: true }),
      1920,
      1080,
    ],
    [
      "grid-light",
      gridBackground({ name: "Golgotha light grid background", base: palette.bg, line: "rgba(17,17,17,0.055)", glow: palette.surface, dark: false }),
      1920,
      1080,
    ],
    [
      "presenter-placeholder",
      placeholder({ name: "Presenter image placeholder", bg: palette.neutral, fg: palette.muted, border: "#D1D5DB", label: "Espacio para imagen del presentador" }),
      1280,
      720,
    ],
    [
      "media-placeholder",
      placeholder({ name: "Media placeholder", bg: palette.surface, fg: palette.muted, border: palette.border, label: "Espacio para imagen o recurso visual" }),
      1280,
      720,
    ],
  ];

  removeOldBackgroundSvgFiles();
  for (const [name, svg, width, height] of backgrounds) {
    await writePng(sharp, path.join(bgDir, `${name}.png`), svg, width, height);
  }
}

write(
  path.join(root, "assets", "tokens.css"),
  `:root {
  --ga-bg: ${palette.bg};
  --ga-surface: ${palette.surface};
  --ga-fg: ${palette.fg};
  --ga-muted: ${palette.muted};
  --ga-neutral: ${palette.neutral};
  --ga-border: ${palette.border};
  --ga-accent: ${palette.accent};
  --ga-accent-deep: ${palette.accentDeep};
  --ga-accent-soft: ${palette.accentSoft};
  --ga-dark: ${palette.dark};
  --ga-dark-soft: ${palette.darkSoft};
  --ga-danger: #FF4444;
}
`,
);

renderPngVariants()
  .then(() => {
    console.log(sourceLogo ? `Generated brand assets in ${brandDir}` : "Skipped brand assets; set GA_LOGO_SOURCE to regenerate logo PNGs.");
    console.log(`Generated background assets in ${bgDir}`);
  })
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
