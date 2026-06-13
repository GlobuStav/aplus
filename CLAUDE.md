# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint over the repo

There is no test runner configured.

`scripts/dev-server.cmd` is a Windows wrapper that prepends the Node install dir to `PATH` before running `npm run dev`, so the preview spawner can find Node even on a stale PATH.

## Architecture

Single-page React 19 app (Vite + Tailwind CSS v4 via `@tailwindcss/vite`) — an RTL Hebrew study tool. There is no router, no backend, and no global state library; the entire UI is driven by `useState` in `src/App.jsx`.

**State machine (`src/App.jsx`):** Four pieces of local state drive everything — `subject`, `tab` (active learning mode), `showQuiz`, and `sidebar` (open/closed). The `TABS` array maps each learning-mode id to its label, icon, and component; the active tab's `Component` is rendered directly.

**Learning modes (`src/components/modes/`):** `TextMode`, `VideoMode`, `AudioPlayer`, `Flashcards`. Each is a self-contained presentational component for one way of consuming the same topic. To add a mode, create the component and add an entry to `TABS` in `App.jsx`.

**Content/data layer (`src/data/`):** All learning content is static mock data, separated from presentation.
- `subjects.js` — the `SUBJECTS` list shown in the sidebar (id, Hebrew label, lucide icon, Tailwind gradient).
- `chemistry.js` — the only fleshed-out subject: exports `TOPIC`, `TEXT_SECTIONS`, `FLASHCARDS`, `QUIZ`, and a precomputed `WAVE` array (static waveform bar heights for the audio player). Mode and quiz components import directly from here. Note: subject switching in the sidebar updates state, but content is currently hardcoded to chemistry data.

**Styling:** Tailwind utility classes inline; the whole tree is `dir="rtl"`. A `fade-up` animation class (defined in `src/index.css`) is reused across components for entry transitions. Icons come from `lucide-react`.

## Conventions

- UI text is Hebrew. Keep new user-facing strings in Hebrew and RTL-aware (use `text-right`, logical gradient directions like `from-... to-...` rendered RTL).
- Content additions belong in `src/data/`, not inline in components.
