import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";

export type Arrow = "right" | "down" | "external" | "none";

type ButtonProps = {
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  arrow?: Arrow;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

// The small arrow after the button text. It moves 3px on hover (see globals.css).
function ArrowIcon({ arrow }: { arrow: Arrow }) {
  if (arrow === "right") return <ArrowRight aria-hidden size={16} className="arrow-right" />;
  if (arrow === "down") return <ArrowDown aria-hidden size={16} className="arrow-down" />;
  if (arrow === "external") return <ArrowUpRight aria-hidden size={16} className="arrow-up-right" />;
  return null;
}

// One pill button. Renders a link when `href` is given, otherwise a <button>.
export default function Button({
  variant = "primary",
  size = "md",
  arrow = "none",
  href,
  onClick,
  children,
  className = "",
  ariaLabel,
}: ButtonProps) {
  const classes = `btn btn-${variant} ${size === "sm" ? "btn-sm" : ""} ${className}`;
  const content = (
    <>
      {children}
      <ArrowIcon arrow={arrow} />
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    const isPlain = isExternal || href.startsWith("mailto:") || href.startsWith("#") || href.endsWith(".pdf");
    if (isPlain) {
      return (
        <a
          href={href}
          onClick={onClick}
          className={classes}
          aria-label={ariaLabel}
          {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel}>
      {content}
    </button>
  );
}
