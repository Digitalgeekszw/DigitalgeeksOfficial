"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { products, companyLinks } from "../constants/site";

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const CompanyMenu = ({ pathname }) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const wrapperRef = useRef(null);
  const menuId = useId();

  const close = useCallback((returnFocus) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e) => {
      if (!wrapperRef.current?.contains(e.target)) close(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") close(true);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  const active = companyLinks.some((l) => l.href === pathname);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onBlur={(e) => {
        if (open && !wrapperRef.current?.contains(e.relatedTarget)) close(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex min-h-[44px] items-center gap-1 px-3 text-[14px] font-medium transition-colors duration-200 ${
          active ? "text-dg-ink" : "text-dg-ink-2 hover:text-dg-ink"
        }`}
      >
        Company
        <svg aria-hidden="true" viewBox="0 0 12 12" className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <ul
        id={menuId}
        hidden={!open}
        className="absolute left-1/2 top-full mt-2 w-56 -translate-x-1/2 rounded-dg-md border border-dg-line bg-white py-2 shadow-[0_12px_32px_-12px_rgba(10,11,13,0.18)]"
      >
        {companyLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={() => close(false)}
              aria-current={pathname === link.href ? "page" : undefined}
              className="flex min-h-[44px] items-center px-4 text-[15px] text-dg-ink-2 hover:bg-dg-surface-2 hover:text-dg-ink aria-[current=page]:font-semibold aria-[current=page]:text-dg-ink"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const panelId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback((returnFocus = true) => {
    setMenuOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Mobile menu: lock page scroll, move focus in, trap Tab, close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector(focusableSelector)?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        closeMenu(true);
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = [toggleRef.current, ...panelRef.current.querySelectorAll(focusableSelector)];
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) closeMenu(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen, closeMenu]);

  // No backdrop-filter while the mobile menu is open: it would become the
  // containing block for the fixed-position panel.
  const surface = menuOpen
    ? "border-dg-line bg-white"
    : scrolled
      ? "border-dg-line bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80"
      : "border-transparent bg-white/0";

  return (
    <header
      className={`dg-site fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-200 ${surface}`}
    >
      <nav aria-label="Main" className="mx-auto flex h-dg-nav w-full max-w-dg-content items-center justify-between px-dg-gutter">
        <Link href="/" className="flex min-h-[44px] items-center" aria-label="DigitalGeeks home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/digitalgeeks-wordmark-sm.png"
            alt=""
            width={280}
            height={77}
            className="h-9 w-auto"
          />
        </Link>

        <ul className="hidden items-center sm:flex">
          {products.map((p) => (
            <li key={p.id}>
              <a href={`/#${p.id}`} className="inline-flex min-h-[44px] items-center px-3 text-[14px] font-medium text-dg-ink-2 transition-colors duration-200 hover:text-dg-ink">
                {p.name}
              </a>
            </li>
          ))}
          <li>
            <CompanyMenu pathname={pathname} />
          </li>
          <li>
            <Link
              href="/contact"
              aria-current={pathname === "/contact" ? "page" : undefined}
              className="ml-2 inline-flex min-h-[40px] items-center rounded-full bg-dg-ink px-4 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-dg-ink-2"
            >
              Contact
            </Link>
          </li>
        </ul>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-dg-ink sm:hidden"
          aria-expanded={menuOpen}
          aria-controls={panelId}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => (menuOpen ? closeMenu(true) : setMenuOpen(true))}
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <path d="M4 8h16M4 16h16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      <div
        id={panelId}
        ref={panelRef}
        hidden={!menuOpen}
        className="fixed inset-x-0 bottom-0 top-dg-nav overflow-y-auto bg-white px-dg-gutter pb-10 pt-4 sm:hidden"
      >
        <p className="pt-2 text-[13px] font-medium text-dg-ink-3">Products</p>
        <ul className="mt-1 border-b border-dg-line pb-4">
          {products.map((p) => (
            <li key={p.id}>
              <a href={`/#${p.id}`} onClick={() => closeMenu(false)} className="flex min-h-[52px] items-center font-display text-[26px] font-semibold tracking-[-0.02em] text-dg-ink">
                {p.name}
              </a>
            </li>
          ))}
        </ul>
        <p className="pt-5 text-[13px] font-medium text-dg-ink-3">Company</p>
        <ul className="mt-1">
          {companyLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => closeMenu(false)}
                aria-current={pathname === link.href ? "page" : undefined}
                className="flex min-h-[48px] items-center text-[18px] text-dg-ink-2 aria-[current=page]:font-semibold aria-[current=page]:text-dg-ink"
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              onClick={() => closeMenu(false)}
              className="mt-6 flex min-h-[52px] items-center justify-center rounded-full bg-dg-ink text-[17px] font-medium text-white"
            >
              Contact us
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
