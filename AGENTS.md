# 12px — working notes

Context for anyone (human or agent) picking this up cold. The README explains
what the project *is*; this file explains **why it is shaped the way it is**,
so you don't undo a deliberate decision thinking it's an oversight.

## Origin

This started as a single 728-line `.jsx` file generated as a Claude artifact
(the original is still at `~/Downloads/pixel-art-tracker.jsx`, untouched — it
is the reference for the curriculum content, nothing else). It was a personal
tracker for Aditya's pixel art learning; it was converted into a standalone,
public, forkable app on 2026-08-06.

Two things in the original were load-bearing problems, both now fixed:

1. It called `window.storage.get/set` — a **Claude-artifact-runtime API that
   does not exist in a browser**. The app would have hung on its loading
   spinner forever if run locally. Now `localStorage`, via `src/storage.js`.
2. "3 drills per week" and "12 weeks" were hardcoded in five places
   (`done: [false,false,false]`, `WEEKS.length * 3`, `{done}/3`,
   `[0,1,2].map`, `Week {n} of 12`). All now derived from the curriculum.

## The one rule

**`curriculum.md` is the content. `src/` is a generic renderer.**

No week count, drill count, phase count, or phase colour may be hardcoded in
`src/`. If you add a feature, derive its shape from the parsed curriculum. The
whole point is that someone forks this, rewrites `curriculum.md` for guitar or
Blender or handwriting, and it just works.

There is a fast way to check you haven't broken this — see *Verifying* below.

## Architecture

```
curriculum.md          content: 12 weeks / 36 drills / 120 links / 5 phases
  └─ src/curriculum.js parses it at build time (Vite `?raw` import)
       └─ src/App.jsx  one component, renders whatever it got
src/storage.js         localStorage + JSON export/import, independent of content
```

`src/curriculum.js` is a hand-rolled ~60-line line-based parser, deliberately
not a markdown library — the dialect is five line types (`#`, `>`, `##`,
`###`, `- [text](url)`), so a dependency would be more parser than parser. It
is intentionally **forgiving**: unknown lines are skipped, never thrown on,
because the person editing `curriculum.md` is an artist, not a compiler.

## Decisions you should not silently reverse

- **Progress is keyed to slugs derived from week/drill titles**, not array
  indices. This is why editing the curriculum — reordering weeks, fixing a
  dead link, inserting a phase — doesn't shuffle someone's checkmarks. The
  known tradeoff: **renaming a drill resets that one checkbox.** That was
  accepted deliberately over the alternative (a hidden id file that forkers
  would have to maintain by hand). Don't "fix" it without weighing that.
- **Markdown, not a typed `data/*.ts` module.** Every other LazyCodeLab
  project uses typed TS data modules. This one uses markdown *on purpose*,
  because non-programmers should be able to update a dead tutorial link. Do
  not "align it with house style."
- **MIT LICENSE exists.** Every other project here is `"private": true` with
  no license. This one is public, so it needs one. Not an accident.
- **GitHub Pages, not Vercel.** House default is Vercel, but a forker gets
  Pages hosting with zero signup. `vite.config.js` sets `base: './'` so the
  build works at both a Pages subpath and a custom domain.
- **`localStorage` only — no backend, no accounts, no telemetry.** Export/
  import JSON is the answer to "I cleared my site data", not a server.

## Gotchas

- The journal panel's accent colour is `curriculum.phases.at(-1).color` — the
  **last** phase. Append a phase in a clashing colour and the journal button
  changes with it. Intentional (palette stays sourced from content), but
  surprising.
- `App.jsx` renders a "No weeks found" panel if `curriculum.md` parses to zero
  weeks. Keep that path working; it is the main failure mode of a bad edit.
- Phase colours live in `curriculum.md` (they belong to content). The five
  *chrome* colours live in `@theme` in `src/index.css`. Don't merge them.
- `12px-progress-*.json` is gitignored. Exported progress is personal data and
  must never be committed.

## Conventions

- **Vite 6 · React 18 · plain JSX, no TypeScript.** Matches `lift-log`, the
  closest sibling project. Don't add TS.
- **Tailwind v4** via `@tailwindcss/vite`. There is no `tailwind.config.js`
  and there should not be — tokens go in the `@theme` block in `src/index.css`.
- **Tabs, width 4** (`.editorconfig`). This is the strongest formatting
  convention across the developer's repos.
- **npm.** (Bun is the house default inside LazyCodeLab, but npm is friendlier
  for a public repo, and the CI workflow uses `npm ci`.)
- No linter is configured, matching `lift-log`. Don't add one unprompted.

## Verifying a change

Build and console must both be clean:

```bash
npm run build
npm run dev     # then check the browser console for React warnings
```

To check the parser without a browser — strip the Vite-only import and run it
in plain node:

```bash
grep -v "curriculum.md?raw" src/curriculum.js \
  | grep -v "^const curriculum = parseCurriculum" \
  | grep -v "^export default curriculum" > /tmp/parser.mjs
node -e "import('/tmp/parser.mjs').then(async m => {
  const fs = await import('node:fs');
  const c = m.parseCurriculum(fs.readFileSync('curriculum.md','utf8'));
  console.log(c.weeks.length, 'weeks |', c.phases.length, 'phases |',
              m.totalTaskCount(c), 'tasks');
});"
```

Baseline for the shipped curriculum: **12 weeks | 5 phases | 36 tasks**, 120
resource links (80 unique). If you edit `curriculum.md`, these change — that's
fine; just make sure the count is what you intended.

**The real regression test for the "one rule" above:** temporarily add a week
with a different number of drills and an extra phase, confirm the UI follows
(counters, dots, "Week N of M") *and that existing checkmarks stay attached*,
then revert. This was done on 2026-08-06 and passed.

## Current state / open items

- Committed on `main`, **one commit, never pushed.** No GitHub remote exists
  yet. Publishing is the owner's call: `gh repo create 12px --public
  --source=. --push`, then Settings → Pages → Source: GitHub Actions.
- **The name `12px`** (twelve weeks + the CSS unit) was chosen by Claude on
  the owner's delegation. If it changes, it appears in `package.json`, the
  `<title>` in `index.html`, the README heading, this file, and the export
  filename in `src/storage.js`.
- **LICENSE says "Aditya Bhaskar Sharma"**, inferred from git config. Confirm
  before publishing if a handle is preferred.
- Nothing has been deployed anywhere yet.

## Ideas discussed but deliberately not built

Not rejected, just out of scope for v1 — don't treat their absence as a bug:
a per-week image/sprite upload to show work alongside notes, streaks or dates,
and a "share my progress" view. All would need care to stay backend-free.
