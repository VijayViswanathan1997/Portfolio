"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FAMILIES, skills, type Family, type Skill } from "@/lib/content";
import Reveal from "./Reveal";

const deviconUrl = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`;

/** Darker tile = stronger skill, when nothing is filtered. */
const levelStyles: Record<1 | 2 | 3, string> = {
  3: "bg-ink text-cream-2 border-ink",
  2: "bg-ink/55 text-cream-2 border-transparent",
  1: "bg-ink/[0.07] text-ink/70 border-line",
};

/** Picking a family promotes every match to the full dark state. */
const SELECTED = "bg-ink text-cream-2 border-ink";

/**
 * The entry animation lives on a wrapper, not the button. Motion writes its
 * animated values as inline styles, and an inline `opacity: 1` would override
 * the `opacity-25` class that dims unmatched tiles — which is why filtering
 * appeared to do nothing.
 */
function Tile({
  skill,
  index,
  dimmed,
  selected,
  onHover,
}: {
  skill: Skill;
  index: number;
  dimmed: boolean;
  selected: boolean;
  onHover: (s: Skill | null) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.012, 0.3),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <button
        type="button"
        onMouseEnter={() => onHover(skill)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(skill)}
        onBlur={() => onHover(null)}
        aria-label={`${skill.name} — ${FAMILIES[skill.family]}`}
        aria-pressed={selected}
        className={`relative flex aspect-square w-full flex-col justify-between rounded-xl border p-2 text-left transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-cream md:p-2.5 ${
          selected ? SELECTED : levelStyles[skill.level]
        } ${
          dimmed
            ? "scale-[0.96] opacity-20"
            : "opacity-100 hover:-translate-y-1"
        } ${selected ? "shadow-[0_12px_26px_-12px_rgba(33,31,61,0.6)]" : ""}`}
      >
        <span className="text-[0.5rem] opacity-55 tabular-nums md:text-[0.55rem]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="display text-lg leading-none md:text-2xl">
          {skill.symbol}
        </span>
        <span className="truncate text-[0.46rem] opacity-70 md:text-[0.55rem]">
          {skill.name}
        </span>
      </button>
    </motion.div>
  );
}

export default function Skills() {
  const [family, setFamily] = useState<Family | null>(null);
  const [hovered, setHovered] = useState<Skill | null>(null);
  const [iconFailed, setIconFailed] = useState(false);

  const families = Object.entries(FAMILIES) as [Family, string][];
  const matchCount = family
    ? skills.filter((s) => s.family === family).length
    : skills.length;

  return (
    <section id="skills" className="scroll-mt-24 bg-cream-2 py-24 md:py-36">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">
            <span className="text-ink/35">02</span> Skills
          </p>
          <h2 className="display mt-6 text-[clamp(2.2rem,5.5vw,3.6rem)] text-ink">
            The technologies I <span className="accent">build with.</span>
          </h2>
          <p className="mt-4 max-w-md text-sm text-muted">
            {skills.length} elements across {families.length} families. Hover a
            tile to see its logo, or pick a family to light it up.
          </p>
        </Reveal>

        {/* Family filters */}
        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            {families.map(([key, label]) => {
              const on = family === key;
              return (
                <button
                  key={key}
                  onClick={() => setFamily(on ? null : key)}
                  aria-pressed={on}
                  className={`pill text-[0.78rem] ${on ? "pill-solid" : "bg-cream"}`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      on ? "bg-cream-2" : "bg-ink/40"
                    }`}
                  />
                  {label}
                </button>
              );
            })}

            {family && (
              <button
                onClick={() => setFamily(null)}
                className="ml-1 text-[0.72rem] text-muted underline underline-offset-4 transition-colors hover:text-ink"
              >
                Clear ({matchCount})
              </button>
            )}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_17rem] lg:gap-14">
          {/* The table */}
          <div className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 md:gap-2 lg:grid-cols-8">
            {skills.map((s, i) => (
              <Tile
                key={s.name}
                skill={s}
                index={i}
                dimmed={Boolean(family) && s.family !== family}
                selected={Boolean(family) && s.family === family}
                onHover={(sk) => {
                  setHovered(sk);
                  setIconFailed(false);
                }}
              />
            ))}
          </div>

          {/* Detail panel */}
          <div className="relative hidden min-h-[16rem] items-center justify-center lg:flex">
            <AnimatePresence mode="wait">
              {hovered ? (
                <motion.div
                  key={hovered.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="grid h-24 w-24 place-items-center">
                    {hovered.icon && !iconFailed ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={deviconUrl(hovered.icon)}
                        alt=""
                        className="h-20 w-20 object-contain"
                        onError={() => setIconFailed(true)}
                      />
                    ) : (
                      <span className="display text-5xl text-ink/80">
                        {hovered.symbol}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 text-lg font-medium text-ink">
                    {hovered.name}
                  </p>
                  <p className="mt-1 text-[0.6rem] tracking-[0.22em] text-muted uppercase">
                    {FAMILIES[hovered.family]}
                  </p>
                  <div className="mt-3 flex gap-1">
                    {[1, 2, 3].map((n) => (
                      <span
                        key={n}
                        className={`h-1 w-6 rounded-full ${
                          n <= hovered.level ? "bg-ink" : "bg-ink/15"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-[11rem] text-center text-xs text-muted"
                >
                  Hover any element to see its logo.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
