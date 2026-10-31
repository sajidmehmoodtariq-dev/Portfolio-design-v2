"use client";

import { CHAPTERS, goToChapter } from "@/lib/tour";

// Six small dots on the right edge, one per chapter. The tour marks the active one
// with the "is-active" class (no React state), which turns it into a short orange pill.
export default function ProgressRail() {
  return (
    <nav
      aria-label="Tour chapters"
      className="progress-rail fixed top-1/2 right-[22px] z-30 -translate-y-1/2 flex-col gap-1"
    >
      {CHAPTERS.map((c, i) => (
        <button
          key={c.id}
          type="button"
          data-rail={c.id}
          onClick={() => goToChapter(c.id)}
          aria-label={`Go to ${c.name}`}
          className={`rail-dot group relative flex size-[22px] items-center justify-center ${i === 0 ? "is-active" : ""}`}
        >
          <span className="rail-mark block size-[7px] rounded-full bg-line transition-[opacity,background-color] duration-300 group-hover:bg-muted" />
          <span className="rail-pill absolute h-[22px] w-[7px] rounded-full bg-accent" />
        </button>
      ))}
    </nav>
  );
}
