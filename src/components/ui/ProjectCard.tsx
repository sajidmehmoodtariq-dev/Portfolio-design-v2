import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/site";
import ProjectShowcase from "./ProjectShowcase";

// One project: header row, screenshots, and the two big stats at the bottom.
export default function ProjectCard({
  project,
  index,
  eager = false,
  headingLevel = 3,
  cropShots = false,
}: {
  project: Project;
  index: number;
  eager?: boolean;
  headingLevel?: 2 | 3;
  cropShots?: boolean; // show only the top of the desktop screenshot (keeps the tour card short)
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article
      aria-labelledby={`project-${project.slug}`}
      className="rounded-[22px] border border-line bg-surface p-5 shadow-[0_40px_80px_-30px_rgb(0_0_0_/_0.6)] sm:p-6"
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-mono text-[13px] text-accent">{String(index + 1).padStart(2, "0")}</span>
        <Heading id={`project-${project.slug}`} className="text-[26px] leading-tight font-semibold tracking-[-0.02em]">
          {project.name}
        </Heading>
        <span className="text-[15px] text-muted">{project.kind}</span>
        <Link
          href={`/work/${project.slug}`}
          className="group ml-auto inline-flex items-center gap-1 text-[16px] font-semibold text-accent"
        >
          Case study
          <ArrowRight
            aria-hidden
            size={16}
            className="transition-transform duration-150 group-hover:translate-x-[3px]"
          />
          <span className="sr-only">: {project.name}</span>
        </Link>
      </div>

      <div className="mt-5">
        <ProjectShowcase project={project} eager={eager} crop={cropShots} />
      </div>

      <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
        {project.stats.map(([value, label]) => (
          <div key={label} className="flex items-baseline gap-2">
            <dt className="sr-only">{label}</dt>
            <dd className="font-display text-[22px] font-bold tracking-[-0.02em]">{value}</dd>
            <dd aria-hidden className="font-mono text-[12px] text-muted">
              {label}
            </dd>
          </div>
        ))}
      </dl>
    </article>
  );
}
