"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { fullName, navItems, profile } from "@/lib/content";

export default function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  // Highlight whichever section currently owns the upper third of the viewport.
  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Monogram — fixed to the top-left corner.
          Carries its own cream backdrop so it stays legible over the dark
          contact section as well as the light ones. */}
      <a
        href="#top"
        className="fixed top-5 left-5 z-50 flex items-center gap-2.5 rounded-full border border-line bg-cream-2/70 py-1.5 pr-4 pl-1.5 backdrop-blur-md md:top-7 md:left-8"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-[0.65rem] font-semibold tracking-wider text-cream-2">
          {profile.initials}
        </span>
        <span className="hidden text-sm text-ink/80 sm:block">{fullName}</span>
      </a>

      {/* Pill nav — desktop */}
      <nav className="fixed top-5 right-5 z-50 hidden md:top-7 md:right-8 lg:block">
        <ul className="flex items-center gap-1 rounded-full border border-line bg-cream-2/70 p-1.5 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  className={`relative block rounded-full px-4 py-2 text-[0.8rem] transition-colors ${
                    isActive ? "text-cream-2" : "text-ink/70 hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Menu button — mobile and tablet */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="fixed top-5 right-5 z-50 grid h-10 w-10 place-items-center rounded-full border border-line bg-cream-2/80 backdrop-blur-md md:top-7 md:right-8 lg:hidden"
      >
        <span className="relative block h-3 w-4">
          <span
            className={`absolute left-0 block h-px w-4 bg-ink transition-transform duration-300 ${
              open ? "top-1.5 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 block h-px w-4 bg-ink transition-transform duration-300 ${
              open ? "top-1.5 -rotate-45" : "top-3"
            }`}
          />
        </span>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-cream/95 backdrop-blur-lg lg:hidden"
        >
          {navItems.map((item, i) => (
            <motion.a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="display text-4xl text-ink"
            >
              {item.label}
            </motion.a>
          ))}
        </motion.div>
      )}
    </>
  );
}
