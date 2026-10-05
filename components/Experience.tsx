"use client";

import { experience } from "@/lib/content";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 bg-cream-2 py-24 md:py-36">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">
            <span className="text-ink/35">04</span> Experience
          </p>
          <h2 className="display mt-6 text-[clamp(2.2rem,5.5vw,3.6rem)] text-ink">
            Where I&rsquo;ve <span className="accent">worked.</span>
          </h2>
        </Reveal>

        <div className="relative mt-14">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[0.3rem] w-px bg-line"
          />

          <div className="space-y-16">
            {experience.map((role, i) => (
              <Reveal key={role.org} delay={i * 0.08}>
                <div className="relative pl-9">
                  <span className="absolute top-2 left-0 h-[0.65rem] w-[0.65rem] rounded-full border-2 border-ink bg-cream-2" />

                  <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
                    <div>
                      <p className="text-[0.62rem] tracking-[0.24em] text-muted uppercase">
                        {role.period}
                      </p>
                      <h3 className="display mt-2 text-2xl text-ink md:text-3xl">
                        {role.title}
                      </h3>
                      <p className="mt-1 text-sm text-ink/60">
                        {role.org} · {role.place}
                      </p>

                      <ul className="mt-5 space-y-2">
                        {role.points.map((pt) => (
                          <li key={pt} className="flex gap-3 text-sm text-muted">
                            <span className="mt-[0.45rem] h-px w-3 shrink-0 bg-line-strong" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key achievements for this role */}
                    <div className="rounded-3xl border border-line bg-cream p-6">
                      <p className="eyebrow">Key achievements</p>
                      <div className="mt-5 space-y-5">
                        {role.wins.map((w) => (
                          <div
                            key={w.label}
                            className="flex items-baseline gap-4 border-b border-line pb-4 last:border-0 last:pb-0"
                          >
                            <span className="display shrink-0 text-2xl text-ink">
                              {w.metric}
                            </span>
                            <span className="text-[0.8rem] text-muted">
                              {w.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
