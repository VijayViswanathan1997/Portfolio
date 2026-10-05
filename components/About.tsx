"use client";

import { about, profile } from "@/lib/content";
import IdBadge from "./IdBadge";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="shell scroll-mt-24 py-24 md:py-36">
      <Reveal>
        <p className="eyebrow">
          <span className="text-ink/35">01</span> About
        </p>
      </Reveal>

      <div className="mt-10 grid gap-14 lg:grid-cols-[1.05fr_auto_0.95fr] lg:gap-10">
        {/* Left — intro copy */}
        <Reveal delay={0.05}>
          <h2 className="display text-[clamp(2.2rem,5.5vw,3.6rem)] text-ink">
            Hi, I&rsquo;m <span className="accent">{profile.firstName}.</span>
          </h2>
          <div className="mt-6 max-w-md space-y-4">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className={i === 0 ? "text-ink/85" : "text-sm text-muted"}
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-solid"
            >
              Résumé
              <svg width="11" height="12" viewBox="0 0 11 12" fill="none">
                <path
                  d="M5.5 0v9M1.5 5.5l4 4 4-4M0 11.5h11"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            {[
              ["GitHub", profile.github],
              ["LinkedIn", profile.linkedin],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="pill"
              >
                {label}
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path
                    d="M1 8 8 1M3 1h5v5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            ))}
          </div>
        </Reveal>

        {/* Middle — the badge */}
        <Reveal delay={0.12} className="flex justify-center lg:pt-2">
          <IdBadge />
        </Reveal>

        {/* Right — quick facts */}
        <Reveal delay={0.18}>
          <p className="eyebrow">Quick facts</p>
          <dl className="mt-6">
            {about.facts.map((f) => (
              <div
                key={f.k}
                className="flex items-baseline justify-between gap-6 border-b border-line py-3.5"
              >
                <dt className="shrink-0 text-sm text-muted">{f.k}</dt>
                <dd className="text-right text-sm font-medium text-ink">
                  {f.v}
                </dd>
              </div>
            ))}
          </dl>
          <p className="accent mt-8 text-xl text-ink/80">
            &ldquo;{about.quote}&rdquo;
          </p>
        </Reveal>
      </div>
    </section>
  );
}
