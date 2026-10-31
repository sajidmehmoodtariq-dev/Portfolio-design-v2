// Writes a one-page placeholder CV to public/cv.pdf.
// Replace public/cv.pdf with your real CV (keep the same file name).
import { writeFileSync } from "node:fs";

const lines = [
  ["F2", 26, "Ahmad"],
  ["F1", 13, "Software Engineer - Karachi, Pakistan - hello@ahmad.dev"],
  ["F1", 11, ""],
  ["F1", 11, "This is a placeholder CV. Replace public/cv.pdf with your real one."],
];
let y = 760;
const text = lines
  .map(([font, size, str]) => {
    const out = `BT /${font} ${size} Tf 72 ${y} Td (${str}) Tj ET`;
    y -= size + 14;
    return out;
  })
  .join("\n");

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  `<< /Length ${text.length} >>\nstream\n${text}\nendstream`,
];

let pdf = "%PDF-1.4\n";
const offsets = [];
objects.forEach((obj, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
});
const xref = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
pdf += offsets.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("");
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

writeFileSync("public/cv.pdf", pdf);
console.log("✓ public/cv.pdf");
