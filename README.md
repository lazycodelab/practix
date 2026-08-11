# Practix

An 11-week pixel art curriculum you can actually check off.

Learning pixel art mostly fails on structure, not talent. The usual failure isn't too little information — it's too much: a wall of tutorials, and no idea what to actually draw today.

So this doesn't hand you a reading list. Every drill **names its subject** — draw a beach ball, a baseball, a green apple — at a **specific canvas size**, with **two or three one-line tips** for the thing that drill is actually teaching. Eleven weeks, six phases, thirty-three drills, and eleven links in the entire curriculum. You should be drawing within a minute of opening it.

The curriculum lives in one markdown file. If you want to track something else entirely — guitar, 3D, Blender, handwriting — fork it, rewrite [`curriculum.md`](./curriculum.md), and the app reshapes itself. Nothing about "11 weeks" or "3 drills" is baked into the code.

## What it does

- Check off drills; progress bar and per-week counters update
- Tips and canvas sizes render inline, so you don't leave the tracker to read
- Every drill is tagged with the concepts it teaches, and you can filter by one — "show me every shading drill" pulls them together across all eleven weeks
- Per-week notes ("what worked, what didn't")
- A running general journal
- Everything saves to `localStorage` — no account, no server, no telemetry
- Export/import your progress as JSON, so clearing site data isn't fatal

## What's in it

| Phase | Weeks | What you draw |
| --- | --- | --- |
| Foundation | 1 | Aseprite fluency, then key/coin/heart at 16×16 |
| Form & Light | 2–3 | Beach ball, baseball, apple; crate, tin can, mug |
| Materials | 4–5 | Sword blade, gold coin, ruby; glass bottle, leather, cloth |
| Characters | 6–7 | One 32×48 character, then turned to back, side and ¾ |
| Animation | 8–9 | Bouncing ball, idle bob, coin flip, then a walk cycle |
| Environments | 10–11 | Seamless tiles, then a scene with real depth |

It assumes you can already open Aseprite and draw *something*. It does not teach you what a pixel is.

## Stack

- **Vite 6** · **React 18** · plain JSX, no TypeScript
- **Tailwind CSS v4** via `@tailwindcss/vite` (no `tailwind.config.js` — tokens live in `@theme` in `src/index.css`)
- **lucide-react** for icons
- **Press Start 2P** (wordmark) and **Silkscreen** (UI), bundled via `@fontsource` — no CDN, no external requests
- **Hosting:** GitHub Pages (static build, no backend)
- **Package manager:** npm

## Structure

```
practix/
├── curriculum.md          ← the syllabus. THIS is the file you edit.
├── index.html
├── vite.config.js         base:'./' so Pages subpaths work
└── src/
    ├── main.jsx           React entry
    ├── App.jsx            the whole UI — one component, ~300 lines
    ├── curriculum.js      parses curriculum.md into {phases, weeks, tasks}
    ├── storage.js         localStorage read/write + JSON export/import
    └── index.css          Tailwind import + @theme colour tokens
```

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # → dist/
npm run preview  # serve the production build
```

## Editing the curriculum

Open `curriculum.md`. The whole dialect:

```md
# Title of your run
> Optional subtitle

## Phases

- Fundamentals `#e8b04b`
- Color & Shading `#4bc9c9`

## Week title here {phase: 1}

### A drill to check off `32×32` {form, shading}

> One or two sentences: what to draw.

- A tip. Plain text, one or two lines.
- Another tip.
- [A resource](https://example.com)
```

Rules worth knowing:

- **A drill should name its subject.** "Draw a beach ball" beats "draw a sphere" beats "practice shading". The reader should never have to decide what to draw before they can start — that decision is where sessions die.
- **The `{form, shading}` tags say what the drill is *for*.** Naming the subject is what gets you drawing, but it hides the lesson — "beach ball" doesn't announce itself as a shading exercise. The tags do, and clicking one pulls every drill covering that concept together across all the weeks. They're free text with no fixed vocabulary, so a fork brings its own; just reuse a tag already in the file instead of coining a synonym, since two spellings of one concept show up as two separate filters.
- **A bullet is a tip if it's plain text, a link if it's a markdown link.** Tips render inline in the tracker; `` `code` ``, `**bold**` and `*italics*` all work inside them.
- **Two links is the ceiling, and most drills need none.** The tips are the content; links are the escape hatch.
- **The `` `32×32` `` badge and the `{tags}` are both display-only** and neither is part of the progress key, so you can retune canvas sizes and retag drills without resetting anyone's checkboxes.
- **Weeks are numbered by document order**, so insert, delete, or reorder freely — you don't renumber anything.
- **A week can have any number of drills.** Three is just what this curriculum uses; one or seven work identically.
- **`{phase: N}` indexes into the `## Phases` list** and drives that week's accent colour.
- **Progress is keyed to week and drill titles, not position.** Fix a dead link, reorder weeks, add a phase — your checkmarks stay attached to the right drill. Renaming a drill resets that one checkbox; that's the tradeoff for not having a hidden ID file.

To reskin the app, change the five colour tokens in `src/index.css`. Phase colours stay in `curriculum.md`, since they belong to the content.

## Deploy to GitHub Pages

1. Push to `main`.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes on every push to `main`.

`vite.config.js` sets `base: './'`, so it works at both `username.github.io/practix/` and a custom domain with no changes.

## A note on your data

Progress lives in your browser's `localStorage` under `pixelart-tracker-v2`. It never leaves your machine. That also means clearing site data wipes it — use **Export** before you do, and **Import** to restore. Exported files are gitignored.

## Credits

The eleven linked resources are other people's work — Saint11, Slynyrd, Derek Yu, MortMort, Cyangmou, Pixel Parmesan, Lospec, and Aseprite's own docs. This repo links to them, hosts none of them, and is not affiliated with any of them. Go support the people who wrote them.

An earlier version of this curriculum shipped 117 links across 77 unique URLs. Most were padding, and a fair number came from SEO content farms. They were cut on purpose — if a link is in here now, it's because that specific drill is better with it.

## License

MIT — see [LICENSE](./LICENSE).
