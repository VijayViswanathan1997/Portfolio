"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects, type Project } from "@/lib/content";
import ProjectCover from "./ProjectCover";
import Reveal from "./Reveal";

function ExternalIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
      <path
        d="M1 8 8 1M3 1h5v5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Links({ project, tone }: { project: Project; tone: "light" | "dark" }) {
  if (project.links.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {project.links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={
            tone === "light"
              ? "pill bg-cream-2/90 backdrop-blur-sm"
              : "pill pill-solid"
          }
        >
          {l.label}
          <ExternalIcon />
        </a>
      ))}
    </div>
  );
}

function Media({ project }: { project: Project }) {
  if (project.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover"
      />
    );
  }
  return <ProjectCover kind={project.cover} />;
}

function Panel({
  project,
  index,
  active,
  onActivate,
}: {
  project: Project;
  index: number;
  active: boolean;
  onActivate: () => void;
}) {
  return (
    <div
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      style={{
        // Collapsed panels hold a fixed sliver; the open one takes the rest.
        flexGrow: active ? projects.length : 1,
        flexBasis: 0,
      }}
      className="relative cursor-pointer overflow-hidden rounded-3xl border border-line bg-cream-2 transition-[flex-grow] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      {/* Collapsed — number, rotated title, plus sign */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-between py-5 transition-opacity duration-300 ${
          active ? "pointer-events-none opacity-0" : "opacity-100 delay-200"
        }`}
      >
        <span className="text-[0.58rem] text-muted tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className="display max-h-[22rem] overflow-hidden text-lg whitespace-nowrap text-ink"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {project.title}
        </h3>
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink/8 text-ink">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M5 0v10M0 5h10"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="absolute inset-0 flex flex-col"
          >
            <div className="relative min-h-0 flex-1 overflow-hidden">
              <Media project={project} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />

              <div className="absolute inset-x-6 bottom-5 flex flex-wrap items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[0.58rem] tracking-[0.22em] text-cream-2/70 uppercase">
                    {project.subtitle}
                  </p>
                  <h3 className="display mt-1.5 text-2xl text-cream-2 md:text-3xl">
                    {project.title}
                  </h3>
                </div>
                <Links project={project} tone="light" />
              </div>
            </div>

            <div className="grid shrink-0 gap-x-8 gap-y-4 bg-cream-2 px-6 py-5 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <p className="text-sm text-muted">{project.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-2.5 py-1 text-[0.65rem] text-ink/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <ul className="hidden space-y-1.5 lg:block">
                {project.highlights.slice(0, 4).map((h) => (
                  <li key={h} className="flex gap-2.5 text-[0.78rem] text-muted">
                    <span className="mt-[0.5rem] h-px w-2.5 shrink-0 bg-line-strong" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Work() {
  const [active, setActive] = useState(0);

  return (
    <section id="work" className="scroll-mt-24 py-24 md:py-36">
      <div className="shell">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">
                <span className="text-ink/35">03</span> Work
              </p>
              <h2 className="display mt-6 text-[clamp(2.2rem,5.5vw,3.6rem)] text-ink">
                Things I&rsquo;ve <span className="accent">built.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted">
              Production applications across mobile, web, healthcare, home
              services, transportation and business platforms. Hover a panel to
              open it.
            </p>
          </div>
        </Reveal>

        {/* Desktop — horizontal accordion */}
        <Reveal delay={0.1}>
          <div className="mt-12 hidden h-[32rem] gap-2 md:flex">
            {projects.map((p, i) => (
              <Panel
                key={p.title}
                project={p}
                index={i}
                active={active === i}
                onActivate={() => setActive(i)}
              />
            ))}
          </div>
        </Reveal>

        {/* Mobile — stacked cards */}
        <div className="mt-10 grid gap-5 md:hidden">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={Math.min(i * 0.05, 0.3)}>
              <article className="overflow-hidden rounded-3xl border border-line bg-cream-2">
                <div className="relative aspect-[16/10]">
                  <Media project={p} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
                  <div className="absolute inset-x-5 bottom-4">
                    <p className="text-[0.55rem] tracking-[0.2em] text-cream-2/70 uppercase">
                      {p.subtitle}
                    </p>
                    <h3 className="display mt-1 text-2xl text-cream-2">
                      {p.title}
                    </h3>
                  </div>
                </div>
                <div className="space-y-4 p-5">
                  <p className="text-sm text-muted">{p.description}</p>
                  <ul className="space-y-1.5">
                    {p.highlights.slice(0, 3).map((h) => (
                      <li
                        key={h}
                        className="flex gap-2.5 text-[0.78rem] text-muted"
                      >
                        <span className="mt-[0.5rem] h-px w-2.5 shrink-0 bg-line-strong" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line px-2.5 py-1 text-[0.65rem] text-ink/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Links project={p} tone="dark" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
