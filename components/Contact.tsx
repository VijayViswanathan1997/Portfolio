"use client";

import { contact, fullName, profile } from "@/lib/content";
import Reveal from "./Reveal";

export default function Contact() {
  const marquee = `${profile.role} — Available for work — `;

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-ink pt-24 pb-10 text-cream-2 md:pt-36"
    >
      <div className="shell">
        <Reveal>
          <p className="eyebrow !text-cream-2/45 after:!bg-cream-2/20">
            <span className="text-cream-2/30">08</span> Contact
          </p>
          <h2 className="display mt-6 text-[clamp(2.4rem,8vw,6rem)] text-cream-2">
            Let&rsquo;s build
            <br />
            <span className="accent text-cream-2/70">something.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-8 max-w-md text-cream-2/80">{contact.lead}</p>
          <p className="mt-1 max-w-md text-sm text-cream-2/50">{contact.sub}</p>
        </Reveal>

        <Reveal delay={0.14}>
          <dl className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              ["Email", profile.email, `mailto:${profile.email}`],
              ["Phone", profile.phone, `tel:${profile.phoneHref}`],
              ["Location", profile.location, null],
            ].map(([k, v, href]) => (
              <div key={k as string}>
                <dt className="text-[0.58rem] tracking-[0.24em] text-cream-2/40 uppercase">
                  {k}
                </dt>
                <dd className="mt-2">
                  {href ? (
                    <a
                      href={href as string}
                      className="border-b border-cream-2/25 pb-1 text-[0.95rem] break-all transition-colors hover:border-cream-2"
                    >
                      {v}
                    </a>
                  ) : (
                    <span className="text-[0.95rem]">{v}</span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-3">
            {[
              ["GitHub", profile.github],
              ["LinkedIn", profile.linkedin],
              ["Résumé", profile.resumeUrl],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="pill !border-cream-2/25 text-cream-2 hover:!border-cream-2"
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
      </div>

      {/* Marquee */}
      <div
        aria-hidden
        className="mt-20 flex overflow-hidden border-y border-cream-2/12 py-5"
      >
        <div className="animate-marquee flex shrink-0 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, block) => (
            <span key={block} className="flex shrink-0">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className="display px-5 text-2xl text-cream-2/25 md:text-4xl"
                >
                  {marquee}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="shell mt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-cream-2/45">
        <p>
          © {new Date().getFullYear()} {fullName}
        </p>
        <p>{profile.location}</p>
        <a href="#top" className="transition-colors hover:text-cream-2">
          Back to top ↑
        </a>
      </div>
    </section>
  );
}
