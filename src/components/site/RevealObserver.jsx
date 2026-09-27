"use client";

import { useEffect } from "react";

// Keep in sync with --dg-dur in index.css, plus headroom for staggered delays.
const REVEAL_MS = 700;

/**
 * Adds a short fade-and-rise to elements marked `.dg-reveal` as they enter the
 * viewport, on every page.
 *
 * - Content is only hidden once this script runs and the visitor allows
 *   motion, so it stays visible if scripts or animations fail.
 * - Anything already on screen is shown immediately, without animating.
 * - State lives in data attributes rather than classes, so React re-renders
 *   that change an element's className cannot hide it again.
 * - Elements added later (client-side navigation, filtered lists) are picked
 *   up by a MutationObserver.
 * - Stagger with `style={{ "--dg-reveal-delay": "120ms" }}`.
 */
export default function RevealObserver() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) return;

    const finish = (el) => {
      el.dataset.revealDone = "";
    };

    const reveal = (el, animate) => {
      el.dataset.revealed = "";
      if (!animate) {
        finish(el);
        return;
      }
      // Hand transitions back to the element's own classes (hover effects etc.)
      // once the reveal has played.
      const delay = parseFloat(getComputedStyle(el).getPropertyValue("--dg-reveal-delay")) || 0;
      window.setTimeout(() => finish(el), REVEAL_MS + delay + 100);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            io.unobserve(entry.target);
            reveal(entry.target, true);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );

    const register = (el) => {
      if ("revealed" in el.dataset) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        reveal(el, false);
      } else {
        io.observe(el);
      }
    };

    const scan = (root) => {
      if (root.nodeType !== 1) return;
      if (root.classList.contains("dg-reveal")) register(root);
      root.querySelectorAll(".dg-reveal").forEach(register);
    };

    scan(document.body);
    const root = document.documentElement;
    root.classList.add("dg-reveal-ready");

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach(scan));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
      root.classList.remove("dg-reveal-ready");
    };
  }, []);

  return null;
}
