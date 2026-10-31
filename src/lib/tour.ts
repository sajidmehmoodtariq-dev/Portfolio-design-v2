// Shared helpers for jumping between the chapters of the tour.

export const CHAPTERS = [
  { id: "hero", name: "Start" },
  { id: "about", name: "About" },
  { id: "work", name: "Work" },
  { id: "experience", name: "Experience" },
  { id: "tools", name: "Tools" },
  { id: "contact", name: "Contact" },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]["id"];

// While the pinned tour is running, it registers a function that scrolls to a chapter's
// place on the timeline. Without the tour (mobile / reduced motion) we scroll to the section.
let jumper: ((id: ChapterId) => void) | null = null;

export function setChapterJumper(fn: ((id: ChapterId) => void) | null) {
  jumper = fn;
}

export function goToChapter(id: ChapterId) {
  if (jumper) {
    jumper(id);
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
