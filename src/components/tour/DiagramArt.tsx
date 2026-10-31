// The static drawing of the isometric system (no state, no animation).
// It is rendered once and then only moved around by the camera.
import { memo, type ReactNode } from "react";
import { Briefcase, Clock, Code, LayoutGrid, Mail, User } from "lucide-react";
import { MODULES, VIEW_H, VIEW_W, type ModuleId, type ModuleInfo } from "./geometry";
import {
  BASE_L,
  BASE_R,
  BASE_TOP,
  Glow,
  IsoBox,
  IsoCyl,
  IsoHex,
  ORANGE,
  ORANGE_L,
  ORANGE_R,
  SIDE_R,
  Shadow,
  TopIcon,
  frontArc,
} from "./iso";

const ICON = "var(--mod-icon)";

// Gradients shared by every copy of the diagram on the page.
// This SVG is never display:none, so the gradients always work.
export function DiagramDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="pointer-events-none absolute">
      <defs>
        <linearGradient id="side-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" style={{ stopColor: "var(--mod-side-l)" }} />
          <stop offset="1" style={{ stopColor: "var(--mod-side-r)" }} />
        </linearGradient>
        <linearGradient id="base-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" style={{ stopColor: "var(--mod-base-l)" }} />
          <stop offset="1" style={{ stopColor: "var(--mod-base-r)" }} />
        </linearGradient>
        <radialGradient id="soft-shadow">
          <stop offset="0" style={{ stopColor: "var(--mod-shadow)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--mod-shadow)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id="glow-orange">
          <stop offset="0" style={{ stopColor: "var(--accent)", stopOpacity: 0.55 }} />
          <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
        </radialGradient>
        <radialGradient id="glow-white">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" style={{ fill: "var(--grid-dot)" }} />
        </pattern>
        <radialGradient id="grid-fade" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.45" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="grid-mask" maskContentUnits="objectBoundingBox">
          <rect width="1" height="1" fill="url(#grid-fade)" />
        </mask>
      </defs>
    </svg>
  );
}

// One module's shapes. `hot` is an extra glow that fades in on hover.
function ModuleShape({ id }: { id: ModuleId }) {
  switch (id) {
    case "contact":
      return (
        <>
          <Shadow cx={137} cy={204} rx={70} ry={34} />
          <IsoBox cx={137} cy={200} a={33} h={10} top={BASE_TOP} left={BASE_L} right={BASE_R} />
          <IsoBox cx={137} cy={190} a={22} h={44} />
          <TopIcon x={137} y={146} icon={Mail} color="var(--text)" size={22} />
          <g className="hot">
            <Glow cx={137} cy={146} r={34} white />
          </g>
        </>
      );
    case "about":
      return (
        <>
          <Shadow cx={196} cy={296} rx={78} ry={40} />
          <IsoCyl cx={196} cy={292} rx={62} h={14} top={BASE_TOP} side="url(#base-grad)" />
          <IsoCyl cx={196} cy={278} rx={50} h={32} />
          <ellipse cx={196} cy={246} rx={37} ry={21} style={{ fill: SIDE_R, stroke: ORANGE, strokeWidth: 5 }} />
          <TopIcon x={196} y={246} icon={User} color={ORANGE} size={20} />
          <g className="hot">
            <Glow cx={196} cy={246} r={56} />
          </g>
        </>
      );
    case "work": {
      const cubes = [
        { x: 367, y: 304, orange: true }, // back
        { x: 308, y: 338 }, // left
        { x: 426, y: 338 }, // right
        { x: 367, y: 372 }, // front
      ];
      return (
        <>
          <Shadow cx={367} cy={360} rx={128} ry={66} />
          <IsoBox cx={367} cy={352} a={63} h={14} top={BASE_TOP} left={BASE_L} right={BASE_R} round={14} />
          {cubes.map((c, i) => (
            <g key={i}>
              <IsoBox
                cx={c.x}
                cy={c.y}
                a={24}
                h={36}
                top={c.orange ? ORANGE : undefined}
                left={c.orange ? ORANGE_L : undefined}
                right={c.orange ? ORANGE_R : undefined}
              />
              <TopIcon
                x={c.x}
                y={c.y - 36}
                icon={LayoutGrid}
                color={c.orange ? "var(--on-accent)" : ICON}
                size={18}
                strokeWidth={2}
              />
            </g>
          ))}
          <g className="hot">
            <Glow cx={367} cy={268} r={60} />
          </g>
        </>
      );
    }
    case "now": {
      const p1: [number, number] = [500, 192];
      const p2: [number, number] = [584, 240];
      const dots = [0.18, 0.4, 0.62, 0.84].map((t) => [p1[0] + (p2[0] - p1[0]) * t, p1[1] + (p2[1] - p1[1]) * t - 2]);
      return (
        <>
          <Shadow cx={560} cy={262} rx={86} ry={36} />
          {/* two small feet */}
          <IsoBox cx={516} cy={238} a={7} h={26} round={4} />
          <IsoBox cx={566} cy={266} a={7} h={26} round={4} />
          {/* capsule: dark underside + lighter top + a slot with orange dots */}
          <line
            x1={p1[0]}
            y1={p1[1] + 14}
            x2={p2[0]}
            y2={p2[1] + 14}
            strokeWidth={40}
            strokeLinecap="round"
            style={{ stroke: SIDE_R }}
          />
          <line
            x1={p1[0]}
            y1={p1[1]}
            x2={p2[0]}
            y2={p2[1]}
            strokeWidth={40}
            strokeLinecap="round"
            style={{ stroke: "var(--mod-top)" }}
          />
          <line
            x1={p1[0] + 4}
            y1={p1[1] + 1}
            x2={p2[0] - 8}
            y2={p2[1] - 5}
            strokeWidth={14}
            strokeLinecap="round"
            style={{ stroke: SIDE_R }}
          />
          {dots.map(([x, y], i) => (
            <g key={i}>
              <Glow cx={x} cy={y} r={10} />
              <circle cx={x} cy={y} r={3.4} style={{ fill: ORANGE }} />
            </g>
          ))}
          {/* round end cap with a clock */}
          <IsoCyl cx={606} cy={276} rx={28} h={36} />
          <TopIcon x={606} y={240} icon={Clock} color={ORANGE} size={18} />
          <g className="hot">
            <Glow cx={545} cy={214} r={60} />
          </g>
        </>
      );
    }
    case "experience":
      return (
        <>
          <Shadow cx={620} cy={410} rx={86} ry={44} />
          <IsoCyl cx={620} cy={406} rx={68} h={14} top={BASE_TOP} side="url(#base-grad)" />
          <IsoCyl cx={620} cy={392} rx={56} h={26} />
          <IsoCyl cx={620} cy={366} rx={56} h={26} />
          <IsoCyl cx={620} cy={340} rx={56} h={26} />
          {/* glowing orange seams between the layers */}
          <path
            d={frontArc(620, 366, 56)}
            fill="none"
            style={{ stroke: "var(--accent)" }}
            strokeWidth={6}
            strokeOpacity={0.25}
          />
          <path
            d={frontArc(620, 340, 56)}
            fill="none"
            style={{ stroke: "var(--accent)" }}
            strokeWidth={6}
            strokeOpacity={0.25}
          />
          <path d={frontArc(620, 366, 56)} fill="none" style={{ stroke: ORANGE }} strokeWidth={2.4} />
          <path d={frontArc(620, 340, 56)} fill="none" style={{ stroke: ORANGE }} strokeWidth={2.4} />
          <TopIcon x={620} y={314} icon={Briefcase} color={ORANGE} size={22} />
          <g className="hot">
            <Glow cx={620} cy={352} r={70} />
          </g>
        </>
      );
    case "skills":
      return (
        <>
          <Shadow cx={402} cy={506} rx={70} ry={34} />
          <IsoHex cx={402} cy={502} r={46} h={10} top={BASE_TOP} left={BASE_L} right={BASE_R} />
          <IsoHex cx={402} cy={490} r={44} h={10} />
          <IsoHex cx={402} cy={478} r={44} h={16} top={ORANGE} left={ORANGE_L} right={ORANGE_R} />
          <TopIcon x={402} y={462} icon={Code} color="var(--on-accent)" size={22} strokeWidth={2.2} />
          <g className="hot">
            <Glow cx={402} cy={462} r={64} />
          </g>
        </>
      );
  }
}

// Back-to-front order so nearer modules cover farther ones
const DRAW_ORDER: ModuleId[] = ["contact", "now", "about", "work", "experience", "skills"];

type ArtProps = {
  // wraps each module, so the interactive version can add buttons and hover handlers
  wrapModule?: (m: ModuleInfo, shape: ReactNode) => ReactNode;
};

function DiagramArtInner({ wrapModule }: ArtProps) {
  return (
    <g>
      {/* faint dot grid that fades out at the edges */}
      <rect x={-200} y={-150} width={VIEW_W + 400} height={VIEW_H + 300} fill="url(#dot-grid)" mask="url(#grid-mask)" />
      {/* cables */}
      <g style={{ stroke: "var(--cable)" }} strokeWidth={1.4} strokeLinecap="round">
        <line x1={150} y1={212} x2={172} y2={232} />
        <line x1={244} y1={296} x2={284} y2={320} />
        <line x1={462} y1={312} x2={524} y2={262} />
        <line x1={474} y1={378} x2={552} y2={378} />
        <line x1={378} y1={414} x2={388} y2={440} />
      </g>
      {DRAW_ORDER.map((id) => {
        const m = MODULES.find((mod) => mod.id === id)!;
        const shape = <ModuleShape id={id} />;
        return <g key={id}>{wrapModule ? wrapModule(m, shape) : shape}</g>;
      })}
    </g>
  );
}

export const DiagramArt = memo(DiagramArtInner);

// Labels: a small dot, the module name, a sub-label and a thin leader line.
export function DiagramLabels() {
  return (
    <g>
      {MODULES.map((m) => {
        const [x, y] = m.labelAt;
        const nameWidth = m.label.length * 10.4 + 6; // close enough for Hubot Sans at 12px
        return (
          <g key={m.id}>
            <line
              x1={m.leader[0]}
              y1={m.leader[1]}
              x2={m.leader[2]}
              y2={m.leader[3]}
              style={{ stroke: "var(--cable)" }}
              strokeWidth={1}
            />
            <circle
              cx={x - nameWidth / 2 - 8}
              cy={y - 4}
              r={3}
              style={{ fill: m.whiteDot ? "var(--text)" : "var(--accent)" }}
            />
            <text x={x} y={y} textAnchor="middle" className="diagram-label">
              {m.label}
            </text>
            <text x={x} y={y + 16} textAnchor="middle" className="diagram-sublabel">
              {m.sub}
            </text>
          </g>
        );
      })}
    </g>
  );
}

// A static, non-interactive copy of the diagram (used on small screens).
// `crop` picks the part to show: [x, y, width, height] in diagram units.
export function StaticDiagram({
  crop,
  labels = false,
  className = "",
}: {
  crop?: [number, number, number, number];
  labels?: boolean;
  className?: string;
}) {
  const viewBox = crop ? crop.join(" ") : `40 50 ${VIEW_W - 40} ${VIEW_H - 30}`;
  return (
    <svg
      viewBox={viewBox}
      className={`block h-auto w-full ${crop ? "overflow-hidden" : "overflow-visible"} ${className}`}
      aria-hidden
    >
      <DiagramArt />
      {labels ? <DiagramLabels /> : null}
    </svg>
  );
}
