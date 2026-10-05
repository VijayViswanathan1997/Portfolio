"use client";

import { education } from "@/lib/content";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <section id="education" className="shell scroll-mt-24 py-24 md:py-36">
      <Reveal>
        <p className="eyebrow">
          <span className="text-ink/35">05</span> Education
        </p>
        <h2 className="display mt-6 max-w-2xl text-[clamp(2.2rem,5.5vw,3.6rem)] text-ink">
          Education that shaped my{" "}
          <span className="accent">foundation.</span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {education.map((e, i) => (
          <Reveal key={e.degree} delay={i * 0.08}>
            <article className="flex h-full flex-col rounded-3xl border border-line bg-cream-2 p-7">
              <p className="text-[0.62rem] tracking-[0.24em] text-muted uppercase">
                {e.period}
              </p>
              <h3 className="display mt-3 text-2xl text-ink">{e.degree}</h3>
              <p className="mt-2 text-sm text-ink/70">{e.school}</p>
              <p className="mt-0.5 text-sm text-muted">{e.place}</p>
              <p className="mt-5 border-t border-line pt-4 text-sm text-muted">
                {e.detail}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
