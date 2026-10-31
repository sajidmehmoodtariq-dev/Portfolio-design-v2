import type { Metadata } from "next";
import { site } from "@/content/site";
import SiteHeader from "@/components/SiteHeader";
import RevealObserver from "@/components/RevealObserver";
import Dot from "@/components/ui/Dot";
import ProjectCard from "@/components/ui/ProjectCard";

export const metadata: Metadata = {
  title: "Selected work",
  description: "Three selected projects: payments, logistics and open source.",
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="container-page pt-[clamp(130px,16vw,180px)] pb-24">
        <p className="eyebrow">02 / Work</p>
        <h1 className="title-chapter mt-4">
          Selected work
          <Dot />
        </h1>
        <div className="mt-14 flex max-w-[900px] flex-col gap-8">
          {site.projects.map((project, i) => (
            <div key={project.slug} className={i === 0 ? "" : "reveal"}>
              <ProjectCard project={project} index={i} eager={i === 0} headingLevel={2} />
            </div>
          ))}
        </div>
      </main>
      <RevealObserver />
    </>
  );
}
