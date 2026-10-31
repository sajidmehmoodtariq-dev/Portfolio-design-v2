"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CHAPTERS, setChapterJumper, type ChapterId } from "@/lib/tour";
import CameraRig from "./CameraRig";
import { AboutChapter, ContactChapter, ExperienceChapter, HeroChapter, ToolsChapter, WorkChapter } from "./Chapters";
import { DiagramDefs } from "./DiagramArt";
import { MODULES, OVERVIEW_CENTER } from "./geometry";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// The tour only runs on big screens when motion is allowed.
// Everywhere else the chapters are plain stacked sections (see globals.css).
const TOUR_MEDIA = "(min-width: 900px) and (prefers-reduced-motion: no-preference)";

// The diagram is drawn this many times bigger than "scale 1", so zooming in stays sharp.
const R = 3.4;

// Timing (in timeline seconds): a chapter is shown still ("hold"), then the camera moves.
const HOLD = 0.4;
const MOVE = 0.6;

type Point = [number, number];
type Shot = {
  target: Point; // point of the diagram to look at (diagram units)
  scale: number; // zoom
  at: Point; // where on screen the target lands (fraction of width, height)
  labels: number; // opacity of the module labels
  veil: { right: number; top: number; bottom: number }; // readability gradients
};

const center = (id: string) => MODULES.find((m) => m.id === id)!.center;
const noVeil = { right: 0, top: 0, bottom: 0 };

// One camera position per chapter (Part 6.2 of the brief)
const SHOTS: Record<ChapterId, Shot> = {
  hero: { target: OVERVIEW_CENTER, scale: 1, at: [0.72, 0.5], labels: 1, veil: noVeil },
  about: { target: center("about"), scale: 3.4, at: [0.3, 0.58], labels: 0, veil: { right: 1, top: 0, bottom: 0 } },
  work: { target: center("work"), scale: 2.2, at: [0.25, 0.67], labels: 0, veil: { right: 1, top: 0.85, bottom: 0 } },
  experience: {
    target: center("experience"),
    scale: 3.0,
    at: [0.3, 0.58],
    labels: 0,
    veil: { right: 1, top: 0, bottom: 0 },
  },
  tools: { target: center("skills"), scale: 3.1, at: [0.5, 0.4], labels: 0, veil: { right: 0, top: 0.9, bottom: 1 } },
  contact: { target: OVERVIEW_CENTER, scale: 0.8, at: [0.76, 0.52], labels: 1, veil: noVeil },
};

function buildTour(tour: HTMLElement) {
  const stage = tour.querySelector<HTMLElement>(".stage")!;
  const rig = tour.querySelector<HTMLElement>(".camera-rig")!;
  const camera = tour.querySelector<HTMLElement>(".camera")!;
  const labelCam = tour.querySelector<HTMLElement>(".label-camera")!;
  const veils = {
    right: tour.querySelector(".veil-right"),
    top: tour.querySelector(".veil-top"),
    bottom: tour.querySelector(".veil-bottom"),
  };
  const chapterEl = (id: ChapterId) => tour.querySelector<HTMLElement>(`[data-chapter="${id}"]`)!;
  const items = (id: ChapterId) => gsap.utils.toArray<HTMLElement>(chapterEl(id).querySelectorAll("[data-anim]"));
  const cards = gsap.utils.toArray<HTMLElement>(tour.querySelectorAll("[data-card]"));
  const dots = gsap.utils.toArray<HTMLElement>(tour.querySelectorAll("[data-indicator]"));
  const rail = gsap.utils.toArray<HTMLElement>(document.querySelectorAll("[data-rail]"));

  // Sizes are read from the stage; they are re-read whenever ScrollTrigger refreshes (resize)
  const vw = () => stage.clientWidth;
  const vh = () => stage.clientHeight;
  const unit = () => Math.min(vw() / 1440, vh() / 900); // screen px per diagram unit at zoom 1
  const setSize = () => tour.style.setProperty("--k", String(unit()));
  setSize();
  ScrollTrigger.addEventListener("refreshInit", setSize);

  // Camera transform that puts shot.target at shot.at on screen
  const camX = (s: Shot) => () => s.at[0] * vw() - s.scale * unit() * s.target[0];
  const camY = (s: Shot) => () => s.at[1] * vh() - s.scale * unit() * s.target[1];
  const cameraVars = (s: Shot) => ({ x: camX(s), y: camY(s), scale: s.scale / R });
  const labelVars = (s: Shot) => ({ x: camX(s), y: camY(s), scale: s.scale, opacity: s.labels });

  const tl = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: tour,
      pin: true,
      scrub: 0.3,
      start: "top top",
      end: "+=650%",
      invalidateOnRefresh: true,
    },
  });

  // Starting state: the overview with the hero text
  tl.set(camera, cameraVars(SHOTS.hero), 0);
  tl.set(labelCam, labelVars(SHOTS.hero), 0);
  tl.set([veils.right, veils.top, veils.bottom], { opacity: 0 }, 0);
  tl.set(cards, { opacity: 0 }, 0);

  let t = 0;
  const holdMiddle: Partial<Record<ChapterId, number>> = {};
  const moves: [number, number][] = [];
  const switchAt: [ChapterId, number][] = [["hero", 0]];

  // A move of the camera from one shot to another, starting at time `t`
  function moveCamera(shot: Shot) {
    const ease = "power2.inOut";
    tl.to(camera, { ...cameraVars(shot), duration: MOVE, ease }, t);
    tl.to(labelCam, { ...labelVars(shot), duration: MOVE, ease }, t);
    tl.to(veils.right, { opacity: shot.veil.right, duration: MOVE }, t);
    tl.to(veils.top, { opacity: shot.veil.top, duration: MOVE }, t);
    tl.to(veils.bottom, { opacity: shot.veil.bottom, duration: MOVE }, t);
    moves.push([t, t + MOVE]);
  }

  // Old content fades out and up; new content fades in from below (titles, text, then cards)
  function swapContent(outEls: HTMLElement[], inEls: HTMLElement[]) {
    tl.to(outEls, { opacity: 0, y: -24, duration: MOVE * 0.45, stagger: 0.03, ease: "power1.in" }, t);
    tl.fromTo(
      inEls,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: MOVE * 0.5, stagger: 0.06, ease: "power2.out", immediateRender: false },
      t + MOVE * 0.45,
    );
  }

  function hold(id: ChapterId) {
    holdMiddle[id] = t + HOLD / 2;
    tl.addLabel(id, t + HOLD / 2);
    t += HOLD;
  }

  // Which elements fade in/out for each chapter (Work also has its first/last card)
  const inItems = (id: ChapterId) =>
    id === "work" ? [...items(id).slice(0, 2), cards[0], ...items(id).slice(2)] : items(id);
  const outItems = (id: ChapterId) => (id === "work" ? [...items(id), cards[cards.length - 1]] : items(id));

  hold("hero");
  const order = CHAPTERS.map((c) => c.id);
  for (let i = 1; i < order.length; i++) {
    const from = order[i - 1];
    const to = order[i];
    moveCamera(SHOTS[to]);
    swapContent(outItems(from), inItems(to));
    switchAt.push([to, t + MOVE / 2]);
    t += MOVE;
    hold(to);

    // Inside Work: step through the projects. Each next card slides in from the right,
    // the camera zooms in a little more (2.2 → 2.35 → 2.5).
    if (to === "work") {
      for (let p = 1; p < cards.length; p++) {
        moveCamera({ ...SHOTS.work, scale: SHOTS.work.scale + 0.15 * p });
        tl.to(cards[p - 1], { x: -140, opacity: 0, duration: MOVE * 0.7, ease: "power2.in" }, t);
        tl.fromTo(
          cards[p],
          { x: 140, opacity: 0 },
          { x: 0, opacity: 1, duration: MOVE * 0.7, ease: "power2.out", immediateRender: false },
          t + MOVE * 0.3,
        );
        tl.to(dots[p - 1], { opacity: 0, duration: MOVE * 0.5 }, t + MOVE * 0.25);
        tl.to(dots[p], { opacity: 1, duration: MOVE * 0.5 }, t + MOVE * 0.25);
        t += MOVE;
        t += HOLD;
      }
    }
  }

  // ---- Gentle parallax in the overview (max 8px), transform only ----
  const parallaxX = gsap.quickTo(rig, "x", { duration: 0.6, ease: "power3.out" });
  const parallaxY = gsap.quickTo(rig, "y", { duration: 0.6, ease: "power3.out" });
  function onMouseMove(e: MouseEvent) {
    if (!overview) return;
    parallaxX((e.clientX / window.innerWidth - 0.5) * 16);
    parallaxY((e.clientY / window.innerHeight - 0.5) * 16);
  }
  stage.addEventListener("mousemove", onMouseMove);

  // ---- Small DOM updates from the timeline (only when something changes) ----
  let lastActive: ChapterId | null = null;
  let lastMoving: boolean | null = null;
  let overview = true;

  function onUpdate() {
    const time = tl.time();
    const moving = moves.some(([a, b]) => time > a + 0.002 && time < b - 0.002);
    if (moving !== lastMoving) {
      stage.classList.toggle("is-moving", moving); // pauses the packets
      lastMoving = moving;
    }
    let active: ChapterId = "hero";
    for (const [id, at] of switchAt) if (time >= at) active = id;
    if (active !== lastActive) {
      tour.querySelectorAll<HTMLElement>("[data-chapter]").forEach((el) => {
        el.classList.toggle("is-active", el.dataset.chapter === active);
      });
      rail.forEach((el) => el.classList.toggle("is-active", el.dataset.rail === active));
      lastActive = active;
    }
    const isOverview = !moving && (active === "hero" || active === "contact");
    if (isOverview !== overview) {
      overview = isOverview;
      stage.toggleAttribute("data-overview", isOverview);
      if (!isOverview) {
        parallaxX(0);
        parallaxY(0);
      }
    }
  }
  tl.eventCallback("onUpdate", onUpdate);
  stage.setAttribute("data-overview", "");
  onUpdate();

  // ---- Jumping to chapters (rail, buttons, module clicks) ----
  const st = tl.scrollTrigger!;
  const scrollFor = (id: ChapterId) => st.start + ((st.end - st.start) * (holdMiddle[id] ?? 0)) / tl.duration();
  const jumpTo = (id: ChapterId, smooth = true) =>
    window.scrollTo({ top: scrollFor(id), behavior: smooth ? "smooth" : "auto" });
  setChapterJumper((id) => jumpTo(id));

  // Keyboard users: focusing something inside a hidden chapter brings that chapter on screen
  function onFocusIn(e: FocusEvent) {
    const chapter = (e.target as HTMLElement).closest<HTMLElement>("[data-chapter]");
    const id = chapter?.dataset.chapter as ChapterId | undefined;
    if (id && id !== lastActive) jumpTo(id, false);
  }
  tour.addEventListener("focusin", onFocusIn);

  // ---- Pause the packets while the tab is hidden ----
  const onVisibility = () => stage.classList.toggle("is-hidden", document.hidden);
  document.addEventListener("visibilitychange", onVisibility);

  // Open the page at a chapter when the URL has a #hash (e.g. /#contact)
  const hash = window.location.hash.slice(1) as ChapterId;
  if (CHAPTERS.some((c) => c.id === hash)) {
    requestAnimationFrame(() => jumpTo(hash, false));
  }

  // Clean-up when leaving the tour (unmount or the screen gets small)
  return () => {
    ScrollTrigger.removeEventListener("refreshInit", setSize);
    tour.removeEventListener("focusin", onFocusIn);
    stage.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("visibilitychange", onVisibility);
    setChapterJumper(null);
    stage.classList.remove("is-moving", "is-hidden");
    stage.removeAttribute("data-overview");
    tour.querySelectorAll("[data-chapter]").forEach((el) => el.classList.remove("is-active"));
  };
}

export default function Tour() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      ScrollTrigger.config({ ignoreMobileResize: true });
      const mm = gsap.matchMedia();
      mm.add(TOUR_MEDIA, () => buildTour(ref.current!));
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section id="tour" ref={ref} aria-label="A guided tour of my work">
      <DiagramDefs />
      <div className="stage">
        <CameraRig />
        <div aria-hidden className="veil veil-right" />
        <div aria-hidden className="veil veil-top" />
        <div aria-hidden className="veil veil-bottom" />
        <HeroChapter />
        <AboutChapter />
        <WorkChapter />
        <ExperienceChapter />
        <ToolsChapter />
        <ContactChapter />
      </div>
    </section>
  );
}
