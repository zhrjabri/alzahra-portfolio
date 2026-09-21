#!/usr/bin/env node
/**
 * Fails the build if an emoji — or an emoji-style arrow used as a UI
 * affordance — appears in a source file.
 *
 * The portfolio draws its arrows and external-link marks as hairline SVGs in
 * components/icons, so no glyph should ever stand in for one again. Editorial
 * punctuation (— – ’ “ ” · … ° × © ® ™) is typesetting, not decoration, and
 * is deliberately allowed.
 *
 * Usage: node scripts/check-no-emoji.mjs [paths...]   (defaults to the repo)
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { relative, resolve, join, extname, basename, sep } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");

/** Generated output, dependencies and version-control metadata. */
const IGNORED_DIRS = new Set([
  ".git",
  ".next",
  ".turbo",
  ".vercel",
  "build",
  "coverage",
  "dist",
  "node_modules",
  "out",
]);

/** Lockfiles and build caches: machine-written, never hand-edited. */
const IGNORED_FILES = new Set([
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
  "tsconfig.tsbuildinfo",
]);

/** Binary assets, which have no lines to report. */
const BINARY_EXTENSIONS = new Set([
  ".avif", ".bmp", ".eot", ".gif", ".gz", ".ico", ".jpeg", ".jpg", ".mp3",
  ".mp4", ".otf", ".pdf", ".png", ".ttf", ".webm", ".webp", ".woff", ".woff2",
  ".zip",
]);

/**
 * Text symbols that are emoji only when a variation selector asks for an
 * emoji rendering; bare, they are ordinary typography.
 */
const TEXT_SYMBOLS = new Set([0x00a9, 0x00ae, 0x2122]);

const PICTOGRAPHIC = /\p{Extended_Pictographic}/u;

/** Arrow and dingbat glyphs the icon set replaced. */
const ARROW_RANGES = [
  [0x2190, 0x21ff], // arrows
  [0x2794, 0x27bf], // dingbat arrows
  [0x2b00, 0x2bff], // misc symbols and arrows
];

function classify(codePoint, char) {
  if (codePoint === 0xfe0f) return "emoji variation selector";
  if (codePoint === 0x20e3) return "keycap";
  if (codePoint >= 0x1f1e6 && codePoint <= 0x1f1ff) return "regional indicator";
  if (codePoint >= 0x1f000 && codePoint <= 0x1faff) return "emoji";
  if (ARROW_RANGES.some(([lo, hi]) => codePoint >= lo && codePoint <= hi)) {
    return "arrow glyph (use components/icons instead)";
  }
  if (PICTOGRAPHIC.test(char) && !TEXT_SYMBOLS.has(codePoint)) return "emoji";
  return null;
}

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) continue;
      yield* walk(join(dir, entry.name));
    } else if (entry.isFile()) {
      yield join(dir, entry.name);
    }
  }
}

function collectFiles(targets) {
  const files = [];
  for (const target of targets) {
    const full = resolve(ROOT, target);
    if (statSync(full).isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files.filter((file) => {
    if (IGNORED_FILES.has(basename(file))) return false;
    if (BINARY_EXTENSIONS.has(extname(file).toLowerCase())) return false;
    return !relative(ROOT, file)
      .split(sep)
      .some((segment) => IGNORED_DIRS.has(segment));
  });
}

const findings = [];

for (const file of collectFiles(process.argv.slice(2).length ? process.argv.slice(2) : [ROOT])) {
  let source;
  try {
    source = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  if (source.includes("\u0000")) continue; // binary file with an unlisted extension

  source.split(/\r?\n/).forEach((line, index) => {
    let column = 0;
    for (const char of line) {
      column += 1;
      const codePoint = char.codePointAt(0);
      if (codePoint < 0x00a9) continue;
      const kind = classify(codePoint, char);
      if (!kind) continue;
      findings.push({
        file: relative(ROOT, file).split(sep).join("/"),
        line: index + 1,
        column,
        char,
        codePoint,
        kind,
        text: line.trim(),
      });
    }
  });
}

if (findings.length === 0) {
  console.log("check-no-emoji: no emoji found.");
  process.exit(0);
}

console.error(`check-no-emoji: found ${findings.length} disallowed character(s).\n`);
for (const f of findings) {
  const hex = f.codePoint.toString(16).toUpperCase().padStart(4, "0");
  console.error(`${f.file}:${f.line}:${f.column}  ${f.kind}  "${f.char}" (U+${hex})`);
  console.error(`    ${f.text}\n`);
}
console.error("Use an icon from components/icons, or remove the character.");
process.exit(1);
