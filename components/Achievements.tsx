"use client";

import { achievements } from "@/lib/content";
import Reveal from "./Reveal";

type Achievement = (typeof achievements)[number];
type IconName = Achievement["icon"];

/** Mark for the floating tile that sits on the card's top edge. */
function Glyph({ name }: { name: IconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
      {name === "clock" && (
        <g {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </g>
      )}
      {name === "phone" && (
        <g {...common}>
          <rect x="6" y="2.5" width="12" height="19" rx="3" />
          <path d="M10.5 18.5h3" />
        </g>
      )}
      {name === "people" && (
        <g {...common}>
          <circle cx="9" cy="8.5" r="3.2" />
          <path d="M3 19.5c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
          <path d="M16 6.2a3.2 3.2 0 0 1 0 6.1M17.5 14.6c2.1.7 3.5 2.5 3.5 4.9" />
        </g>
      )}
      {name === "chart" && (
        <g {...common}>
          <path d="M3 17.5 9 11l4 3.6 7.5-8" />
          <path d="M15.5 6.6h5v5" />
        </g>
      )}
    </svg>
  );
}

function Card({ item, index }: { item: Achievement; index: number }) {
  return (
    <article className="relative w-[20rem] shrink-0 rounded-3xl border border-line bg-cream-2 pt-9 pr-6 pb-6 pl-6 transition-transform duration-300 hover:-translate-y-1.5 md:w-[26rem]">
      {/* Floating mark, straddling the top edge */}
      <span className="absolute -top-6 left-6 grid h-13 w-13 place-items-center rounded-2xl border border-line bg-cream p-3 text-ink shadow-[0_12px_24px_-14px_rgba(33,31,61,0.55)]">
        <Glyph name={item.icon} />
      </span>

      <span className="absolute top-5 right-6 text-[0.58rem] text-muted tabular-nums">
        {String(index + 1).padStart(2, "0")} / {achievements.length}
      </span>

      <div className="mt-7 flex items-end justify-between gap-5">
        <div className="min-w-0">
          <p className="text-[0.95rem] font-semibold text-ink">{item.title}</p>
          <p className="mt-1 text-[0.56rem] tracking-[0.24em] text-muted uppercase">
            {item.kind}
          </p>
        </div>

        <p className="display shrink-0 leading-none text-ink">
          <span className="text-[2.9rem] md:text-[3.4rem]">{item.metric}</span>
          {item.unit && (
            <span className="ml-1.5 text-xl text-ink/55">{item.unit}</span>
          )}
        </p>
      </div>

      <p className="mt-4 border-t border-line pt-3.5 text-xs text-muted">
        {item.note}
      </p>
    </article>
  );
}

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="scroll-mt-24 overflow-hidden py-24 md:py-36"
    >
      <div className="shell flex flex-wrap items-end justify-between gap-4">
        <Reveal>
          <p className="eyebrow">
            <span className="text-ink/35">07</span> Achievements
          </p>
          <h2 className="display mt-6 text-[clamp(2.2rem,5.5vw,3.6rem)] text-ink">
            Proud <span className="accent">moments.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="accent text-xl text-muted">and counting</p>
        </Reveal>
      </div>

      {/*
        Continuous rail. Two identical runs sit side by side and the track
        slides exactly one run's width, so the seam never shows. Hovering
        pauses it so a card can be read.
      */}
      <Reveal delay={0.12}>
        <div className="group mt-16 flex overflow-hidden py-8">
          {[0, 1].map((run) => (
            <div
              key={run}
              aria-hidden={run === 1}
              className="flex shrink-0 gap-5 pr-5 animate-rail group-hover:[animation-play-state:paused]"
            >
              {achievements.map((a, i) => (
                <Card key={a.title} item={a} index={i} />
              ))}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
