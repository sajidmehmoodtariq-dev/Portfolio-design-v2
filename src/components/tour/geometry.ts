// Where everything sits in the system diagram.
// The diagram is drawn in a 740 × 600 coordinate space ("diagram units").
import type { ChapterId } from "@/lib/tour";

export const VIEW_W = 740;
export const VIEW_H = 600;

export type ModuleId = "contact" | "about" | "work" | "now" | "experience" | "skills";
type Point = [number, number];

export type ModuleInfo = {
  id: ModuleId;
  label: string;
  sub: string;
  sentence: string; // shown in the hover card
  chapter: ChapterId; // clicking the module jumps here
  center: Point; // the camera zooms to this point
  labelAt: Point; // centre of the label (name baseline)
  leader: [number, number, number, number]; // thin line from the label to the module
  cardAt: Point; // top-left corner of the hover card
  whiteDot?: boolean;
};

export const MODULES: ModuleInfo[] = [
  {
    id: "contact",
    label: "CONTACT",
    sub: "Say hello",
    sentence: "Email me. I reply within a day.",
    chapter: "contact",
    center: [137, 168],
    labelAt: [137, 84],
    leader: [137, 106, 137, 120],
    cardAt: [190, 60],
    whiteDot: true,
  },
  {
    id: "about",
    label: "ABOUT",
    sub: "Who I am",
    sentence: "A bit about me and how I work.",
    chapter: "about",
    center: [196, 262],
    labelAt: [196, 178],
    leader: [196, 200, 196, 222],
    cardAt: [256, 160],
  },
  {
    id: "work",
    label: "WORK",
    sub: "Selected projects",
    sentence: "3 selected projects.",
    chapter: "work",
    center: [367, 330],
    labelAt: [367, 181],
    leader: [367, 203, 367, 250],
    cardAt: [446, 236],
  },
  {
    id: "now",
    label: "NOW",
    sub: "What I'm building",
    sentence: "What I'm building and learning.",
    chapter: "about",
    center: [560, 232],
    labelAt: [552, 146],
    leader: [552, 168, 552, 196],
    cardAt: [380, 60],
  },
  {
    id: "experience",
    label: "EXPERIENCE",
    sub: "Where I've worked",
    sentence: "3 roles since 2023.",
    chapter: "experience",
    center: [620, 356],
    labelAt: [620, 484],
    leader: [620, 446, 620, 466],
    cardAt: [450, 196],
  },
  {
    id: "skills",
    label: "SKILLS",
    sub: "Tools I use",
    sentence: "The tools I use every week.",
    chapter: "tools",
    center: [402, 476],
    labelAt: [402, 568],
    leader: [402, 528, 402, 550],
    cardAt: [462, 470],
  },
];

// Centre of the whole drawing (used by the overview chapters)
export const OVERVIEW_CENTER: Point = [388, 330];

// Thin cables between modules. Packets travel along them.
export type Cable = { from: Point; to: Point };
export const CABLES: Cable[] = [
  { from: [150, 212], to: [172, 232] }, // contact → about
  { from: [244, 296], to: [284, 320] }, // about → work
  { from: [462, 312], to: [524, 262] }, // work → now
  { from: [474, 378], to: [552, 378] }, // work → experience
  { from: [378, 414], to: [388, 440] }, // work → skills
];

// The part of the diagram shown above each chapter on small screens: [x, y, width, height]
export const MOBILE_CROPS: Record<"about" | "work" | "experience" | "tools", [number, number, number, number]> = {
  about: [96, 110, 220, 230],
  work: [250, 230, 240, 200],
  experience: [520, 260, 200, 190],
  tools: [320, 410, 165, 125],
};
