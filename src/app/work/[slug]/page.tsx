import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import SiteHeader from "@/components/SiteHeader";
import Button from "@/components/ui/Button";
import Dot from "@/components/ui/Dot";
import ProjectShowcase from "@/components/ui/ProjectShowcase";

type Props = { params: Promise<{ slug: string }> };

// One static page per project
export function generateStaticParams() {
  return site.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = site.projects.find((p) => p.slug === slug);
  return project ? { title: project.name, description: project.story } : {};
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const index = site.projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = site.projects[index];
  const next = site.projects[(index + 1) % site.projects.length];
  const facts = [
    ["Role", project.role],
    ["Timeline", project.timeline],
    ["Stack", project.stack.join(", ")],
  ];
  const sections = [
    ["Problem", project.caseStudy.problem],
    ["Approach", project.caseStudy.approach],
    ["Outcome", project.caseStudy.outcome],
  ];

  return (
    <>
      <SiteHeader back={{ href: "/work", label: "Back" }} />
      <main id="main" className="container-page pt-[clamp(130px,16vw,180px)] pb-24">
        <p className="eyebrow">{String(index + 1).padStart(2, "0")} / Case study</p>
        <h1 className="title-hero mt-5">
          {project.name}
          <Dot />
        </h1>
        <p className="mt-5 text-[18px] text-muted">{project.kind}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href={project.live} arrow="external">
            Visit site
          </Button>
          {project.github ? (
            <Button href={project.github} variant="secondary" arrow="external">
              GitHub
            </Button>
          ) : null}
        </div>

        <dl className="mt-12 grid border-y border-line sm:grid-cols-3">
          {facts.map(([label, value]) => (
            <div
              key={label}
              className="border-line py-5 max-sm:border-b max-sm:last:border-b-0 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0"
            >
              <dt className="label text-muted">{label}</dt>
              <dd className="mt-2 text-[17px] font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14">
          <ProjectShowcase project={project} eager />
        </div>

        <div className="mt-20 max-w-[62ch]">
          {sections.map(([title, text]) => (
            <section key={title} className="mb-14">
              <h2
                className="font-display text-[28px] font-extrabold tracking-[-0.02em] uppercase"
                style={{ fontStretch: "112%" }}
              >
                {title}
                <Dot />
              </h2>
              <p className="mt-4 text-[18px] leading-[1.7] text-muted">{text}</p>
            </section>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-line pt-10 sm:flex-row sm:items-center">
          <div>
            <p className="label text-muted">Next project</p>
            <p className="mt-2 text-[28px] font-semibold tracking-[-0.02em]">{next.name}</p>
          </div>
          <Button href={`/work/${next.slug}`} variant="secondary" arrow="right">
            Next project
          </Button>
        </div>
      </main>
    </>
  );
}
