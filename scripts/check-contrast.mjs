import { readFileSync } from "node:fs";

const TEXT = 4.5;
const UI = 3;

const pairs = [
  ["text", "bg", TEXT],
  ["text", "surface", TEXT],
  ["text", "surface-hover", TEXT],
  ["text-muted", "bg", TEXT],
  ["text-muted", "surface", TEXT],
  ["accent", "bg", TEXT],
  ["accent", "surface", TEXT],
  ["accent-hover", "bg", TEXT],
  ["on-accent", "accent", TEXT],
  ["on-accent", "accent-hover", TEXT],
  ["danger", "bg", TEXT],
  ["danger", "surface", TEXT],
  ["success", "bg", TEXT],
  ["success", "surface", TEXT],
  ["warning", "bg", TEXT],
  ["warning", "surface", TEXT],
  ["focus", "bg", UI],
  ["focus", "surface", UI],
];

const css = readFileSync(new URL("../tokens.css", import.meta.url), "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
const rootBlock = css.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
const tokens = Object.fromEntries(
  [...rootBlock.matchAll(/(--gv-[\w-]+)\s*:\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()])
);

function resolve(value, theme, seen = []) {
  const lightDark = value.match(/^light-dark\(\s*(.+?)\s*,\s*(.+)\s*\)$/);
  if (lightDark) return resolve(theme === "light" ? lightDark[1] : lightDark[2], theme, seen);

  const reference = value.match(/^var\(\s*(--gv-[\w-]+)\s*\)$/);
  if (reference) {
    const name = reference[1];
    if (seen.includes(name)) throw new Error(`Referência circular: ${[...seen, name].join(" → ")}`);
    if (!(name in tokens)) throw new Error(`Token não encontrado: ${name}`);
    return resolve(tokens[name], theme, [...seen, name]);
  }

  if (/^#[0-9a-f]{6}$/i.test(value)) return value.toLowerCase();
  throw new Error(`Valor que o script não sabe resolver: ${value}`);
}

function luminance(hex) {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

let failures = 0;

for (const theme of ["light", "dark"]) {
  console.log(`\nTema ${theme === "light" ? "claro" : "escuro"}`);

  for (const [fg, bg, minimum] of pairs) {
    const fgHex = resolve(`var(--gv-color-${fg})`, theme);
    const bgHex = resolve(`var(--gv-color-${bg})`, theme);
    const ratio = contrast(fgHex, bgHex);
    const ok = ratio >= minimum;
    if (!ok) failures++;

    const label = `${fg} sobre ${bg}`.padEnd(28);
    console.log(`  ${ok ? "ok   " : "FALHA"} ${label} ${fgHex} / ${bgHex}  ${ratio.toFixed(2)}:1 (mínimo ${minimum}:1)`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} par(es) abaixo do contraste mínimo.`);
  process.exit(1);
}

console.log("\nTodos os pares passam no contraste mínimo.");
