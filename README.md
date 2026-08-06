# 12px

A 12-week pixel art curriculum you can actually check off.

Learning pixel art from scratch mostly fails on structure, not talent — you watch three tutorials, draw a sword, and then have no idea what next week is supposed to be. This is the syllabus I built for myself: twelve weeks, five phases, thirty-six drills, and **120 hand-picked links** attached to the specific drill they help with. The app is just the way you walk through it.

The curriculum lives in one markdown file. If you want to track something else entirely — guitar, 3D, Blender, handwriting — fork it, rewrite [`curriculum.md`](./curriculum.md), and the app reshapes itself. Nothing about "12 weeks" or "3 drills" is baked into the code.

## What it does

- Check off drills; progress bar and per-week counters update
- Per-week notes ("what worked, what didn't")
- A running general journal
- Everything saves to `localStorage` — no account, no server, no telemetry
- Export/import your progress as JSON, so clearing site data isn't fatal

## Stack

- **Vite 6** · **React 18** · plain JSX, no TypeScript
- **Tailwind CSS v4** via `@tailwindcss/vite` (no `tailwind.config.js` — tokens live in `@theme` in `src/index.css`)
- **lucide-react** for icons
- **Hosting:** GitHub Pages (static build, no backend)
- **Package manager:** npm

## Structure

```
12px/
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

Open `curriculum.md`. The format is five line types:

```md
# Title of your run
> Optional subtitle

## Phases

- Fundamentals `#e8b04b`
- Color & Shading `#4bc9c9`

## Week title here {phase: 1}

### A drill to check off

- [Resource name](https://example.com)
- [Another resource](https://example.com)
```

That's the whole dialect. Rules worth knowing:

- **Weeks are numbered by document order**, so insert, delete, or reorder freely — you don't renumber anything.
- **A week can have any number of drills.** Three is just what my curriculum uses; one or seven work identically.
- **`{phase: N}` indexes into the `## Phases` list** and drives that week's accent colour.
- **Progress is keyed to week and drill titles, not position.** Fix a dead link, reorder weeks, add a phase — your checkmarks stay attached to the right drill. Renaming a drill resets that one checkbox; that's the tradeoff for not having a hidden ID file.

To reskin the app, change the five colour tokens in `src/index.css`. Phase colours stay in `curriculum.md`, since they belong to the content.

## Deploy to GitHub Pages

1. Push to `main`.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. The included workflow (`.github/workflows/deploy.yml`) builds and publishes on every push to `main`.

`vite.config.js` sets `base: './'`, so it works at both `username.github.io/12px/` and a custom domain with no changes.

## A note on your data

Progress lives in your browser's `localStorage` under `pixelart-tracker-v2`. It never leaves your machine. That also means clearing site data wipes it — use **Export** before you do, and **Import** to restore. Exported files are gitignored.

## Credits

The 120 linked resources are other people's work — Saint11, Slynyrd, Derek Yu, MortMort, Lospec, Pixnote, OpenGameArt, Aseprite's own docs, and many more. This repo links to them, hosts none of them, and is not affiliated with any of them. Go support the people who wrote them.

## License

MIT — see [LICENSE](./LICENSE).
