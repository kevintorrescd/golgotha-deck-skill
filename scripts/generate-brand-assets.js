#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const sourceLogo = path.join(root, "assets", "logo.svg");
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

function write(file, content) {
  fs.writeFileSync(file, content.replace(/\n{3,}/g, "\n\n"), "utf8");
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

const source = fs.readFileSync(sourceLogo, "utf8");

write(path.join(brandDir, "logo-mark-white.svg"), markSvg(source, palette.white));
write(path.join(brandDir, "logo-mark-black.svg"), markSvg(source, palette.fg));
write(path.join(brandDir, "logo-mark-green.svg"), markSvg(source, palette.accentDeep));
write(path.join(brandDir, "logo-mark-gray.svg"), markSvg(source, palette.gray));

write(path.join(brandDir, "logo-lockup-light.svg"), lockupSvg(source, palette.accentDeep, palette.fg, "positive color lockup"));
write(path.join(brandDir, "logo-lockup-white.svg"), lockupSvg(source, palette.white, palette.white, "negative white lockup"));
write(path.join(brandDir, "logo-lockup-black.svg"), lockupSvg(source, palette.fg, palette.fg, "black lockup"));
write(path.join(brandDir, "logo-lockup-gray.svg"), lockupSvg(source, palette.gray, palette.gray, "grayscale lockup"));

write(
  path.join(bgDir, "grid-green.svg"),
  gridBackground({ name: "Golgotha green grid background", base: palette.accentDeep, line: "rgba(255,255,255,0.18)", glow: palette.accent, dark: true }),
);
write(
  path.join(bgDir, "grid-dark.svg"),
  gridBackground({ name: "Golgotha dark grid background", base: palette.dark, line: "rgba(255,255,255,0.08)", glow: palette.darkSoft, dark: true }),
);
write(
  path.join(bgDir, "grid-light.svg"),
  gridBackground({ name: "Golgotha light grid background", base: palette.bg, line: "rgba(17,17,17,0.055)", glow: palette.surface, dark: false }),
);
write(
  path.join(bgDir, "presenter-placeholder.svg"),
  placeholder({ name: "Presenter image placeholder", bg: palette.neutral, fg: palette.muted, border: "#D1D5DB", label: "Espacio para imagen del presentador" }),
);
write(
  path.join(bgDir, "media-placeholder.svg"),
  placeholder({ name: "Media placeholder", bg: palette.surface, fg: palette.muted, border: palette.border, label: "Espacio para imagen o recurso visual" }),
);

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

console.log(`Generated brand assets in ${brandDir}`);
console.log(`Generated background assets in ${bgDir}`);
