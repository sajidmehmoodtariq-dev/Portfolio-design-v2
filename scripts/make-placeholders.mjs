// Generates the placeholder project screenshots in public/projects/.
// Run with:  node scripts/make-placeholders.mjs
// Replace the PNGs later with real screenshots of the same name and size
// (desktop 1600×1000, mobile 780×1690).

import { mkdirSync } from "node:fs";
import sharp from "sharp";

const OUT = "public/projects";
mkdirSync(OUT, { recursive: true });

// Palette for the fake app UIs
const C = {
  frame: "#121117",
  panel: "#1a1820",
  panel2: "#221f29",
  line: "#2c2833",
  text: "#f6f1ea",
  muted: "#9c94a3",
  dim: "#5f5866",
  accent: "#ff6b35",
  accentDeep: "#e0521f",
  green: "#3ddc97",
  greenBg: "#163326",
  amber: "#f5a524",
  amberBg: "#3a2a12",
  blueBg: "#3a1d12",
  map: "#17151c",
  road: "#27232d",
  water: "#141219",
};

const SANS = "Segoe UI, Helvetica, Arial, sans-serif";
const MONO = "Consolas, Menlo, monospace";

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="blue" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${C.accent}"/><stop offset="1" stop-color="${C.accentDeep}"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="${C.frame}"/>${body}</svg>`;

const t = (x, y, str, size, fill = C.text, opts = "") =>
  `<text x="${x}" y="${y}" font-family="${opts.includes("mono") ? MONO : SANS}" font-size="${size}" fill="${fill}" ${opts.replace("mono", "")}>${str}</text>`;

const badge = (x, y, label, kind) => {
  const map = { ok: [C.greenBg, C.green], warn: [C.amberBg, C.amber], info: [C.blueBg, C.accent] };
  const [bg, fg] = map[kind];
  const w = label.length * 13 + 26;
  return `<rect x="${x}" y="${y - 22}" width="${w}" height="32" rx="7" fill="${bg}"/>${t(x + 13, y, label, 18, fg, 'mono font-weight="600" letter-spacing="1"')}`;
};

/* ------------------------------ Ledgerline ------------------------------ */
function ledgerDesktop() {
  const rows = [
    ["TXN-88213 · Meezan", "PKR 42,500", "MATCHED", "ok"],
    ["TXN-88214 · HBL", "PKR 9,990", "MATCHED", "ok"],
    ["TXN-88215 · Stripe", "USD 129.00", "REVIEW", "warn"],
    ["TXN-88216 · UBL", "PKR 120,000", "MATCHED", "ok"],
    ["TXN-88217 · Wise", "USD 980.40", "MATCHED", "ok"],
  ];
  const bars = [30, 44, 38, 58, 50, 66, 62, 80, 74, 96, 88, 100];
  let body = `<rect x="86" y="60" width="1430" height="720" rx="22" fill="${C.panel}"/>`;
  body += t(128, 130, "Settlements", 30, C.text, 'font-weight="600"');
  body += t(1290, 125, "OCT 08 · LIVE", 20, C.muted, 'mono letter-spacing="2"');
  body += t(128, 250, "99.6%", 66, C.text, 'font-weight="700" letter-spacing="-2"');
  body += t(130, 288, "MATCHED TODAY", 18, C.muted, 'mono letter-spacing="2"');
  body += t(400, 250, "18m", 66, C.text, 'font-weight="700" letter-spacing="-2"');
  body += t(402, 288, "CLOSE TIME", 18, C.muted, 'mono letter-spacing="2"');
  bars.forEach((h, i) => {
    const bh = h * 1.15;
    body += `<rect x="${1090 + i * 34}" y="${280 - bh}" width="22" height="${bh}" rx="4" fill="${C.accent}" opacity="${0.35 + (i / bars.length) * 0.65}"/>`;
  });
  rows.forEach(([id, amt, status, kind], i) => {
    const y = 370 + i * 64;
    body += t(128, y, id, 22, C.text, "mono");
    body += t(1050, y, amt, 22, C.text, "mono");
    body += badge(1300, y, status, kind);
    body += `<line x1="128" y1="${y + 30}" x2="1476" y2="${y + 30}" stroke="${C.line}" stroke-width="2"/>`;
  });
  return svg(1600, 1000, body);
}

function ledgerMobile() {
  const payouts = [
    ["Payout #4821", "PKR 120,000 · HBL", "SENT", "ok"],
    ["Payout #4822", "USD 980.40 · Wise", "QUEUED", "info"],
    ["Payout #4823", "PKR 9,990 · UBL", "SENT", "ok"],
    ["Payout #4824", "PKR 42,500 · Meezan", "SENT", "ok"],
  ];
  let body = t(56, 250, "Payouts", 52, C.text, 'font-weight="600"');
  body += t(58, 296, "TODAY · LIVE", 24, C.muted, 'mono letter-spacing="3"');
  body += `<rect x="50" y="340" width="680" height="400" rx="34" fill="url(#blue)"/>`;
  body += t(100, 420, "MATCHED TODAY", 24, "#ffe2d6", 'mono letter-spacing="3"');
  body += t(96, 560, "99.6%", 120, "#ffffff", 'font-weight="700" letter-spacing="-4"');
  body += t(100, 640, "2,104,882 transactions", 30, "#ffe2d6");
  payouts.forEach(([name, sub, status, kind], i) => {
    const y = 860 + i * 190;
    body += t(56, y, name, 40, C.text, 'font-weight="600"');
    body += t(58, y + 46, sub, 24, C.muted, "mono");
    body += `<g transform="translate(560 ${y + 12}) scale(1.4)">${badge(0, 0, status, kind)}</g>`;
    body += `<line x1="56" y1="${y + 100}" x2="724" y2="${y + 100}" stroke="${C.line}" stroke-width="2"/>`;
  });
  body += `<rect x="0" y="1560" width="780" height="130" fill="${C.panel}"/>`;
  body += t(56, 1630, "Settlement", 36, C.text, 'font-weight="600"');
  return svg(780, 1690, body);
}

/* ------------------------------ Routewise ------------------------------- */
function mapLayer(w, h, seed = 1) {
  let s = `<rect width="${w}" height="${h}" fill="${C.map}"/>`;
  s += `<path d="M0 ${h * 0.72} C ${w * 0.25} ${h * 0.6}, ${w * 0.45} ${h * 0.9}, ${w} ${h * 0.78} L ${w} ${h} L 0 ${h} Z" fill="${C.water}"/>`;
  for (let i = 0; i < 9; i++) {
    const x = ((i * 173 * seed) % w) + 20;
    s += `<line x1="${x}" y1="0" x2="${x + 120}" y2="${h}" stroke="${C.road}" stroke-width="${i % 3 === 0 ? 12 : 5}"/>`;
  }
  for (let i = 0; i < 7; i++) {
    const y = ((i * 151 * seed) % h) + 30;
    s += `<line x1="0" y1="${y}" x2="${w}" y2="${y - 60}" stroke="${C.road}" stroke-width="${i % 3 === 0 ? 12 : 5}"/>`;
  }
  return s;
}

const pin = (x, y, color, r = 12) =>
  `<circle cx="${x}" cy="${y}" r="${r * 2.2}" fill="${color}" opacity="0.18"/><circle cx="${x}" cy="${y}" r="${r}" fill="${color}" stroke="#140a05" stroke-width="4"/>`;

function routeDesktop() {
  let body = `<g transform="translate(470 0)">${mapLayer(1130, 1000)}`;
  body += `<path d="M160 760 L 330 610 L 520 640 L 700 420 L 900 330" fill="none" stroke="${C.accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`;
  body += `<path d="M260 240 L 420 330 L 520 640" fill="none" stroke="${C.accent}" stroke-width="5" stroke-dasharray="14 12" opacity="0.6"/>`;
  [[160, 760], [520, 640], [900, 330], [260, 240], [760, 760], [980, 600]].forEach(([x, y], i) => (body += pin(x, y, i === 2 ? C.green : C.accent)));
  body += `</g>`;
  body += `<rect x="0" y="0" width="470" height="1000" fill="${C.panel}"/>`;
  body += t(40, 80, "Dispatch", 34, C.text, 'font-weight="600"');
  body += t(40, 120, "128 ACTIVE · 14 WAITING", 18, C.muted, 'mono letter-spacing="2"');
  const drivers = [
    ["Bilal R.", "Order #7712 · 4 min", "EN ROUTE", "info"],
    ["Sana K.", "Order #7713 · 9 min", "PICKUP", "warn"],
    ["Usman T.", "Order #7709 · done", "DONE", "ok"],
    ["Hira M.", "Order #7715 · 12 min", "EN ROUTE", "info"],
    ["Ali Z.", "Order #7716 · 2 min", "EN ROUTE", "info"],
    ["Ayesha F.", "Order #7701 · done", "DONE", "ok"],
  ];
  drivers.forEach(([name, sub, st, kind], i) => {
    const y = 200 + i * 125;
    body += `<rect x="28" y="${y - 50}" width="414" height="108" rx="16" fill="${i === 0 ? C.panel2 : "none"}"/>`;
    body += `<circle cx="78" cy="${y + 4}" r="24" fill="${C.blueBg}"/>`;
    body += t(68, y + 12, name[0], 22, C.accent, 'font-weight="700"');
    body += t(120, y, name, 24, C.text, 'font-weight="600"');
    body += t(120, y + 32, sub, 18, C.muted, "mono");
    body += badge(318, y + 14, st, kind);
  });
  return svg(1600, 1000, body);
}

function routeMobile() {
  let body = `<g>${mapLayer(780, 1100, 2)}`;
  body += `<path d="M120 900 L 260 700 L 420 760 L 560 480 L 660 300" fill="none" stroke="${C.accent}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`;
  body += pin(120, 900, C.accent, 16) + pin(660, 300, C.green, 16) + pin(420, 760, C.accent, 12);
  body += `</g>`;
  body += `<rect x="0" y="1020" width="780" height="670" rx="48" fill="${C.panel}"/>`;
  body += `<rect x="350" y="1048" width="80" height="10" rx="5" fill="${C.line}"/>`;
  body += t(56, 1140, "Order #7712", 46, C.text, 'font-weight="600"');
  body += t(58, 1190, "ARRIVING IN 4 MIN", 24, C.accent, 'mono letter-spacing="3"');
  [["Pickup", "Saddar warehouse"], ["Drop-off", "Clifton Block 5"], ["Package", "2 boxes · 6 kg"]].forEach(([k, v], i) => {
    const y = 1290 + i * 90;
    body += t(56, y, k, 28, C.muted);
    body += t(724, y, v, 28, C.text, 'text-anchor="end" font-weight="600"');
    body += `<line x1="56" y1="${y + 34}" x2="724" y2="${y + 34}" stroke="${C.line}" stroke-width="2"/>`;
  });
  body += `<rect x="56" y="1560" width="668" height="86" rx="43" fill="url(#blue)"/>`;
  body += t(390, 1615, "Mark as delivered", 30, "#140a05", 'text-anchor="middle" font-weight="700"');
  return svg(780, 1690, body);
}

/* ------------------------------ Pulsecheck ------------------------------ */
function uptimeBars(x, y, w, count, h, amberAt = [], gap = 4) {
  const bw = (w - gap * (count - 1)) / count;
  let s = "";
  for (let i = 0; i < count; i++) {
    s += `<rect x="${(x + i * (bw + gap)).toFixed(1)}" y="${y}" width="${bw.toFixed(1)}" height="${h}" rx="${Math.min(3, bw / 3).toFixed(1)}" fill="${amberAt.includes(i) ? C.amber : C.green}"/>`;
  }
  return s;
}

function pulseDesktop() {
  let body = `<rect x="230" y="150" width="1145" height="470" rx="24" fill="${C.panel}"/>`;
  body += `<circle cx="282" cy="208" r="10" fill="${C.green}"/>`;
  body += t(306, 217, "All systems operational", 28, C.text, 'font-weight="600"');
  [["api.example.com", "99.98%"], ["dashboard", "100%"], ["webhooks", "99.91%"]].forEach(([name, pct], i) => {
    const y = 280 + i * 110;
    body += t(270, y, name, 21, C.text);
    body += t(1335, y - 4, pct, 18, C.muted, 'mono text-anchor="end"');
    body += uptimeBars(270, y + 18, 1065, 36, 42, [12, 25]);
  });
  return svg(1600, 1000, body);
}

function pulseMobile() {
  let body = `<circle cx="70" cy="226" r="14" fill="${C.green}"/>`;
  body += t(100, 240, "All systems up", 46, C.text, 'font-weight="600"');
  body += t(58, 292, "STATUS.EXAMPLE.COM", 24, C.muted, 'mono letter-spacing="3"');
  [["API", "99.98%"], ["Dashboard", "100%"], ["Webhooks", "99.91%"], ["Workers", "99.99%"]].forEach(([name, pct], i) => {
    const y = 420 + i * 230;
    body += t(56, y, name, 34, C.text, 'font-weight="500"');
    body += t(724, y - 6, pct, 24, C.muted, 'mono text-anchor="end"');
    body += uptimeBars(56, y + 36, 668, 30, 80, [12, 27], 6);
  });
  return svg(780, 1690, body);
}

const jobs = [
  ["ledgerline-desktop", ledgerDesktop()],
  ["ledgerline-mobile", ledgerMobile()],
  ["routewise-desktop", routeDesktop()],
  ["routewise-mobile", routeMobile()],
  ["pulsecheck-desktop", pulseDesktop()],
  ["pulsecheck-mobile", pulseMobile()],
];

for (const [name, markup] of jobs) {
  await sharp(Buffer.from(markup)).png().toFile(`${OUT}/${name}.png`);
  console.log(`✓ ${OUT}/${name}.png`);
}
