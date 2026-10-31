"use client";

import { Check, Copy } from "lucide-react";
import { useState, type CSSProperties, type ReactNode } from "react";
import { site } from "@/content/site";
import { techIcons } from "@/lib/techIcons";
import { goToChapter } from "@/lib/tour";
import Button from "@/components/ui/Button";
import Dot from "@/components/ui/Dot";
import ProjectCard from "@/components/ui/ProjectCard";
import { MOBILE_CROPS } from "./geometry";
import { StaticDiagram } from "./DiagramArt";

// Every element with data-anim is faded in/out by the tour timeline (desktop)
// or revealed once when it scrolls into view (small screens, class "reveal").

// Wrapper for one chapter. On desktop it is a full-screen layer inside the pinned stage;
// on small screens it is a normal section.
function Chapter({
  id,
  children,
  className = "",
  label,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  label: string;
}) {
  return (
    <section id={id} data-chapter={id} aria-label={label} className={`chapter chapter-${id} ${className}`}>
      {children}
    </section>
  );
}

// The small cropped view of a module shown above a chapter on small screens
function MobileView({ crop }: { crop: [number, number, number, number] }) {
  return (
    <div className="mobile-view mx-auto mb-8 w-[min(100%,420px)]">
      <StaticDiagram crop={crop} />
    </div>
  );
}

/* ------------------------------ 1. Hero ------------------------------ */
export function HeroChapter() {
  const { hero } = site;
  return (
    <Chapter id="hero" label="Introduction">
      <div className="container-page flex h-full flex-col justify-center">
        <div className="max-w-[640px] pe">
          <p data-anim="" className="reveal eyebrow">
            {hero.eyebrow}
          </p>
          <h1 data-anim="" className="reveal title-hero mt-6">
            {hero.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block text-accent">
              {hero.accent}
              <Dot />
            </span>
          </h1>
          <p data-anim="" className="reveal body-text mt-7">
            {hero.text}
          </p>
          <div data-anim="" className="reveal mt-9 flex flex-wrap gap-3">
            <Button arrow="down" href="#about" onClick={jump("about")}>
              Start the tour
            </Button>
            <Button variant="secondary" href="#contact" onClick={jump("contact")}>
              Send a request
            </Button>
          </div>
        </div>
        <div className="mobile-view mt-12 w-full max-w-[560px] self-center">
          <StaticDiagram labels />
        </div>
      </div>
    </Chapter>
  );
}

// Click handler that jumps to a chapter instead of following the #hash
function jump(id: Parameters<typeof goToChapter>[0]) {
  return (e: { preventDefault: () => void }) => {
    e.preventDefault();
    goToChapter(id);
  };
}

/* ------------------------------ 2. About ------------------------------ */
export function AboutChapter() {
  const { about } = site;
  return (
    <Chapter id="about" label="About">
      <div className="container-page flex h-full items-center justify-end">
        <div className="w-full tour:w-[min(560px,44vw)] pe">
          <MobileView crop={MOBILE_CROPS.about} />
          <p data-anim="" className="reveal eyebrow">
            01 / About
          </p>
          <h2 data-anim="" className="reveal title-chapter mt-5">
            {about.title}
            <Dot />
          </h2>
          <p data-anim="" className="reveal body-text mt-6">
            {about.text}
          </p>
          <dl data-anim="" className="reveal mt-8 grid grid-cols-2 gap-3">
            {about.facts.map(([label, value]) => (
              <div key={label} className="rounded-[14px] border border-line bg-surface/90 px-4 py-3.5">
                <dt className="label text-muted">{label}</dt>
                <dd className="mt-1 text-[16px] font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Chapter>
  );
}

/* ------------------------------ 3. Work ------------------------------ */
export function WorkChapter() {
  const count = site.projects.length;
  return (
    <Chapter id="work" label="Selected work">
      <div className="container-page relative h-full">
        <div className="pt-0 tour:pt-[clamp(76px,10.5vh,100px)]">
          <MobileView crop={MOBILE_CROPS.work} />
          <p data-anim="" className="reveal eyebrow">
            02 / Work
          </p>
          <h2 data-anim="" className="reveal title-chapter mt-4">
            Selected work
            <Dot />
          </h2>
        </div>

        {/* Desktop: the cards sit on top of each other and the timeline slides between them.
            Small screens: they simply stack. */}
        <div className="work-cards mt-10 flex flex-col gap-6 tour:absolute tour:top-[24%] tour:right-[var(--page-pad)] tour:mt-0 tour:block tour:w-[var(--card-w)]">
          {site.projects.map((project, i) => (
            <div key={project.slug} data-card={i} className="reveal pe tour:absolute tour:inset-x-0 tour:top-0">
              <ProjectCard project={project} index={i} cropShots eager={i === 0} />
            </div>
          ))}
        </div>

        {/* "● ○ ○" indicator under the cards (desktop only) */}
        <div
          data-anim=""
          aria-hidden
          className="reveal work-indicator absolute right-[var(--page-pad)] bottom-[5.5%] hidden items-center gap-4 tour:flex"
        >
          <span className="flex gap-1.5">
            {Array.from({ length: count }, (_, i) => (
              <span key={i} className="relative block size-[7px] rounded-full border border-muted">
                <span
                  data-indicator={i}
                  className="absolute -inset-px rounded-full bg-text"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                />
              </span>
            ))}
          </span>
          <span className="font-mono text-[13px] text-muted">keep scrolling: next project slides in</span>
        </div>
      </div>
    </Chapter>
  );
}

/* ------------------------------ 4. Experience ------------------------------ */
export function ExperienceChapter() {
  return (
    <Chapter id="experience" label="Experience">
      <div className="container-page flex h-full items-center justify-end">
        <div className="w-full tour:w-[min(560px,44vw)] pe">
          <MobileView crop={MOBILE_CROPS.experience} />
          <p data-anim="" className="reveal eyebrow">
            03 / Experience
          </p>
          {/* the frame breaks this title as "WHERE I'VE / BEEN", so no balancing here */}
          <h2 data-anim="" className="reveal title-chapter mt-5 [text-wrap:wrap]">
            Where I&apos;ve been
            <Dot />
          </h2>
          <ol data-anim="" className="reveal mt-8 border-t border-line">
            {site.experience.map((job) => (
              <li key={job.role} className="flex items-center gap-6 border-b border-line py-5">
                <span className="w-[100px] shrink-0 font-mono text-[12.5px] text-muted">{job.years}</span>
                <span className="flex-1">
                  <span className="block text-[19px] leading-snug font-semibold">{job.role}</span>
                  <span className="block text-[16px] text-muted">{job.place}</span>
                </span>
                {job.current ? <span className="live-dot mr-2" role="img" aria-label="Current job" /> : null}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Chapter>
  );
}

/* ------------------------------ 5. Tools ------------------------------ */
export function ToolsChapter() {
  const items = site.tools.filter((name) => techIcons[name]);
  return (
    <Chapter id="tools" label="Tools">
      <div className="flex h-full flex-col">
        <div className="container-page text-center tour:pt-[clamp(70px,9vh,90px)]">
          <MobileView crop={MOBILE_CROPS.tools} />
          <p data-anim="" className="reveal eyebrow">
            04 / Tools
          </p>
          <h2 data-anim="" className="reveal title-chapter mt-4">
            Tools I use every week
            <Dot />
          </h2>
        </div>

        <div data-anim="" className="reveal mt-12 tour:mt-auto tour:mb-[clamp(56px,10vh,110px)]">
          <ul className="sr-only">
            {items.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <div className="marquee pe mx-auto max-w-[1100px]" aria-hidden>
            <div className="marquee-track py-2">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0">
                  {items.map((name) => {
                    const { Icon, color } = techIcons[name];
                    return (
                      <div
                        key={name}
                        className="tool-item flex w-[114px] shrink-0 flex-col items-center gap-3"
                        style={{ "--brand": color } as CSSProperties}
                      >
                        <div className="tool-tile flex size-[68px] items-center justify-center rounded-[18px] border border-line bg-surface">
                          <Icon size={30} />
                        </div>
                        <span className="text-[14px] text-muted">{name}</span>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Chapter>
  );
}

/* ------------------------------ 6. Contact ------------------------------ */
export function ContactChapter() {
  const { contact } = site;
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked: nothing to do, the mailto button still works
    }
  }

  return (
    <Chapter id="contact" label="Contact">
      <div className="container-page flex h-full flex-col justify-center">
        <div className="max-w-[640px] pe">
          <p data-anim="" className="reveal eyebrow">
            05 / Contact
          </p>
          <h2 data-anim="" className="reveal title-hero title-contact mt-6">
            {contact.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block text-accent">
              {contact.accent}
              <Dot />
            </span>
          </h2>
          <p data-anim="" className="reveal body-text mt-7">
            {contact.text}
          </p>
          <div data-anim="" className="reveal mt-9 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2">
              <Button href={`mailto:${site.email}`} arrow="right">
                {site.email}
              </Button>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="inline-flex size-[50px] items-center justify-center rounded-full border border-line text-muted transition-colors duration-150 hover:text-text"
              >
                {copied ? <Check size={17} aria-hidden /> : <Copy size={17} aria-hidden />}
              </button>
            </span>
            <Button href={site.linkedin} variant="secondary" arrow="external">
              LinkedIn
            </Button>
            <Button href={site.cv} variant="secondary" arrow="down">
              CV
            </Button>
          </div>
          <p role="status" aria-live="polite" className="mt-3 h-5 font-mono text-[12px] text-accent">
            {copied ? "Copied ✓" : ""}
          </p>
        </div>
        <div className="mobile-view mt-10 w-full max-w-[560px] self-center">
          <StaticDiagram labels />
        </div>
      </div>
      <p
        data-anim=""
        className="reveal container-page font-mono text-[12px] text-muted tour:absolute tour:inset-x-0 tour:bottom-6"
      >
        © 2026 {site.name} · Designed and built by me
      </p>
    </Chapter>
  );
}
