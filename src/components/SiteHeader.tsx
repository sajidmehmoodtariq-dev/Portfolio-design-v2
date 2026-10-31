"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { site } from "@/content/site";
import { goToChapter } from "@/lib/tour";
import Button from "@/components/ui/Button";
import Dot from "@/components/ui/Dot";
import ThemeToggle from "@/components/ui/ThemeToggle";

// Top bar: wordmark on the left, "Let's talk" + theme toggle on the right.
// On the home page during the desktop tour it stays fixed (see .site-header in globals.css).
export default function SiteHeader({ back }: { back?: { href: string; label: string } }) {
  const pathname = usePathname();
  const router = useRouter();

  function letsTalk(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (pathname === "/") goToChapter("contact");
    else router.push("/#contact");
  }

  return (
    <header className="site-header z-40">
      <div className="container-page flex items-center justify-between pt-6 sm:pt-7">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            aria-label={`${site.name}, home`}
            className="font-display text-[22px] font-extrabold tracking-[0.01em]"
            style={{ fontStretch: "112%" }}
          >
            {site.wordmark}
            <Dot />
          </Link>
          {back ? (
            <Link href={back.href} className="inline-flex items-center gap-1.5 text-[15px] text-muted hover:text-text">
              <ArrowLeft size={15} aria-hidden />
              {back.label}
            </Link>
          ) : null}
        </div>
        <div className="flex items-center gap-2.5">
          <Button href="/#contact" onClick={letsTalk} variant="secondary" size="sm" arrow="right">
            Let&apos;s talk
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
