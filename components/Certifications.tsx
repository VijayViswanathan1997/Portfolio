"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { certifications } from "@/lib/content";
import Reveal from "./Reveal";

export default function Certifications() {
  const listRef = useRef<HTMLDivElement>(null);

  // A spine that fills as the list travels through the viewport.
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 85%", "end 65%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section className="bg-cream-2 py-24 md:py-36">
      <div className="shell grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">
            <span className="text-ink/35">06</span> Certifications
          </p>
          <h2 className="display mt-6 text-[clamp(2.2rem,5.5vw,3.6rem)] text-ink">
            Always
            <br />
            <span className="accent">learning.</span>
          </h2>
          <p className="mt-5 max-w-xs text-sm text-muted">
            Four areas I keep sharpening — mobile, backend, data and whatever
            comes next.
          </p>
        </Reveal>

        <div ref={listRef} className="relative pl-8">
          {/* Spine */}
          <span
            aria-hidden
            className="absolute top-0 bottom-0 left-0 w-px bg-line"
          />
          <motion.span
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-ink"
          />

          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06}>
              <div className="group relative border-b border-line py-6 transition-colors last:border-0 hover:border-line-strong">
                {/* Node on the spine */}
                <span
                  aria-hidden
                  className="absolute top-[1.9rem] -left-8 h-[0.55rem] w-[0.55rem] -translate-x-[0.25rem] rounded-full border-2 border-ink bg-cream-2 transition-colors duration-300 group-hover:bg-ink"
                />
                <div className="flex gap-5">
                  <span className="pt-1 text-[0.62rem] text-muted tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[1.05rem] text-ink transition-transform duration-300 group-hover:translate-x-1">
                      {c.name}
                    </p>
                    <p className="mt-1 text-[0.72rem] tracking-[0.14em] text-muted uppercase">
                      {c.issuer}
                    </p>
                    <p className="mt-3 max-w-xl text-sm text-muted">
                      {c.detail}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
