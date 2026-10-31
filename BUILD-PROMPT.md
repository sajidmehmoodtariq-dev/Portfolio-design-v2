# BUILD PROMPT — Ahmad's portfolio · "System Tour" · Ember

You are building my complete portfolio website from scratch in this folder. The approved design is in the **`design/`** folder:

- `Scroll-journey-storyboard.jpg`: the whole scroll journey at a glance
- `Scroll-frame-1-Load.jpg` … `Scroll-frame-6-Contact.jpg`: each moment in full size

**Open every image before writing code. The finished site must look like these frames.** If the images and this text disagree, the images win for looks and this text wins for behavior. Ignore the orange caption bar at the top of each image and the "scroll position" text; they are only labels.

I'm a beginner. Keep the code simple, readable and well organized, with short comments. Don't add features that aren't described here.

---

## 0. How to work

1. Read this whole file and look at all images first.
2. Build in the order of **Part 11**, without stopping to ask me between steps. Install packages and run commands yourself.
3. After each step, run the site and take Playwright screenshots (1440×900 and 390×844). For the tour, scroll to each chapter and screenshot it. Compare with the matching frame in `design/` and fix differences before moving on.
4. **Smoothness is the top priority.** The last version lagged. Follow the performance rules in Part 7 exactly, and test them (Part 7.3).
5. If something can't be done exactly (for example, an icon name doesn't exist), choose the simplest close alternative, keep going, and list it in your final report.
6. Finish with a short report: what was built, how to run it, where to edit my content, what to replace, and the smoothness test result.

---

## 1. The idea in one paragraph

The website is a **guided tour through a system diagram**. My isometric "system" (six modules: Contact, About, Work, Now, Experience, Skills) stays **fixed on screen** while you scroll. Scrolling moves a camera over it: it **zooms into one module at a time** (the module grows big), and that chapter's content appears next to it. Then it zooms out and into the next one. At the end it zooms all the way out for Contact. This growing and shrinking of the diagram while scrolling is the signature effect, and it must feel smooth.

---

## 2. Tech stack (keep it light)

- **Next.js** (App Router, latest stable) + **TypeScript** + **Tailwind CSS**
- **GSAP + ScrollTrigger** for the tour: **one** pinned, scrubbed timeline. GSAP is free, including ScrollTrigger.
- **next-themes** for dark/light mode (dark is the default)
- **react-icons** for real tech logos (Simple Icons `si`; Devicon `di` as a fallback)
- **lucide-react** for small UI icons
- Fonts from npm: `@fontsource-variable/hubot-sans` (big headings), `@fontsource-variable/mona-sans` (text), `@fontsource/monaspace-neon` (small labels)
- **Do NOT use:** Three.js / WebGL, Lenis or any smooth-scroll library, Framer Motion scroll hooks, or particle libraries. These caused the lag last time. Native browser scrolling + one GSAP timeline only.

---

## 3. Content: one file

All text and data live in **`src/content/site.ts`**. Components read from it, so I can change content without touching code. Mark placeholder companies, projects and numbers with `// TODO: replace with real`.

```ts
export const site = {
  name: "Ahmad",
  wordmark: "AHMAD",
  role: "Software Engineer",
  location: "Karachi, Pakistan",
  email: "hello@ahmad.dev",
  github: "https://github.com/ahmad-dev",
  linkedin: "https://linkedin.com/in/ahmad-dev",
  cv: "/cv.pdf",

  hero: {
    eyebrow: "SOFTWARE ENGINEER · 3 YEARS SHIPPING",
    lines: ["I BUILD", "SYSTEMS", "THAT"], accent: "STAY UP",
    text: "Full-stack engineer building payment, logistics and developer tools. Scroll — the system will walk you through my work.",
  },

  about: {
    title: "Hi, I'm Ahmad",
    text: "Software engineer in Karachi. For three years I've built the parts of products people only notice when they break — payments, pipelines and live dashboards.",
    facts: [["Now", "Engineer @ Paylane"], ["Before", "Northwind Logistics"], ["Focus", "Backend & full-stack"], ["Based", "Karachi · remote ok"]],
  },

  projects: [
    { slug: "ledgerline", name: "Ledgerline", kind: "Payments · Paylane · 2025", url: "ledgerline.paylane.app", live: "#",
      stats: [["6h → 18m", "daily close"], ["2.1M", "txns / day"]],
      story: "Finance matched bank settlements by hand every morning. I built the service that does it automatically.",
      stack: ["Go", "Kafka", "PostgreSQL", "AWS"],
      desktop: "/projects/ledgerline-desktop.png", mobile: "/projects/ledgerline-mobile.png",
      caseStudy: { problem: "", approach: "", outcome: "" } },
    { slug: "routewise", name: "Routewise", kind: "Logistics · Northwind · 2024", url: "dispatch.northwind.io", live: "#",
      stats: [["1,200", "drivers live"], ["9 → 3 min", "per dispatch"]],
      story: "A live dispatch board and driver app that replaced spreadsheets and phone calls.",
      stack: ["Next.js", "WebSockets", "PostGIS"],
      desktop: "/projects/routewise-desktop.png", mobile: "/projects/routewise-mobile.png",
      caseStudy: { problem: "", approach: "", outcome: "" } },
    { slug: "pulsecheck", name: "Pulsecheck", kind: "Open source · 2024 — now", url: "github.com/ahmad-dev/pulsecheck", live: "#",
      stats: [["1.4k", "GitHub stars"], ["22", "contributors"]],
      story: "A small self-hosted uptime monitor and status page I maintain in my free time.",
      stack: ["TypeScript", "Hono", "SQLite"],
      desktop: "/projects/pulsecheck-desktop.png", mobile: "/projects/pulsecheck-mobile.png",
      caseStudy: { problem: "", approach: "", outcome: "" } },
  ],

  experience: [
    { years: "2025—NOW", role: "Software Engineer", place: "Paylane · Remote", current: true },
    { years: "2023—24", role: "Associate Engineer", place: "Northwind Logistics" },
    { years: "2023", role: "Intern", place: "Cloudlane Labs" },
  ],

  tools: ["Python", "TypeScript", "JavaScript", "Node.js", "Go", "React", "Next.js", "HTML", "CSS", "PostgreSQL", "Redis", "Docker", "AWS", "Git"],

  contact: { lines: ["LET'S BUILD", "SOMETHING"], accent: "THAT STAYS UP", text: "Open to full-time roles and freelance work. I reply within a day." },
};
```

Write short, realistic text for the three case studies (problem / approach / outcome, 2–3 sentences each).

**Project images:** I don't have real screenshots yet. Create good-looking placeholder images in `public/projects/` in the site's colors: a reconciliation dashboard for Ledgerline (like frame 3), a map with routes for Routewise, and a status page with uptime bars for Pulsecheck. Desktop 1600×1000 and mobile 780×1690, same file names as above, so I can replace them later.

---

## 4. Design system

### 4.1 Colors: "Ember"
CSS variables in `globals.css`, mapped into Tailwind. Never hard-code colors in components.

| Token | Dark (default) | Light | Use |
|---|---|---|---|
| `--bg` | `#0B0A0F` | `#F7F4EF` | page (deep ink) |
| `--surface` | `#15131B` | `#FFFFFF` | cards, panels |
| `--line` | `#2A2531` | `#E4DDD3` | 1px borders |
| `--text` | `#F6F1EA` | `#17131A` | main text (warm white) |
| `--muted` | `#9C94A3` | `#6B6470` | secondary text |
| `--accent` | `#FF6B35` | `#E8541F` | **Ember orange**: "STAY UP", dots, eyebrows, buttons, glowing parts |
| `--accent-soft` | `#FF8F5E` | `#FF7A45` | top of button gradient |
| `--accent-side-1` | `#E0521F` | `#D04A18` | shaded side of orange 3D parts |
| `--accent-side-2` | `#B23E14` | `#A93A11` | darker side of orange 3D parts |
| `--on-accent` | `#140A05` | `#FFFFFF` | text on the orange button |

Background of the stage: `--bg` with a soft radial glow of `--surface` in the middle. Orange is the only color. Use it for glow, highlights and actions, never for large text blocks. No gradients on text, no glass effects, no emojis. Check WCAG AA contrast for all text.

### 4.2 Typography
| Style | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Hero / contact title | Hubot Sans | `clamp(3rem, 5.7vw, 5.2rem)` | 800, `font-stretch:112%` | UPPERCASE, line-height 0.92, letter-spacing -0.035em |
| Chapter title | Hubot Sans | `clamp(2.4rem, 4.4vw, 4rem)` | 800, `font-stretch:112%` | UPPERCASE, line-height 0.95 |
| Eyebrow / chapter number | Monaspace Neon | 12.5px | 500 | UPPERCASE, +0.12em, orange, e.g. `01 / ABOUT` |
| Body | Mona Sans | 18px | 400 | line-height 1.6, `--muted`, max 470px |
| Small labels | Monaspace Neon | 11–12px | 400 | UPPERCASE, +0.06em |

- **Round dot:** every big title ends with a small **orange circle** instead of a period (`0.17em`, `border-radius:50%`, on the baseline). Make a `<Dot />` component. The wordmark **AHMAD●** uses it too.
- `text-wrap: balance` on titles.

### 4.3 Buttons
- **Primary:** pill, 50px tall, gradient `--accent-soft → --accent`, text `--on-accent`, soft orange glow underneath.
- **Secondary:** pill, 1px `--line` border, semi-transparent `--bg`.
- One `<Button>` component. **I'll send exact hover effects later.** For now: the arrow moves 3px on hover, 150ms.
- Visible focus ring: 2px orange, 3px offset.

### 4.4 Fixed UI (always visible during the tour)
- Top-left: **AHMAD●** wordmark (Hubot 800, 22px), links home.
- Top-right: secondary pill **"Let's talk →"** (jumps to Contact) and a small round **theme toggle** (sun/moon).
- Right edge, vertically centered: a **progress rail** of 6 small dots (one per chapter). The active chapter's dot becomes a short orange pill. Clicking a dot jumps to that chapter.

---

## 5. The system diagram (one SVG, drawn once)

Build `components/tour/SystemDiagram.tsx`: an **isometric SVG** made in code, matching `Scroll-frame-1-Load.jpg`. It's drawn **once** and never re-rendered while scrolling.

**Look:** six rounded "soft modules" in graphite on a faint dot grid. Each sits on a slightly bigger, darker base with a soft blurred shadow. Each has one simple line icon laid flat on its top, and orange parts that glow.

| Module | Shape | Orange part | Icon on top | Label | Sub-label |
|---|---|---|---|---|---|
| Contact | rounded cube | — | envelope (white) | CONTACT | Say hello |
| About | round puck | ring on top | person | ABOUT | Who I am |
| Work | 2×2 rounded cubes on one base | front-top cube's top | grid | WORK | Selected projects |
| Now | long rounded capsule on 2 feet + round end cap | dots inside the capsule | clock | NOW | What I'm building |
| Experience | 3 stacked cylinders | glowing seams between them | briefcase | EXPERIENCE | Where I've worked |
| Skills | 3 stacked hexagon plates | top plate | code `< >` | SKILLS | Tools I use |

- Graphite colors: tops `#2D313A`, sides `#25282F` / `#1B1D22`, bases `#1F2229` / `#181A1F` / `#121418`. Orange parts use `--accent`, `--accent-side-1` and `--accent-side-2`.
- Thin graphite **cables** connect the modules. Small **packets** (orange and white dots with a soft glow) travel along the cables in a loop. Use CSS `offset-path` animation; the glow is a pre-made blurred circle, not an animated filter.
- **Labels:** name in Hubot 700 12px uppercase with a small orange dot before it, sub-label in Mona 12px muted, a 1px leader line to the module. Labels are visible **only in the overview** (load and contact). They fade out when the camera zooms in.
- No technical numbers anywhere (no RPS, latency or uptime).
- Give each module an `id` and a known "center point" so the camera can zoom to it (Part 6).

**Overview interactions (only when fully zoomed out):**
- **Hover a module:** it lifts 6px, its orange part glows brighter, the others dim to 60%, and a small card appears (`--surface`, 1px `--line`, 14px radius) with the name, one plain sentence and "Click to open →". Sentences: Contact "Email me. I reply within a day." · About "A bit about me and how I work." · Work "3 selected projects." · Now "What I'm building and learning." · Experience "3 roles since 2023." · Skills "The tools I use every week."
- **Click a module:** scroll to its chapter (Now → About).
- **Mouse move:** the diagram shifts gently, max 8px.

---

## 6. The scroll tour (the signature effect)

### 6.1 Structure
- The home page is one section `#tour` with a full-screen **stage** (`100svh`). It is **pinned** by ScrollTrigger while you scroll through roughly **800vh**.
- Inside the stage: the SVG diagram in a wrapper `div.camera`, plus one **content layer per chapter** (absolutely positioned HTML).
- **One GSAP timeline** with `scrollTrigger: { trigger: "#tour", pin: true, scrub: 0.6, start: "top top", end: "+=800%" }`. Add **labels** for each chapter so the rail and buttons can jump to them (`scrollTo` the label position).

### 6.2 The camera
The camera zooms by animating **only** `transform: translate(x, y) scale(s)` on `div.camera` (`transform-origin: 0 0`). For each chapter, compute `x` and `y` so the target module's center lands at the screen position below. Use percentages of the viewport, so it works at any size.

| Chapter | Target | Scale | Module center lands at | Content | Match image |
|---|---|---|---|---|---|
| 1 Load / Hero | whole diagram | 1.0 | diagram centered at 72% x, 50% y | hero text on the left | frame 1 |
| 2 About | About module | 3.4 | 30% x, 58% y | About content on the right | frame 2 |
| 3 Work | Work module | 2.2 | 25% x, 67% y | "SELECTED WORK●" top-left + project card on the right | frame 3 |
| 4 Experience | Experience module | 3.0 | 30% x, 58% y | experience list on the right | frame 4 |
| 5 Tools | Skills module | 3.1 | 50% x, 40% y | title on top, logo strip at the bottom | frame 5 |
| 6 Contact | whole diagram | 0.8 | diagram centered at 76% x, 52% y | contact content on the left | frame 6 |

**Timing:** each chapter gets a **hold** (content fully visible, camera still) and a **move** to the next one. About 40% of each chapter's scroll is the move and 60% is the hold, so content stays readable. Ease the moves with `power2.inOut`.

**During each move:**
- The old content fades out and moves up 24px; the new content fades in from 24px below (titles first, then text, then cards, with a 0.06 stagger).
- A soft gradient "veil" (`--bg` → transparent) fades in on the content side, so text stays readable over the big module (see frames 2–5).
- Labels fade out when leaving the overview and fade back in for Contact.

### 6.3 Chapter content (match the frames)
- **1 Hero (left, max 640px):** eyebrow · title `I BUILD / SYSTEMS / THAT / STAY UP●` (last line orange) · body text · buttons **Start the tour ↓** (primary, scrolls to chapter 2) and **Send a request** (secondary, jumps to Contact).
- **2 About (right, max 560px):** `01 / ABOUT` · title "HI, I'M AHMAD●" · text · a 2×2 grid of small fact boxes (`--surface` at 90%, 1px `--line`, 14px radius; tiny uppercase label + value).
- **3 Work:** `02 / WORK` + "SELECTED WORK●" at the top-left. On the right, a **project card** (760px wide, `--surface`, 1px `--line`, 22px radius, big soft shadow):
  - Top row: number in orange Monaspace, name (26px, 600), kind (muted), and "Case study →" in orange (links to `/work/[slug]`).
  - Body: the desktop image inside a simple browser frame, with the **phone image overlapping the bottom-right corner**.
  - Bottom row: the 2 stats (big number + small label).
  - **Inside chapter 3, scrolling steps through all 3 projects:** this chapter is longer (about 3 holds). Each next project card **slides in from the right and the previous one slides out to the left**, with a small "● ○ ○" indicator under the card. The camera stays on the Work module, but zooms in a little more for each project (2.2 → 2.35 → 2.5).
- **4 Experience (right, max 560px):** `03 / EXPERIENCE` · "WHERE I'VE BEEN●" · rows separated by 1px lines: years (Monaspace, muted) | role (19px, 600) with the place below (muted) | an orange pulsing dot on the current job.
- **5 Tools:** `04 / TOOLS` + "TOOLS I USE EVERY WEEK●" centered at the top. At the bottom, a **logo strip**: real official logos (react-icons Simple Icons, e.g. `SiPython`, `SiTypescript`, `SiJavascript`, `SiNodedotjs`, `SiGo`, `SiReact`, `SiNextdotjs`, `SiHtml5`, `SiCss`, `SiPostgresql`, `SiRedis`, `SiDocker`, `SiGit`; AWS via `DiAws` if needed; check the names in the installed version). Each logo sits in a 68px tile (`--surface`, 1px `--line`, 18px radius) with the name below. Logos are light grey and turn their brand color on hover. The strip glides slowly left to right in an endless CSS loop (~40s), fades at both edges, and pauses on hover. Map names to icons in `lib/techIcons.ts`.
- **6 Contact (left, max 640px):** `05 / CONTACT` · title `LET'S BUILD / SOMETHING / THAT STAYS UP●` (last line orange) · text · buttons: **hello@ahmad.dev →** (primary, `mailto:`; a small "Copy" icon button next to it copies the email and shows "Copied ✓"), **LinkedIn ↗**, **CV ↓** (secondary). A tiny footer line at the bottom of the stage: `© 2026 Ahmad · Designed and built by me`.

---

## 7. Smoothness rules (MUST follow)

### 7.1 Do
- **One** ScrollTrigger timeline for the whole tour. No other scroll listeners.
- Animate **only `transform` and `opacity`**. Put `will-change: transform` on `.camera` and the content layers.
- Draw the SVG once. During scroll, never change SVG attributes, re-render React state, or recalculate layout.
- Packets: CSS animations. **Pause them while the camera is moving** (toggle a class at the move's start and end) and when the tab is hidden.
- Pre-blurred glows (static blurred shapes). Never animate `filter`, `box-shadow` or `backdrop-filter` while scrolling.
- `scrub: 0.6` for a little smoothing. Use `ScrollTrigger.config({ ignoreMobileResize: true })`.
- Use `gsap.matchMedia()` so the tour only runs on screens ≥ 900px wide without reduced motion (see 7.2).
- Clean up on unmount (`useGSAP` from `@gsap/react` or `ctx.revert()`).

### 7.2 Mobile and reduced motion
On screens under 900px wide, or when `prefers-reduced-motion` is on, **don't pin or zoom**. Show the chapters as normal stacked sections:
- The hero with the full diagram below the text (static, small).
- Each chapter as a section: a **cropped static view** of its module (the same SVG, scaled with CSS) on top, then the content.
- Work: the 3 project cards stacked.
- Simple fade-up reveals only (IntersectionObserver + CSS transition).

### 7.3 Test it
- Run `npm run build && npm start` (production mode, not dev).
- Use Playwright with Chrome to scroll slowly through the whole tour while recording a performance trace. Report the **average FPS and any long frames over 50ms**. Target: **55–60 fps** on a normal laptop.
- If it's under target, simplify the diagram (fewer packets, smaller shadows) until it passes, and tell me what you changed.

---

## 8. Other pages
- **`/work`:** title "SELECTED WORK●" and the 3 project cards in a simple vertical list (no tour).
- **`/work/[slug]`:** wordmark + "← Back" at the top, the project number + name as a big title with the dot, the kind line, links (**Visit site ↗**, **GitHub ↗** if any), a facts row (Role · Timeline · Stack), the big browser frame with the phone overlapping, then **Problem**, **Approach** and **Outcome** (max 62ch text), and "Next project →" at the bottom.
- **404:** centered "PAGE NOT FOUND●" and a "Back home →" button.

## 9. Light mode
The theme toggle switches to the light tokens (Part 4.1). In light mode the diagram modules become warm white (`#FFFFFF` tops, `#EEEAE2` / `#DFDAD0` sides, `#E9E4DB` bases) with the same orange parts, and the dot grid and cables use `--line`. Everything else just follows the tokens. Dark is the default.

## 10. Quality
- Semantic HTML, one `h1` (the hero title), a skip link, keyboard navigation (diagram modules are focusable buttons with names; progress-rail dots are buttons). During the tour, all chapter text must be real HTML, readable by screen readers.
- SEO: titles, descriptions, an Open Graph image (ink background, "AHMAD●", "Software Engineer"), favicon (ink square with an orange dot).
- `next/image` for screenshots. Fonts load without layout shift.
- `npm run build` passes with no errors or warnings, and no console errors.

## 11. Build order (do all of it, checking each step)
1. Setup, fonts, colors (dark + light), `site.ts`, `Button`, `Dot`, fixed UI (wordmark, Let's talk, theme toggle).
2. The SVG system diagram (static), matching frame 1. Then labels, packets and hover/click in the overview.
3. The tour: pinned stage, camera timeline with all 6 chapters and holds, progress rail, chapter labels/jumps.
4. Chapter content for all chapters, including the 3-project stepper in Work and the logo strip.
5. Mobile / reduced-motion stacked layout.
6. `/work`, `/work/[slug]`, 404, placeholder images, case-study text.
7. Light mode check, accessibility, SEO.
8. Performance test (Part 7.3) in production mode, and fix until smooth.
9. Final comparison: screenshot each chapter at 1440×900 next to the matching `design/` frame, fix differences, then write the final report.
