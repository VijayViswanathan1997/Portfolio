"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { fullName, profile } from "@/lib/content";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The ghosted word and the figure drift apart as you scroll.
  const wordY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const figureY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = profile.heroRole.split(" ");

  /**
   * The clip is graded so its studio background is pure white, and `multiply`
   * leaves white untouched — so the backdrop drops out and only the figure
   * remains. The transform that drives the parallax has to live on the video
   * itself: a transformed *wrapper* would open its own stacking context and
   * the blend would have nothing to mix with, which is what left a grey box
   * around the figure before.
   */
  const blend = profile.heroBlend ? "mix-blend-multiply" : "";

  /**
   * Default state is the silent ambient loop. React doesn't reliably reflect
   * `muted` onto the element, and autoplay is blocked unless the element is
   * genuinely muted, so both flags are set on the node directly.
   *
   * With sound on we switch `loop` off — `ended` never fires on a looping
   * element — so the voiceover can play exactly once and then hand back to the
   * silent loop.
   */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.loop = true;

    const backToAmbient = () => {
      v.muted = true;
      v.loop = true;
      v.currentTime = 0;
      void v.play();
      setSoundOn(false);
      setProgress(0);
    };

    const onTime = () => {
      if (v.duration > 0) setProgress(v.currentTime / v.duration);
    };

    v.addEventListener("ended", backToAmbient);
    v.addEventListener("timeupdate", onTime);
    return () => {
      v.removeEventListener("ended", backToAmbient);
      v.removeEventListener("timeupdate", onTime);
    };
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  /** Unmuting must happen inside a user gesture, so this lives in the handler. */
  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;

    if (soundOn) {
      // Stop early — drop straight back to the silent loop, no restart.
      v.muted = true;
      v.loop = true;
      setSoundOn(false);
      setProgress(0);
      return;
    }

    // Play the intro once, from the top, with sound.
    v.loop = false;
    v.muted = false;
    v.currentTime = 0;
    void v.play();
    setSoundOn(true);
    setPlaying(true);
  };

  return (
    <section
      id="top"
      ref={ref}
      // `isolate` scopes the blending to this section so it mixes with the
      // hero backdrop and nothing further up the page.
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pb-10 isolate md:pb-16"
    >
      {/* Warm light pooling behind the figure */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,var(--color-cream-2)_0%,var(--color-cream)_55%,var(--color-cream-3)_100%)]"
      />

      {/* Giant ghosted name */}
      <motion.div
        aria-hidden
        style={{ y: wordY, opacity: fade }}
        className="pointer-events-none absolute inset-x-0 top-[16%] flex justify-center md:top-[14%]"
      >
        <span className="display block scale-y-110 text-[26vw] leading-none text-ink/[0.06] select-none md:text-[22vw]">
          {profile.heroWord}
        </span>
      </motion.div>

      {/* The figure — centred, background blended away */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[72svh] items-end justify-center md:h-[84svh]">
        {profile.heroVideo ? (
          <motion.video
            ref={videoRef}
            style={{ y: figureY }}
            src={profile.heroVideo}
            poster={profile.heroImage}
            autoPlay
            muted
            loop
            playsInline
            className={`h-full w-auto max-w-none object-contain object-bottom ${blend}`}
          />
        ) : (
          <motion.img
            style={{ y: figureY }}
            src={profile.heroImage}
            alt={fullName}
            className={`h-full w-auto max-w-none object-contain object-bottom ${blend}`}
          />
        )}
      </div>

      {/* Playback controls */}
      {profile.heroVideo && (
        <div className="absolute top-24 right-5 z-20 flex flex-col items-center gap-2.5 md:top-28 md:right-8">
          <button
            onClick={toggleSound}
            aria-label={soundOn ? "Stop intro audio" : "Play intro with sound"}
            aria-pressed={soundOn}
            className="group relative grid h-10 w-10 place-items-center rounded-full bg-ink text-cream-2 transition-transform hover:scale-105"
          >
            {/* Ring fills as the one-shot voiceover plays out */}
            {soundOn && (
              <svg
                aria-hidden
                viewBox="0 0 44 44"
                className="pointer-events-none absolute -inset-[2px] h-[calc(100%+4px)] w-[calc(100%+4px)] -rotate-90"
              >
                <circle
                  cx="22"
                  cy="22"
                  r="20.5"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.25"
                  strokeWidth="2"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="20.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 20.5}
                  strokeDashoffset={2 * Math.PI * 20.5 * (1 - progress)}
                />
              </svg>
            )}
            <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
              <path
                d="M1 5v4h2.6L7 11.8V2.2L3.6 5H1Z"
                fill="currentColor"
              />
              {soundOn ? (
                <g
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  fill="none"
                >
                  <path d="M9.8 4.6a3.4 3.4 0 0 1 0 4.8" />
                  <path d="M11.9 2.5a6.4 6.4 0 0 1 0 9" />
                </g>
              ) : (
                <g
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                >
                  <path d="M10.2 4.8 14 9.2M14 4.8l-3.8 4.4" />
                </g>
              )}
            </svg>
            {/* Nudge: the intro has a voiceover, and it starts silent. */}
            {!soundOn && (
              <span className="pointer-events-none absolute top-1/2 right-12 hidden -translate-y-1/2 rounded-full bg-ink px-3 py-1.5 text-[0.62rem] whitespace-nowrap text-cream-2 opacity-0 transition-opacity group-hover:opacity-100 lg:block">
                Play with sound
              </span>
            )}
          </button>

          <button
            onClick={togglePlay}
            aria-label={playing ? "Pause intro video" : "Play intro video"}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-cream-2/80 text-ink backdrop-blur-sm transition-transform hover:scale-105"
          >
            {playing ? (
              <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                <rect width="3" height="12" rx="1" />
                <rect x="7" width="3" height="12" rx="1" />
              </svg>
            ) : (
              <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                <path d="M0 1.1v9.8a1 1 0 0 0 1.5.86l8-4.9a1 1 0 0 0 0-1.72l-8-4.9A1 1 0 0 0 0 1.1Z" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Headline block */}
      <div className="shell relative z-10 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <p className="mb-4 text-[0.68rem] tracking-[0.34em] text-muted uppercase">
            {fullName}
          </p>
          <h1 className="display text-[clamp(2.4rem,7vw,5.2rem)] text-ink">
            {words.slice(0, -1).join(" ")}
            <br />
            {words.at(-1)}
            <span className="text-ink/35">.</span>
          </h1>
          <p className="mt-5 max-w-md text-[0.95rem] text-ink/75">
            {profile.headline}
          </p>
          <p className="mt-2.5 text-[0.72rem] tracking-[0.16em] text-muted uppercase">
            {profile.tagline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="flex flex-col items-start gap-3 md:items-end"
        >
          <p className="mb-2 hidden max-w-xs text-right text-xs leading-relaxed text-muted lg:block">
            {profile.intro}
          </p>
          <a href="#work" className="pill pill-solid">
            Explore work
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path
                d="M1 5h11M8.5 1 12.5 5l-4 4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <div className="flex gap-3">
            <a href="#contact" className="pill bg-cream-2/60 backdrop-blur-sm">
              Let&rsquo;s talk
            </a>
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pill bg-cream-2/60 backdrop-blur-sm"
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
