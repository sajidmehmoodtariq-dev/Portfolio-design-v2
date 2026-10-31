// Maps the names in site.tools to their official logos and brand colours.
// Logos come from react-icons: Simple Icons (Si…) first, Devicon (Di…) as a fallback.
import type { IconType } from "react-icons";
import { DiAws } from "react-icons/di";
import {
  SiCss,
  SiDocker,
  SiGit,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTypescript,
} from "react-icons/si";

type TechIcon = { Icon: IconType; color: string };

export const techIcons: Record<string, TechIcon> = {
  Python: { Icon: SiPython, color: "#3776AB" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E" },
  Go: { Icon: SiGo, color: "#00ADD8" },
  React: { Icon: SiReact, color: "#61DAFB" },
  // Next.js's brand colour is black, so it uses the text colour to stay visible in dark mode
  "Next.js": { Icon: SiNextdotjs, color: "var(--text)" },
  HTML: { Icon: SiHtml5, color: "#E34F26" },
  CSS: { Icon: SiCss, color: "#663399" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  Redis: { Icon: SiRedis, color: "#FF4438" },
  Docker: { Icon: SiDocker, color: "#2496ED" },
  // Simple Icons has no AWS logo, so this one comes from Devicon
  AWS: { Icon: DiAws, color: "#FF9900" },
  Git: { Icon: SiGit, color: "#F05032" },
};
