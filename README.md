# Pratham Rathore — Portfolio

A responsive React + Vite portfolio with Framer Motion, two distinct visual themes, original 3D artwork, glass surfaces, interactive skill cards, and accessible native dialogs.

## Run

Requires Node.js 22.12+ (Node 24 was used for verification).

```sh
npm ci
npm run dev
```

Vite listens on port 5173. `npm run build` creates the production site in `dist`; `npm run preview` serves that build locally. Deploy `dist` to any static host. No backend, API keys, or remote fonts are required.

## Resume content and media

`src/content.js` contains the portfolio facts transcribed from the supplied **PRATHAM RATHORE RESUME V3.4.pdf**. The source PDF is kept outside the repository; the site publishes the requested portfolio facts, not the original document.

The portfolio contains the resume summary and contact details, both projects (AI Agentic Workflow and Krishi Seva), both internships (CognioLabs and Dehix.org), the categorized tools and languages, all seven professional skills, all three education records, and all three certifications and achievements. Beginner levels, dates, scores, and reported figures are retained. The supporting document URLs come from the embedded links in the PDF. No project demo or source URL is invented where the resume does not provide one.

The earlier concept projects, fictional dashboard imagery, generic biography, and assumed tech stack have been removed. Project diagrams illustrate the described workflow; they are not screenshots of the projects. Names such as **Zaiper**, **Snitch**, and **AntiGravity** retain the resume's spelling. Minor spelling and grammar corrections do not change its factual claims.

- Update `src/content.js` when the resume changes.
- The supplied terms video is included as `public/media/terms.mp4` and configured in `profile.termsVideo`. Clicking Terms & conditions opens the popup and starts playback. Every opening starts a fresh playback; closing pauses it immediately. The player tries sound first, falls back to muted autoplay when browser policy requires it, and offers an Enable sound button. If all autoplay is blocked, a Play video button and native controls remain available.
- Add accessible WebVTT captions and set `profile.termsCaptions` to their path.
- The footer retains the exact requested copyright wording.

## Typography

Display headings prefer Impact, with locally bundled Anton as a fallback. The unspecified dark primary font uses the same display stack. Body copy prefers locally installed Telegraf and falls back to bundled DM Sans. Script accents prefer locally installed Eyesome Script and fall back to bundled Caveat.

Telegraf and Eyesome Script font files were not supplied. To use the exact typefaces consistently across devices, provide web-licensed WOFF2 files in `public/fonts/` and replace the `local(...)` sources in the two `@font-face` rules at the top of `src/styles.css` with the corresponding `/fonts/...woff2` URLs. Only use font files you have rights to serve. The bundled fallback font licenses ship with their `@fontsource` packages.

## Interaction and accessibility

- The intro runs for approximately 4.9 seconds (4.3 seconds plus its exit transition), plays on initial load and can be replayed from the footer. It has different orbital and petal compositions in dark and light mode. Theme changes are persisted in local storage.
- The portfolio is inert while the intro is visible, preventing keyboard focus from moving behind it.
- Navigation collapses to an accessible menu on mobile; dialogs support Escape and focus containment via native `<dialog>`.
- Animations respect `prefers-reduced-motion`; skill cards work with keyboard focus as well as pointer tilt.
- All hero artwork and project diagrams are original local assets. No third-party image requests are made.

## Browser checks

```sh
npm test
```

Playwright uses `/usr/bin/chromium` in this environment. On another machine, set `CHROMIUM_PATH` to a Chromium executable. Tests start Vite automatically and cover intro timing, theme persistence, resume project dialogs, terms video playback, reopening, autoplay fallbacks, mobile navigation, layout overflow, reduced motion, profile links, resume data coverage, and resume-only content.

The current cloud task already has an isolated checkout at `/workspace/ProjectZyder13.09.14.12`; use it directly. No Git worktree is needed.
