"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { about, fullName, profile } from "@/lib/content";

/** Deterministic bar widths — same on server and client, so no hydration drift. */
const BARS = Array.from({ length: 34 }, (_, i) => 48 + ((i * 53) % 52));

function Barcode({ tone = "ink" }: { tone?: "ink" | "cream" }) {
  return (
    <div aria-hidden className="flex h-6 w-[7.5rem] items-end gap-[1.5px]">
      {BARS.map((h, i) => (
        <span
          key={i}
          className={`flex-1 ${tone === "ink" ? "bg-ink" : "bg-cream-2/80"}`}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

function Header() {
  return (
    <div className="flex items-center gap-2.5 rounded-t-2xl bg-ink px-4 py-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cream-2 text-[0.58rem] font-bold text-ink">
        {profile.initials}
      </span>
      <div className="leading-tight">
        <p className="text-[0.78rem] font-bold tracking-[0.06em] text-cream-2">
          {about.badge.label}
        </p>
        <p className="text-[0.56rem] tracking-wide text-cream-2/55">
          {about.badge.sub}
        </p>
      </div>
    </div>
  );
}

export default function IdBadge() {
  const [flipped, setFlipped] = useState(false);
  const dragged = useRef(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Horizontal drag drives the tilt, so it reads as hanging from the clip.
  const tilt = useTransform(x, [-120, 120], [-15, 15]);
  const smoothTilt = useSpring(tilt, { stiffness: 170, damping: 14 });
  const cordSkew = useTransform(smoothTilt, (t) => t * 0.45);

  return (
    <div className="flex flex-col items-center select-none">
      {/* Lanyard clip */}
      <div className="relative z-10 h-6 w-3.5 rounded-sm bg-ink">
        <div className="absolute inset-x-[3px] top-1.5 h-2.5 rounded-[1px] bg-cream-2/30" />
      </div>
      <motion.div
        style={{ rotate: cordSkew }}
        className="h-4 w-4 origin-top rounded-full border-[3px] border-ink/70"
      />

      <motion.div
        drag
        dragConstraints={{ left: -70, right: 70, top: -16, bottom: 46 }}
        dragElastic={0.2}
        dragTransition={{ bounceStiffness: 250, bounceDamping: 16 }}
        onDragStart={() => {
          dragged.current = true;
        }}
        onDragEnd={() => {
          // Let the click that ends the drag pass before re-arming the flip.
          window.setTimeout(() => (dragged.current = false), 0);
        }}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        onClick={() => {
          if (!dragged.current) setFlipped((v) => !v);
        }}
        style={{ x, y, rotate: smoothTilt, perspective: 1200 }}
        whileDrag={{ cursor: "grabbing" }}
        className="mt-[-2px] w-[16.5rem] origin-top cursor-grab"
      >
        <div
          className="relative transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ---------- FRONT ---------- */}
          <div
            className="overflow-hidden rounded-2xl bg-cream-2 shadow-[0_26px_60px_-24px_rgba(33,31,61,0.6)]"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Header />

            <div className="px-4 pt-4 pb-3">
              <div className="mx-auto w-[8.5rem] overflow-hidden rounded-lg border-2 border-ink/80 bg-cream-3">
                <div className="aspect-[3/4]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={about.badge.photo}
                    alt={fullName}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </div>
              </div>

              <p className="mt-3.5 text-center text-[0.95rem] font-bold tracking-[0.02em] text-ink uppercase">
                {fullName}
              </p>
              <p className="mt-0.5 text-center text-[0.62rem] text-muted">
                {profile.role}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  ["ID No", about.badge.idNo],
                  ["Dept", about.badge.dept],
                  ["Valid till", about.badge.validTill],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-[0.42rem] tracking-[0.18em] text-muted uppercase">
                      {k}
                    </p>
                    <p className="mt-0.5 text-[0.62rem] font-semibold text-ink">
                      {v}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-end justify-between">
                <Barcode />
                {/* grommet */}
                <span className="mb-0.5 h-3.5 w-3.5 rounded-full bg-ink/15 ring-1 ring-ink/25 ring-inset" />
              </div>
            </div>
          </div>

          {/* ---------- BACK ---------- */}
          <div
            className="absolute inset-0 overflow-hidden rounded-2xl bg-ink shadow-[0_26px_60px_-24px_rgba(33,31,61,0.6)]"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* magnetic stripe */}
            <div className="mt-7 h-9 w-full bg-cream-2/12" />

            <div className="px-4 pt-4">
              <dl className="space-y-2">
                {[
                  ["Email", profile.email],
                  ["Phone", profile.phone],
                  ["Based in", profile.location],
                  ["Clearance", about.badge.clearance],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[0.42rem] tracking-[0.18em] text-cream-2/40 uppercase">
                      {k}
                    </dt>
                    <dd className="truncate text-[0.66rem] text-cream-2/90">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-4 border-t border-cream-2/15 pt-3">
                <p className="accent text-base text-cream-2/85">{fullName}</p>
                <p className="mt-0.5 text-[0.42rem] tracking-[0.18em] text-cream-2/35 uppercase">
                  Signature
                </p>
              </div>

              <div className="mt-3 flex items-end justify-between">
                <Barcode tone="cream" />
                <p className="mb-0.5 text-right text-[0.42rem] leading-tight tracking-[0.14em] text-cream-2/35 uppercase">
                  Issued
                  <br />
                  {about.badge.issued}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <p className="mt-5 text-[0.58rem] tracking-[0.2em] text-muted uppercase">
        Hover to turn it over · drag to swing
      </p>
    </div>
  );
}
