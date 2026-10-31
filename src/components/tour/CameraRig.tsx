"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { goToChapter } from "@/lib/tour";
import { DiagramArt, DiagramLabels } from "./DiagramArt";
import { MODULES, VIEW_H, VIEW_W, type ModuleId, type ModuleInfo } from "./geometry";
import Packets from "./Packets";

// The two "cameras" the tour moves around (desktop only):
// - .camera holds the diagram, drawn 3.4× bigger than needed so it stays sharp when zoomed in
// - .label-camera holds the labels and hover card at normal size (they only show zoomed out)
export default function CameraRig() {
  const [active, setActive] = useState<ModuleId | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Hover highlight: toggle classes directly, so the big SVG is not re-rendered by React
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (active) svg.setAttribute("data-active", active);
    else svg.removeAttribute("data-active");
    svg.querySelectorAll<SVGGElement>("[data-mod]").forEach((g) => {
      g.classList.toggle("is-active", g.dataset.mod === active);
    });
  }, [active]);

  // Wraps every module in a focusable button with hover + click handlers (stable, so the art renders once)
  const wrapModule = useCallback(
    (m: ModuleInfo, shape: ReactNode) => (
      <g
        data-mod={m.id}
        className="mod cursor-pointer outline-none"
        role="button"
        tabIndex={0}
        aria-label={`${m.label.toLowerCase()}: ${m.sentence} Opens the ${m.chapter} chapter.`}
        onMouseEnter={() => setActive(m.id)}
        onMouseLeave={() => setActive(null)}
        onFocus={() => setActive(m.id)}
        onBlur={() => setActive(null)}
        onClick={() => goToChapter(m.chapter)}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goToChapter(m.chapter);
          }
        }}
      >
        <g className="mod-lift">{shape}</g>
      </g>
    ),
    [],
  );

  const info = MODULES.find((m) => m.id === active);

  return (
    <div className="camera-rig" aria-label="System diagram: a map of this site" role="group">
      <div className="camera">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="diagram absolute inset-0 h-full w-full overflow-visible"
        >
          <DiagramArt wrapModule={wrapModule} />
        </svg>
        <Packets />
      </div>

      <div className="label-camera pointer-events-none">
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden
        >
          <DiagramLabels />
        </svg>
        {info ? (
          <div
            className="hover-card absolute w-[230px] rounded-[14px] border border-line bg-surface px-4 py-3.5 shadow-[0_16px_40px_-16px_rgb(0_0_0_/_0.6)]"
            style={
              {
                left: `calc(var(--k) * ${info.cardAt[0]}px)`,
                top: `calc(var(--k) * ${info.cardAt[1]}px)`,
              } as CSSProperties
            }
          >
            <p className="font-display text-[12px] font-bold tracking-[0.12em]">{info.label}</p>
            <p className="mt-1.5 text-[14px] leading-[1.45] text-muted">{info.sentence}</p>
            <p className="mt-2 text-[13px] font-semibold text-accent">Click to open →</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
