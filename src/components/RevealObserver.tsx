"use client";

import { useEffect } from "react";

// Small screens / reduced motion: fades each ".reveal" element up the first time it
// scrolls into view, using one IntersectionObserver and a CSS transition.
export default function RevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.is-in)");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
