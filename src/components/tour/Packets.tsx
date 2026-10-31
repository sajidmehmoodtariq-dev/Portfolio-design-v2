import type { CSSProperties } from "react";
import { CABLES } from "./geometry";

// Small glowing dots that travel along the cables in a loop.
// They are plain HTML dots moved with CSS `offset-path` (no JavaScript, no filters).
// The wrapper uses diagram units (740 × 600) and is scaled to the camera size with --unit.
export default function Packets() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-0 left-0 h-[600px] w-[740px] origin-top-left"
      style={{ transform: "scale(var(--unit, 1))" }}
    >
      {CABLES.map((c, i) => {
        const forward = `path("M ${c.from[0]} ${c.from[1]} L ${c.to[0]} ${c.to[1]}")`;
        const backward = `path("M ${c.to[0]} ${c.to[1]} L ${c.from[0]} ${c.from[1]}")`;
        return [0, 1].map((n) => {
          const style = {
            offsetPath: n === 0 ? forward : backward,
            "--dur": `${2.4 + (i % 3) * 0.5}s`,
            "--delay": `${-(i * 0.7 + n * 1.3)}s`,
          } as CSSProperties;
          return (
            <span key={`${i}-${n}`} className={`packet ${n === 0 ? "packet-white" : "packet-orange"}`} style={style} />
          );
        });
      })}
    </div>
  );
}
