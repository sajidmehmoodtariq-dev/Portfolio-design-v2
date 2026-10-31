// Tiny helpers that draw "soft" isometric shapes in SVG.
// Every shape is positioned by the centre of its footprint on the ground (cx, cy).
// Corners are softened by stroking each face with its own colour and round joins.
import type { LucideIcon } from "lucide-react";

type Pt = [number, number];
const K = 1.732; // an isometric square is √3 times wider than it is tall
export const RY = 0.577; // an isometric circle is 0.577 times as tall as it is wide

const pts = (list: Pt[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

// Fill + same-colour stroke = rounded corners
const face = (color: string, round: number) => ({
  fill: color,
  stroke: color,
  strokeWidth: round,
  strokeLinejoin: "round" as const,
});

export const TOP = "var(--mod-top)";
export const SIDE_L = "var(--mod-side-l)";
export const SIDE_R = "var(--mod-side-r)";
export const BASE_TOP = "var(--mod-base-top)";
export const BASE_L = "var(--mod-base-l)";
export const BASE_R = "var(--mod-base-r)";
export const ORANGE = "var(--accent)";
export const ORANGE_L = "var(--accent-side-1)";
export const ORANGE_R = "var(--accent-side-2)";

/* ---------------- Soft shadow (pre-blurred: a radial gradient, no filter) ---------------- */
export function Shadow({ cx, cy, rx, ry }: { cx: number; cy: number; rx: number; ry: number }) {
  return <ellipse cx={cx + rx * 0.08} cy={cy + ry * 0.25} rx={rx} ry={ry} fill="url(#soft-shadow)" />;
}

/* ---------------- Box (rounded cube / slab) ---------------- */
export function topRhombus(cx: number, cy: number, a: number) {
  return pts([
    [cx, cy - a],
    [cx + K * a, cy],
    [cx, cy + a],
    [cx - K * a, cy],
  ]);
}

type BoxProps = {
  cx: number;
  cy: number;
  a: number; // half size of the square footprint
  h: number; // height
  top?: string;
  left?: string;
  right?: string;
  round?: number;
};

export function IsoBox({ cx, cy, a, h, top = TOP, left = SIDE_L, right = SIDE_R, round = 10 }: BoxProps) {
  const W: Pt = [cx - K * a, cy];
  const S: Pt = [cx, cy + a];
  const E: Pt = [cx + K * a, cy];
  return (
    <g>
      <polygon points={pts([W, S, [S[0], S[1] - h], [W[0], W[1] - h]])} style={face(left, round)} />
      <polygon points={pts([S, E, [E[0], E[1] - h], [S[0], S[1] - h]])} style={face(right, round)} />
      <polygon points={topRhombus(cx, cy - h, a)} style={face(top, round)} />
    </g>
  );
}

/* ---------------- Cylinder (puck / disc) ---------------- */
type CylProps = { cx: number; cy: number; rx: number; h: number; top?: string; side?: string };

export function IsoCyl({ cx, cy, rx, h, top = TOP, side = "url(#side-grad)" }: CylProps) {
  const ry = rx * RY;
  return (
    <g>
      <path
        d={`M${cx - rx},${cy - h} L${cx - rx},${cy} A${rx},${ry} 0 0 0 ${cx + rx},${cy} L${cx + rx},${cy - h} Z`}
        style={{ fill: side }}
      />
      <ellipse cx={cx} cy={cy - h} rx={rx} ry={ry} style={{ fill: top }} />
    </g>
  );
}

// The front half of an ellipse, used for the glowing seams on stacked cylinders
export function frontArc(cx: number, cy: number, rx: number) {
  return `M${cx - rx},${cy} A${rx},${rx * RY} 0 0 0 ${cx + rx},${cy}`;
}

/* ---------------- Hexagon plate ---------------- */
type HexProps = { cx: number; cy: number; r: number; h: number; top?: string; left?: string; right?: string };

export function hexPoints(cx: number, cy: number, r: number): Pt[] {
  // a regular hexagon on the ground, projected to isometric screen space
  return Array.from({ length: 6 }, (_, i) => {
    const t = ((i * 60 + 15) * Math.PI) / 180;
    const x = r * Math.cos(t);
    const y = r * Math.sin(t);
    return [cx + (x - y) * 0.866, cy + (x + y) * 0.5] as Pt;
  });
}

export function IsoHex({ cx, cy, r, h, top = TOP, left = SIDE_L, right = SIDE_R }: HexProps) {
  const base = hexPoints(cx, cy, r);
  const sides = base.map((p, i) => {
    const q = base[(i + 1) % 6];
    if ((p[1] + q[1]) / 2 <= cy) return null; // back sides are hidden
    const color = (p[0] + q[0]) / 2 < cx ? left : right;
    return <polygon key={i} points={pts([p, q, [q[0], q[1] - h], [p[0], p[1] - h]])} style={face(color, 6)} />;
  });
  return (
    <g>
      {sides}
      <polygon points={pts(base.map(([x, y]) => [x, y - h] as Pt))} style={face(top, 6)} />
    </g>
  );
}

/* ---------------- Icon laid on a top face ---------------- */
// Lucide icons are drawn upright and squashed a little so they sit on the surface.
export function TopIcon({
  x,
  y,
  size = 22,
  color,
  icon: Icon,
  strokeWidth = 1.7,
}: {
  x: number;
  y: number;
  size?: number;
  color: string;
  icon: LucideIcon;
  strokeWidth?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(1 0.78) translate(${-size / 2} ${-size / 2})`} style={{ color }}>
      <Icon size={size} strokeWidth={strokeWidth} aria-hidden />
    </g>
  );
}

/* ---------------- Glow (pre-blurred radial gradient) ---------------- */
export function Glow({ cx, cy, r, white = false }: { cx: number; cy: number; r: number; white?: boolean }) {
  return <circle cx={cx} cy={cy} r={r} fill={white ? "url(#glow-white)" : "url(#glow-orange)"} />;
}
