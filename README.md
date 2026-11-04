# Pratham Rathore — Portfolio

A responsive React + Vite portfolio with Framer Motion, two distinct visual themes, original 3D artwork, glass surfaces, interactive skill cards, and accessible native dialogs.

## Run

Requires Node.js 22.12+ (Node 24 was used for verification).

```sh
npm ci
npm run dev
```

Vite listens on port 5173. `npm run build` creates the production site in `dist`; `npm run preview` serves that build locally. Deploy `dist` to any static host. No backend, API keys, or remote fonts are required.

## Personal content and media

The resume and terms video were not attached to the request. No qualifications, employers, dates, or client projects have been invented. The three interface studies are explicitly marked as portfolio concepts.

- Edit `src/content.js` with verified biography and resume details.
- Put the resume PDF in `public/media/`, then set `profile.resume` to `/media/resume.pdf` to enable the download link.
- Put the supplied video in `public/media/`, then set `profile.termsVideo` to its path, e.g. `/media/terms.mp4`. The footer dialog renders an HTML video player when configured. Until then it shows a clear unavailable message without a broken request.
- Add accessible WebVTT captions in the same directory and set `profile.termsCaptions` to `/media/terms.vtt`.
- Replace concept cards in `src/components/Projects.jsx` with verified resume projects as appropriate.
- Profile links are the provided LinkedIn and GitHub URLs. The copyright line uses the exact requested wording.

## Typography

Display headings prefer Impact, with locally bundled Anton as a fallback. The unspecified dark primary font uses the same display stack. Body copy prefers locally installed Telegraf and falls back to bundled DM Sans. Script accents prefer locally installed Eyesome Script and fall back to bundled Caveat.

Telegraf and Eyesome Script font files were not supplied. To use the exact typefaces consistently across devices, provide web-licensed WOFF2 files in `public/fonts/` and replace the `local(...)` sources in the two `@font-face` rules at the top of `src/styles.css` with the corresponding `/fonts/...woff2` URLs. Only use font files you have rights to serve. The bundled fallback font licenses ship with their `@fontsource` packages.

## Interaction and accessibility

- The intro runs for approximately 4.9 seconds (4.3 seconds plus its exit transition), plays on initial load and can be replayed from the footer. It has different orbital and petal compositions in dark and light mode. Theme changes are persisted in local storage.
- The portfolio is inert while the intro is visible, preventing keyboard focus from moving behind it.
- Navigation collapses to an accessible menu on mobile; dialogs support Escape and focus containment via native `<dialog>`.
- Animations respect `prefers-reduced-motion`; skill cards work with keyboard focus as well as pointer tilt.
- All hero artwork and miniature project visuals are original local assets. No third-party image requests are made.

## Browser checks

```sh
npm test
```

Playwright uses `/usr/bin/chromium` in this environment. On another machine, set `CHROMIUM_PATH` to a Chromium executable. Tests start Vite automatically and cover intro timing, theme persistence, concept dialogs, terms fallback, mobile navigation, layout overflow, reduced motion, and profile links.

The current cloud task already has an isolated checkout at `/workspace/ProjectZyder13.09.14.12`; use it directly. No Git worktree is needed.
