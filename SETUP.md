# Setup guide

Your content is in. This file covers what's left and how to publish.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
```

---

## Status

| Item | State |
| --- | --- |
| All text, skills, projects, experience, education | ✅ in `lib/content.ts` |
| Hero video + poster | ✅ `public/hero.webm` (359 KB), `public/hero.png` |
| ID badge photo | ✅ `public/badge.jpg` |
| Résumé PDF | ⬜ **drop yours at `public/resume.pdf`** |
| Project screenshots | ⬜ optional — generated artwork is used until you add them |
| Deploy | ⬜ see below |

Nothing else needs installing. Node, git and ffmpeg were already on this
machine; fonts come from Google Fonts and tech logos from the free devicon CDN.

---

## The two things left

### 1. Résumé

Save your PDF as `public/resume.pdf`. The three Résumé buttons (hero, about,
contact) already point there.

### 2. Project screenshots (optional)

Every project currently uses generated artwork chosen by its `cover` field —
`map`, `services`, `health`, `web` or `property`. It looks finished as is.

To use a real screenshot instead, drop a file in `public/work/` and add an
`image` to that project in `lib/content.ts`:

```ts
{
  title: "Pushpa & Pushpa Pilot",
  cover: "map",
  image: "/work/pushpa.png",   // ← add this line
  ...
}
```

Phone screenshots work well — 16:10 or wider crops cleanest.

---

## Publish it

```bash
npm i -g vercel     # once
vercel              # preview URL
vercel --prod       # live
```

Accept the defaults; Vercel detects Next.js by itself. You get a free
`something.vercel.app` address.

Own domain: buy it anywhere, then Vercel dashboard → your project → Settings →
Domains → Add, and follow the DNS instructions.

Keep it in git first so every push redeploys:

```bash
git init
git add .
git commit -m "Portfolio"
```

---

## Regenerating the hero figure

If you ever want a new clip, the recipe that produced the current one:

**1. Generate.** Feed a full-body photo to an image-to-video tool — Kling AI
and Hailuo have free tiers, Runway and Hedra are paid.

```
A full-body shot of the person in the reference image, standing centred
against a plain white studio background, facing the camera.

NATURAL ANIMATION:
- Natural blinking.
- Natural eye movement.
- Subtle facial expressions.
- Small natural head movements.
- Natural hand gestures, as if explaining something.

CONSTRAINTS:
- Gentle body movement only.
- No exaggerated gestures.
- No robotic movement.
- No sudden movements.
- No unnatural stretching or deformation of the face, hands or clothing.
- The character must remain standing in the centre of the frame throughout.

CAMERA: Locked off. No pan, no zoom, no camera movement.
LIGHTING: Soft, even, bright studio light. Plain white background.
```

**2. Convert.** This crops to the figure and mirror-loops it so the restart is
invisible:

```bash
ffmpeg -y -i raw.mp4 -filter_complex \
  "[0:v]crop=470:720:410:0,scale=540:-2,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1:a=0[v]" \
  -map "[v]" -an -c:v libvpx-vp9 -b:v 0 -crf 36 -row-mt 1 public/hero.webm

ffmpeg -y -ss 0.3 -i raw.mp4 -vframes 1 -vf "crop=470:720:410:0,scale=540:-2" public/hero.png
```

Adjust the `crop=W:H:X:Y` numbers to frame your figure.

**3.** `profile.heroBlend: true` in `lib/content.ts` drops the white background
into the cream page — no cutout needed.

---

## How it's put together

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS v4** — theme tokens at the top of `app/globals.css`
- **Motion** — scroll reveals, sliding nav pill, the flipping badge, the accordion
- **Lenis** — momentum scrolling

```
app/page.tsx            section order
app/globals.css         colours, type, .pill / .eyebrow / .display / .accent
components/             one file per section
  IdBadge.tsx           the lanyard badge — drag to swing, hover to flip
  ProjectCover.tsx      generated project artwork
lib/content.ts          ← all your data
public/                 hero video, badge photo, résumé
```

### Re-theming

Four tokens at the top of `app/globals.css` drive everything:

```css
--color-cream:   #f4efe4;   /* page background      */
--color-cream-2: #faf7f0;   /* alternating sections */
--color-ink:     #211f3d;   /* headings, dark panels */
--color-muted:   #77738f;   /* secondary text       */
```
