// All text and data for the portfolio live in this one file.
// Change your content here — the components read everything from `site`.

export type Project = {
  slug: string;
  name: string;
  kind: string;
  url: string;
  live: string;
  github?: string;
  role: string;
  timeline: string;
  stats: [string, string][]; // [big number, small label]
  story: string;
  stack: string[];
  desktop: string;
  mobile: string;
  caseStudy: { problem: string; approach: string; outcome: string };
};

export const site = {
  name: "Ahmad",
  wordmark: "AHMAD",
  role: "Software Engineer",
  location: "Karachi, Pakistan",
  email: "hello@ahmad.dev", // TODO: replace with real
  github: "https://github.com/ahmad-dev", // TODO: replace with real
  linkedin: "https://linkedin.com/in/ahmad-dev", // TODO: replace with real
  cv: "/cv.pdf",

  hero: {
    eyebrow: "SOFTWARE ENGINEER · 3 YEARS SHIPPING",
    lines: ["I BUILD", "SYSTEMS", "THAT"],
    accent: "STAY UP",
    text: "Full-stack engineer building payment, logistics and developer tools. Scroll — the system will walk you through my work.",
  },

  about: {
    title: "Hi, I'm Ahmad",
    text: "Software engineer in Karachi. For three years I've built the parts of products people only notice when they break — payments, pipelines and live dashboards.",
    facts: [
      ["Now", "Engineer @ Paylane"], // TODO: replace with real
      ["Before", "Northwind Logistics"], // TODO: replace with real
      ["Focus", "Backend & full-stack"],
      ["Based", "Karachi · remote ok"],
    ] as [string, string][],
  },

  projects: [
    {
      // TODO: replace with real project, company and numbers
      slug: "ledgerline",
      name: "Ledgerline",
      kind: "Payments · Paylane · 2025",
      url: "ledgerline.paylane.app",
      live: "#",
      role: "Backend engineer",
      timeline: "2025 · 5 months",
      stats: [
        ["6h → 18m", "daily close"],
        ["2.1M", "txns / day"],
      ],
      story: "Finance matched bank settlements by hand every morning. I built the service that does it automatically.",
      stack: ["Go", "Kafka", "PostgreSQL", "AWS"],
      desktop: "/projects/ledgerline-desktop.png",
      mobile: "/projects/ledgerline-mobile.png",
      caseStudy: {
        problem:
          "Every morning, two people on the finance team downloaded settlement files from five banks and matched them against our payouts in a spreadsheet. It took around six hours, and mistakes were often found days later.",
        approach:
          "I built a Go service that pulls settlement files as soon as banks publish them, streams each line through Kafka and matches it against our ledger in PostgreSQL. Anything that doesn't match cleanly goes to a small review queue with the reason attached.",
        outcome:
          "The daily close now takes about 18 minutes, and finance only looks at the few transactions that really need a person. The service handles around 2.1 million transactions a day.",
      },
    },
    {
      // TODO: replace with real project, company and numbers
      slug: "routewise",
      name: "Routewise",
      kind: "Logistics · Northwind · 2024",
      url: "dispatch.northwind.io",
      live: "#",
      role: "Full-stack engineer",
      timeline: "2023 — 2024 · 9 months",
      stats: [
        ["1,200", "drivers live"],
        ["9 → 3 min", "per dispatch"],
      ],
      story: "A live dispatch board and driver app that replaced spreadsheets and phone calls.",
      stack: ["Next.js", "WebSockets", "PostGIS"],
      desktop: "/projects/routewise-desktop.png",
      mobile: "/projects/routewise-mobile.png",
      caseStudy: {
        problem:
          "Dispatchers assigned orders through phone calls and a shared spreadsheet. Nobody knew exactly where drivers were, so each order took around nine minutes to place.",
        approach:
          "I built a live dispatch board in Next.js with driver locations streamed over WebSockets, plus a simple driver app. PostGIS finds the nearest free drivers, so a dispatcher can assign an order in two clicks.",
        outcome:
          "Dispatch time dropped from nine minutes to three per order. The board is used every day for 1,200 drivers across three cities.",
      },
    },
    {
      // TODO: replace with real project and numbers
      slug: "pulsecheck",
      name: "Pulsecheck",
      kind: "Open source · 2024 — now",
      url: "github.com/ahmad-dev/pulsecheck",
      live: "#",
      github: "https://github.com/ahmad-dev/pulsecheck",
      role: "Creator & maintainer",
      timeline: "2024 — now",
      stats: [
        ["1.4k", "GitHub stars"],
        ["22", "contributors"],
      ],
      story: "A small self-hosted uptime monitor and status page I maintain in my free time.",
      stack: ["TypeScript", "Hono", "SQLite"],
      desktop: "/projects/pulsecheck-desktop.png",
      mobile: "/projects/pulsecheck-mobile.png",
      caseStudy: {
        problem:
          "Most uptime tools were either paid SaaS products or heavy to host yourself. I wanted something small enough to run on a five-dollar server.",
        approach:
          "Pulsecheck is a single TypeScript app built with Hono and SQLite. It checks your URLs on a schedule, keeps a short history and serves a clean public status page. Setup is one command.",
        outcome:
          "It has 1.4k stars on GitHub and 22 contributors so far. People use it for side projects, small agencies and internal tools.",
      },
    },
  ] as Project[],

  experience: [
    // TODO: replace with real
    { years: "2025—NOW", role: "Software Engineer", place: "Paylane · Remote", current: true },
    { years: "2023—24", role: "Associate Engineer", place: "Northwind Logistics" },
    { years: "2023", role: "Intern", place: "Cloudlane Labs" },
  ],

  tools: [
    "Python",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Go",
    "React",
    "Next.js",
    "HTML",
    "CSS",
    "PostgreSQL",
    "Redis",
    "Docker",
    "AWS",
    "Git",
  ],

  contact: {
    lines: ["LET'S BUILD", "SOMETHING"],
    accent: "THAT STAYS UP",
    text: "Open to full-time roles and freelance work. I reply within a day.",
  },
};
