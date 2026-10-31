# PORTFOLIO BUILD PROMPT — Ahmad · "Cobalt Night"

You are building my complete personal portfolio website in this folder, in one go. The approved visual design is the image **`design-reference.jpg`** in this folder. Open it first and keep it next to this spec: **the finished site must look like that image.** Where this text and the image disagree, the image wins for looks and this text wins for behavior.

I am a beginner. Keep the code simple, readable and well organized. Prefer plain CSS features over complex libraries. Do not add anything that is not described here.

---

## 0. How to work

1. Read this whole file and look at `design-reference.jpg` before writing any code.
2. Build everything in the order of **Part 12**, without stopping to ask me between steps. After each step, run the site, take Playwright screenshots (1440px and 390px wide), compare them with `design-reference.jpg`, and fix differences before moving on.
3. Install packages and run commands yourself. Explain anything I must do by hand in plain language.
4. If something really can't be done as described (for example, a package doesn't exist), choose the simplest close alternative, keep going, and list it in your final report.
5. At the end, give me a short report: what was built, how to run it, where to change my content, and anything I need to replace.

---

## 1. Tech stack (keep it simple)

- **Next.js** (App Router, latest stable) + **TypeScript** + **Tailwind CSS**
- **Motion** (`motion/react`) for animations
- **Lenis** for smooth scrolling (turned off when the user prefers reduced motion)
- **next-themes** for dark/light mode (dark is the default)
- **react-icons** for tech logos (Simple Icons set `si`, Devicon set `di` as a fallback)
- **lucide-react** for small UI icons (arrows, copy, sun/moon, mail, etc.)
- Fonts via npm (no manual downloads):
  - `@fontsource-variable/hubot-sans` (display / hero)
  - `@fontsource-variable/mona-sans` (headings + body)
  - `@fontsource/monaspace-neon` (small labels, dates, code)
  - `@fontsource-variable/newsreader` (the *italic serif* accent words)
- **No** Three.js, no UI kits (no shadcn look, no Material), no particle effects. The hero diagram is a hand-built **SVG** (Part 5).

---

## 2. Content lives in one file

Create `src/content/site.ts`. **All text, links and data come from this file**, so I can edit my portfolio without touching components. Use this content (it is realistic placeholder data; add a `// TODO: replace with real` comment next to companies, projects and numbers):

```ts
export const site = {
  name: "Ahmad",
  wordmark: "AHMAD",
  role: "Software Engineer",
  yearsExperience: 3,
  location: "Karachi, Pakistan",
  timezone: "Asia/Karachi",
  email: "hello@ahmad.dev",
  github: "https://github.com/ahmad-dev",
  linkedin: "https://linkedin.com/in/ahmad-dev",
  cv: "/cv.pdf",

  hero: {
    eyebrow: "SOFTWARE ENGINEER · 3 YEARS SHIPPING",
    titleLines: ["I BUILD", "SYSTEMS THAT"],
    titleAccent: "STAY UP",
    text: "Full-stack engineer building payment, logistics and developer tools. Mostly TypeScript and Go, on PostgreSQL and AWS.",
  },

  about: {
    lead: "I'm a software engineer in Karachi. For the past three years I've worked on the parts of products people only notice when they break — payments, data pipelines and real-time dashboards.",
    leadMuted: "My job is to make sure they don't.",
    highlight: "when they break",           // shown in italic serif + accent color
    more: "Outside of work you'll find me playing weekend cricket, maintaining a small open-source uptime monitor, or slowly getting better at film photography.",
    facts: [
      ["Currently", "Software Engineer, Paylane"],
      ["Previously", "Northwind Logistics"],
      ["Focus", "Backend & full-stack"],
      ["Stack", "TypeScript, Go, Postgres"],
      ["Based in", "Karachi · open to remote"],
    ],
  },

  services: [
    { title: "Backend & APIs", text: "APIs and services that handle real traffic, written in Go and Node.js." },
    { title: "Full-stack features", text: "From the database table to the button your users click, in React and Next.js." },
    { title: "Payments & integrations", text: "Payouts, webhooks and third-party APIs — code that can't lose a transaction." },
    { title: "Keeping things running", text: "Monitoring, alerts and clear runbooks, so launches stay boring." },
  ],

  projects: [
    {
      slug: "ledgerline", name: "Ledgerline", kind: "Payments reconciliation · Paylane · 2025",
      url: "ledgerline.paylane.app", live: "#",
      story: "Finance used to match bank settlements by hand every morning. I built the service that does it automatically — the daily close went from **6 hours to 18 minutes**.",
      stack: ["Go", "Kafka", "PostgreSQL", "AWS"],
      desktop: "/projects/ledgerline-desktop.png", mobile: "/projects/ledgerline-mobile.png",
      caseStudy: { problem: "…", approach: "…", outcome: "…" },
    },
    {
      slug: "routewise", name: "Routewise", kind: "Dispatch & tracking · Northwind · 2024",
      url: "dispatch.northwind.io", live: "#",
      story: "A live dispatch board and driver app for **1,200 drivers**. Dispatch time per order dropped from nine minutes to three.",
      stack: ["Next.js", "WebSockets", "PostGIS"],
      desktop: "/projects/routewise-desktop.png", mobile: "/projects/routewise-mobile.png",
      caseStudy: { problem: "…", approach: "…", outcome: "…" },
    },
    {
      slug: "pulsecheck", name: "Pulsecheck", kind: "Open source · 2024 — now",
      url: "github.com/ahmad-dev/pulsecheck", live: "#",
      story: "A small self-hosted uptime monitor I maintain in my free time. **1.4k stars** on GitHub and 22 contributors so far.",
      stack: ["TypeScript", "Hono", "SQLite"],
      desktop: "/projects/pulsecheck-desktop.png", mobile: "/projects/pulsecheck-mobile.png",
      caseStudy: { problem: "…", approach: "…", outcome: "…" },
    },
  ],

  experience: [
    { years: "2025 — Now", role: "Software Engineer", company: "Paylane", place: "Remote", text: "Building payment reconciliation and payout services.", current: true },
    { years: "2023 — 2024", role: "Associate Software Engineer", company: "Northwind Logistics", place: "Karachi", text: "Built the live dispatch platform used by 1,200 drivers." },
    { years: "2023", role: "Software Engineering Intern", company: "Cloudlane Labs", place: "Karachi", text: "Internal tools and invoice automation." },
    { years: "2019 — 2023", role: "BS Computer Science", company: "University", place: "Karachi", text: "Where I wrote my first real program." },
  ],

  stack: ["TypeScript", "JavaScript", "Node.js", "Python", "Go", "React", "Next.js", "HTML", "CSS", "PostgreSQL", "Redis", "Docker", "AWS", "Git"],
};
```

Write short, realistic placeholder text for the three case studies (problem / approach / outcome, 2–3 sentences each).

**Project images:** I don't have screenshots yet. Create clean placeholder images in `public/projects/` that look like the mockups in `design-reference.jpg` (a dashboard for Ledgerline, a map for Routewise, a status page for Pulsecheck; desktop 1600×1000, mobile 780×1690), built as simple SVG/HTML-rendered images in the site's colors. Use `next/image` so I can later replace them with real screenshots of the same name.

---

## 3. Design system

### 3.1 Colors: "Cobalt Night" (dark is default)

Define these as CSS variables in `globals.css` and map them into Tailwind. **Never hard-code colors in components.**

| Token | Dark (default) | Light | Use |
|---|---|---|---|
| `--bg` | `#0A0D16` | `#F6F7FB` | page background (navy-tinted near-black) |
| `--surface` | `#111624` | `#FFFFFF` | cards, panels |
| `--surface-2` | `#18203A` | `#EDF0F7` | logo tiles, inner areas |
| `--line` | `#212A40` | `#DCE1EC` | 1px borders and dividers |
| `--text` | `#EEF1F8` | `#0E1320` | main text |
| `--muted` | `#8A93AB` | `#59627A` | secondary text |
| `--accent` | `#7C9CFF` | `#3E5FD9` | periwinkle blue: dots, highlights, links, "STAY UP" |
| `--accent-soft` | `#9BB4FF` | `#5E80F5` | top of the button gradient |
| `--accent-strong` | `#5E80F5` | `#3450C4` | bottom of the button gradient |
| `--on-accent` | `#0A0D16` | `#FFFFFF` | text on the primary button |

**The one light section ("How I can help")** always uses these, in both themes:
`--paper #EEF1F7`, `--paper-text #0E1320`, `--paper-muted #59627A`, `--paper-line #D5DBE8`, `--paper-accent #3E5FD9`.

Rules:
- The page is calm navy-black; **blue is used sparingly** (dots, a few highlighted words, links, the primary button, the diagram).
- No gradients on text, no glassmorphism, no neon glows, no purple-pink gradients, no emojis.
- Check that every text color passes WCAG AA contrast against its background.

### 3.2 Typography

| Style | Font | Size (fluid) | Weight | Line-height | Letter-spacing | Notes |
|---|---|---|---|---|---|---|
| Hero title | Hubot Sans | `clamp(3rem, 6vw, 5.25rem)` | 800, `font-stretch: 112%` | 0.93 | -0.035em | UPPERCASE, hero only |
| Section heading (h2) | Mona Sans | `clamp(2.25rem, 4.2vw, 3.75rem)` | 600 | 1.0 | -0.045em | one word in *serif italic* |
| Serif accent | Newsreader *italic* | same as heading | 400 | — | -0.015em | e.g. "*help*", "*shipped*", "*been*" |
| About lead | Mona Sans | `clamp(1.5rem, 2.4vw, 2.15rem)` | 500 | 1.32 | -0.022em | |
| Body | Mona Sans | 17px | 400 | 1.65 | 0 | max width 62ch |
| Small / meta | Mona Sans | 15px | 400 | 1.5 | 0 | |
| Labels, dates, eyebrow | Monaspace Neon | 12–13px | 400–500 | 1.4 | +0.08em | eyebrow is UPPERCASE |

- **The round dot:** every section heading and the hero title end with a small **round dot in the accent color** instead of a period: an inline element of `0.16em × 0.16em`, `border-radius: 50%`, sitting on the baseline. Make it a `<Dot />` component. The wordmark **AHMAD** in the top-left also ends with this dot.
- Use `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs.
- **Do not use** small "(01) Section" labels or eyebrow labels above section headings. Only the hero has an eyebrow.

### 3.3 Layout

- Content is centered with **max width 1280px** and side padding `clamp(20px, 5.5vw, 80px)`.
- Vertical space between sections: `clamp(96px, 12vw, 150px)`.
- **Section header pattern** (used by every section after the hero): the heading on the left, a short muted sentence on the right (max 400px wide) with an optional underlined link under it ("All projects →", "Download full CV ↓"). On mobile, stack them.
- Radius: buttons 999px (pills), cards 24px, logo tiles 20px.
- Borders are 1px `--line`. No heavy shadows.

### 3.4 Buttons and links

- **Primary button:** pill, 50px tall, vertical gradient `--accent-soft → --accent-strong`, text `--on-accent`, 1px top inner highlight, soft accent glow under it.
- **Secondary button:** pill, transparent, 1px `--line` border.
- **Text links:** underlined (`text-underline-offset: 5px`, 1px thickness), with an arrow (↗ external, ↓ download, → internal).
- Build one reusable `<Button variant="primary|secondary" />` component. **I will give you exact hover effects for buttons later.** For now: on hover the arrow moves 3px and the button brightens slightly (150ms).
- Visible focus ring on everything: 2px `--accent`, 3px offset.

---

## 4. Page structure

**Pages:**
- `/` the home page (all sections below)
- `/work` a simple list of all projects (reuse the project card)
- `/work/[slug]` a case study page per project
- a custom 404

**Home page order:** Hero → About → How I can help (light) → Selected work → Experience → Tools → Contact → Footer.

**Navigation:** there is **no navbar**. Top-left is the wordmark **AHMAD●** (links home). Top-right is a secondary pill button **"Let's talk →"** (scrolls to Contact) plus a small round **theme toggle** (sun/moon icon, 40px). These scroll away with the page. They are not fixed.

---

## 5. Hero

Match the hero in `design-reference.jpg` exactly.

**Layout (desktop):** left column (≈55%) holds text; right column holds the system diagram, which may overlap slightly into the left column's space but never touches the text. Hero height: `min(100svh, 900px)`, min 680px. Background: `--bg` with a soft radial glow of `--surface` behind the diagram.

**Text (left):**
1. Eyebrow in Monaspace, accent color: `SOFTWARE ENGINEER · 3 YEARS SHIPPING`
2. Title in 3 lines: `I BUILD` / `SYSTEMS THAT` / `STAY UP●`; the last line is in `--accent`, ending in the round dot.
3. Paragraph (`--muted`, 20px, max 480px).
4. Buttons: **Send a request →** (primary; scrolls to Contact) and **View the work** (secondary; scrolls to Selected work).

**The system diagram (right): an isometric SVG built in code** (`components/hero/SystemDiagram.tsx`). Six rounded "soft modules" in graphite with accent-blue parts, sitting on a faint dot grid, connected by thin cables with small glowing packets travelling along them. Each module has one simple line icon on top (use lucide icons drawn flat in the isometric plane, or simple SVG paths):

| Module | Shape | Icon | Label | Sub-label |
|---|---|---|---|---|
| Contact | rounded cube on a base | envelope (white) | CONTACT | Say hello |
| About | round puck with a blue ring on top | person (blue) | ABOUT | Who I am |
| Work | 2×2 rounded cubes on one base; front-top cube has a blue top | grid | WORK | Selected projects |
| Now | long rounded capsule (queue) on two feet, blue dots inside, round cap with a clock | clock | NOW | What I'm building |
| Experience | 3 stacked cylinders with blue glowing seams | briefcase | EXPERIENCE | Where I've worked |
| Skills | stacked hexagon plates, top plate blue | code `< >` | SKILLS | Tools I use |

- Module colors: tops `#232A3D`, sides `#1B2133` / `#141A29`, bases `#161C2C`; blue parts use `--accent` with darker sides (`#5C78D9` / `#4259B0`).
- Labels: name in Hubot Sans 700, 12px, wide, uppercase, with a small blue dot before it; the sub-label in Mona Sans 12px `--muted`; connected to the module by a thin 1px leader line.
- **No technical numbers anywhere** (no RPS, latency, uptime…).

**Diagram interactions (simple):**
- **Hover a module:** it lifts 6px, its top edge glows blue, the other modules dim to 60%, and a small card appears near it (`--surface`, 1px `--line`, 14px radius) with the name, one plain sentence and "Click to open →". The sentences:
  - Contact: "Email me or send a message. I reply within a day."
  - About: "A bit about me and how I like to work."
  - Work: "3 selected projects: payments, logistics and open source."
  - Now: "What I'm building and learning right now."
  - Experience: "3 roles since 2023, plus where it started."
  - Skills: "The languages and tools I use every week."
- **Click a module:** smooth-scroll to its section (Now → About section is fine).
- **Mouse move:** the whole diagram shifts gently (max 10px) toward the cursor.
- **Packets** loop along the cables continuously (Motion or CSS `offset-path`), blue and white, each with a soft glow.
- On mobile, the diagram sits **below** the text, scaled to fit the width; hover cards become tap cards.

---

## 6. Sections

### 6.1 About ("Hi, I'm *Ahmad*●")
- Two columns: left (wide) has the heading "Hi, I'm *Ahmad*●", then the **lead paragraph** in large text where `when they break` is in serif italic accent color and the last sentence ("My job is to make sure they don't.") is in `--muted`, then the "more" paragraph in normal body size, muted.
- Right column (≈380px): the **facts list**, each row a label on the left (muted) and value on the right, separated by 1px lines. Under it, three underlined links: **Download CV ↓**, **GitHub ↗**, **LinkedIn ↗**.
- No photo.

### 6.2 How I can help (the light section)
- Full-width band in `--paper` colors (light, even in dark mode).
- Header: "How I can *help*●" + the sentence "Where I add the most value — from the database table to the button your users click."
- Four rows separated by `--paper-line`. Each row: a big number `01`–`04` (Mona Sans 700, 56px), shown **as an outline** (`-webkit-text-stroke: 1.2px`, transparent fill), then the title (26px, 600), the description (muted), and a small `→` on the far right.
- Extra bottom padding (≈190px) so the next section can slide over it.

### 6.3 Selected work ("A few things I've *shipped*●")
- A dark panel (`--bg`) with **40px rounded top corners** that overlaps the bottom of the light section by 80px, so it looks like it slides up over it.
- Header: heading + "Real products used by real people. Each one with a desktop and a mobile view." + link "All projects →" (to `/work`).
- **Project card** (`--surface`, 1px `--line`, 24px radius):
  - Top row: number in accent Monaspace (`01`), project name (28px, 600), the "kind" line in muted, and on the right two underlined links: **Case study** (→ `/work/[slug]`) and **Visit site ↗** (accent color).
  - Body: left, the **desktop screenshot inside a simple browser frame** (dark bar with 3 dots and the URL); the **phone screenshot** in a phone frame (rounded 34px, notch) **overlapping the bottom-right corner** of the browser frame. Right column (≈330px): the story paragraph (bold parts in `--text`) and the stack as a muted Monaspace line separated by `·`.
- **Stacking effect** (like the reference): each card is `position: sticky` with `top: 24px + index × 64px`, so when you scroll, the next card slides over the previous one and the earlier cards' **header rows stay visible** above it. Cards that are covered scale down to 0.96 and dim slightly (Part 7). Use plain CSS sticky. No libraries.

### 6.4 Experience ("Where I've *been*●")
- Header: heading + "Three years across fintech and logistics, plus where it all started." + link "Download full CV ↓".
- A simple list: each row has the years (Monaspace, muted) | role (20px, 600) with "company · place" under it in muted | the one-line description (muted). Rows separated by 1px lines. The current role has a small **pulsing accent dot** after it.

### 6.5 Tools ("Tools I use *every week*●")
- Header: heading + "The languages and tools I reach for most. Always learning the next one."
- **Logo strip**: real official logos from `react-icons` (Simple Icons, e.g. `SiTypescript`, `SiJavascript`, `SiNodedotjs`, `SiPython`, `SiGo`, `SiReact`, `SiNextdotjs`, `SiHtml5`, `SiCss`, `SiPostgresql`, `SiRedis`, `SiDocker`, `SiGit`; for AWS use a Devicon icon such as `DiAws` if Simple Icons doesn't have it). Check the exact icon names in the installed version.
  - Each item: logo (36px) centered in a 72px tile (`--surface`, 1px `--line`, 20px radius), with the tool name below (14px, muted).
  - Logos are light grey by default; **on hover the logo turns its official brand color** and the tile lifts 4px.
  - The row is duplicated and **glides slowly from left to right in an endless loop** (≈40s per loop, CSS animation), fades out at both edges (mask gradient), and **pauses on hover**.
  - Map the names in `site.stack` to icons in one small `techIcons.ts` file.

### 6.6 Contact ("Have something in mind? *Let's talk*●")
- One large panel (`--surface`, 1px `--line`, 32px radius, 80px padding) with a soft accent radial glow in its top-left corner.
- Left: the big heading (Mona Sans 600, `clamp(2.75rem, 6vw, 5.25rem)`, two lines, "Let's talk" in serif italic accent) and "Open to full-time roles and the occasional freelance project. I usually reply within a day."
- Right: "Email" label, the email address (28px, underlined), then **Copy email** (primary; copies to clipboard and changes to "Copied ✓" for 2s, announced to screen readers) and **LinkedIn ↗** (secondary).
- No contact form.

### 6.7 Footer
One quiet row in Monaspace 12.5px muted, with a 1px top line: `© 2026 Ahmad · Designed and built by me` · `GitHub · LinkedIn · CV` · `Back to top ↑` (underlined, smooth-scrolls up).

---

## 7. Animations (the "growing and shrinking" feel, beginner-friendly)

Use Motion's `useScroll` + `useTransform` for scroll effects and `whileInView` for reveals. Put shared values (easing `[0.22, 1, 0.36, 1]`, durations) in `src/lib/motion.ts`. Animate only `transform` and `opacity` for smoothness.

| Where | Animation |
|---|---|
| **Page load (hero)** | Eyebrow fades in → title lines slide up one by one from a mask (stagger 90ms) → paragraph and buttons fade up → diagram modules **pop in one by one** (scale 0.8 → 1, fade in, small bounce), cables draw in, then packets start moving. Total ≈1.6s. |
| **Hero on scroll** | As you scroll down through the hero, the **diagram shrinks** (scale 1 → 0.82), tilts back slightly (rotateX 0 → 12deg), fades to 0.3 and moves up a little; the text moves up slightly faster. Scrolling back up **grows it back**. |
| **Section headers** | Heading words slide up from a mask (stagger 50ms); the side sentence fades in after. |
| **About** | The lead paragraph **grows in**: scale 0.96 → 1 and opacity 0 → 1 as it enters; facts rows fade up one by one. |
| **How I can help** | Each row slides in from 24px below; as a row reaches the middle of the screen, its **outlined number fills with blue** (`--paper-accent`) and the arrow moves 4px. |
| **Selected work** | The dark panel's rounded top corners scale from 0.96 to 1 as it slides over the light section. Each project card **grows in** (scale 0.94 → 1) as it arrives; when the next card covers it, it **shrinks** to 0.96 and dims to 70%. The phone frame floats up 20px as the card enters. |
| **Experience** | Rows fade up one by one; the current-role dot pulses. |
| **Tools** | Endless glide (CSS), pause on hover. |
| **Contact** | The big heading **grows** from 0.92 → 1 scale as the panel enters; the accent glow slowly drifts. |
| **Dots** | The hero "STAY UP●" dot pulses softly (opacity 1 → 0.6 → 1, 2.4s). |

**Reduced motion:** if `prefers-reduced-motion` is on, disable Lenis, scroll scaling, packets and pulsing. Everything appears with a simple 200ms fade, and the diagram is shown static.

---

## 8. Case study page `/work/[slug]`
- Top-left wordmark + "← All projects" link; top-right theme toggle.
- Header: project number + name (big heading with the dot), kind line, and a row: **Visit site ↗** / **GitHub ↗** (if any).
- A row of facts: Role · Timeline · Stack.
- The large desktop image in the browser frame with the phone overlapping (same component as the card).
- Sections **Problem**, **Approach**, **Outcome**, each with a small heading and 1–2 paragraphs (max 62ch).
- At the bottom: "Next project →" linking to the next case study.

`/work`: the "A few things I've *shipped*●" header and all project cards (without the sticky stacking).
404: centered "Page not *found*●", one sentence and a "Back home →" button.

---

## 9. Responsive
- Breakpoints: 640, 768, 1024, 1280. Test at **390, 768, 1024, 1440**.
- Mobile: hero text first, diagram below; section headers stack; About facts go under the paragraph; service rows stack (number, title, text); project cards stack (browser image, phone below/overlapping less, then text) and **don't use sticky stacking below 768px**; experience rows stack.
- No horizontal scrolling at any width. Tap targets at least 44px.

## 10. Quality
- Semantic HTML (`header`, `main`, `section` with headings, `footer`), one `h1` (the hero title), a skip-to-content link, alt text on images, keyboard navigation for everything (diagram modules are focusable buttons with names).
- SEO: page titles and descriptions, Open Graph image (dark navy, "AHMAD●" and "Software Engineer"), favicon (a navy square with a periwinkle dot).
- Performance: `next/image` for screenshots, lazy-load below the hero, fonts load without layout shift. Aim for Lighthouse 90+ on mobile.
- No console errors, no hydration warnings, `npm run build` passes.

## 11. File structure (suggested)
```
src/
  app/ layout.tsx, page.tsx, work/page.tsx, work/[slug]/page.tsx, not-found.tsx, globals.css
  content/site.ts
  components/
    hero/ Hero.tsx, SystemDiagram.tsx, Packets.tsx
    sections/ About.tsx, Services.tsx, Work.tsx, Experience.tsx, Tools.tsx, Contact.tsx, Footer.tsx
    ui/ Button.tsx, Dot.tsx, SectionHeader.tsx, ProjectCard.tsx, BrowserFrame.tsx, PhoneFrame.tsx, ThemeToggle.tsx, Reveal.tsx
  lib/ motion.ts, techIcons.ts
public/ projects/ (placeholder screenshots), cv.pdf (placeholder)
```

## 12. Build order (do all steps, check each one, don't stop between them)
1. Project setup, fonts, colors (dark + light), `site.ts`, base components (Button, Dot, SectionHeader).
2. Hero with the SVG system diagram, load animation, hover cards and click-to-scroll.
3. About and "How I can help".
4. Selected work with project cards, frames, placeholder screenshots and sticky stacking.
5. Experience, Tools (real logos) and Contact + Footer.
6. All scroll animations (Part 7), Lenis, reduced motion.
7. `/work`, `/work/[slug]` and 404 pages.
8. Responsive pass, light mode check, accessibility, SEO, `npm run build`.
9. Final comparison: screenshot the full home page at 1440px and compare it side by side with `design-reference.jpg`. Fix spacing, sizes and colors until they match. Then give me the final report.
