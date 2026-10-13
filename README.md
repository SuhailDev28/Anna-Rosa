# Anna Rossa Zalewski — Executive Portfolio

A responsive, multi-page executive website in React 19, Vite 6, Framer Motion and Lucide icons.

## Start locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

Deploy the generated `dist/` directory.

## Content & photography

- Edit `src/data.js` for every venture, role, professional summary, contact detail, and link.
- Add Anna's authorised professional portrait as `public/anna-portrait.jpg`. The website automatically falls back to a tasteful monogram if the file is missing. Use a head-and-shoulders photo with comfortable space around the head; the portrait uses `object-position: center 12%`.
- Until a verified email address is entered in `src/data.js`, the contact page offers LinkedIn instead of a nonfunctional contact form.
- The **CV** navigation opens `/cv`, a printable, browser-generated resume; choose **Print / Save PDF**. This avoids linking to a missing PDF.
- The numeric figures for Rebel Angels are taken from the supplied executive CV and should be checked before publication.
- Venture image blocks are intentionally graphic placeholders, not third-party copyrighted logos or invented images. Replace them with owned/licensed photography later if desired.

## Routes

- `/` — Home, hero, metrics, venture highlights, skills
- `/about` — Biography and leadership philosophy
- `/ventures` — Venture portfolio
- `/ventures/:id` — Individual venture overview
- `/leadership` — Entrepreneurial roles, earlier career and education
- `/contact` — LinkedIn and verified contact information
- `/cv` — Print-ready CV

## Deploy on Render (Static Site)

1. Push the project to a GitHub repository.
2. In Render choose **New → Static Site** and connect your repo.
3. Build command: `npm install && npm run build`
4. Publish directory: `dist`
5. Deploy. The provided `public/_redirects` file enables client-side navigation on providers that support it. If your host does not recognise that file, add a rewrite from `/*` to `/index.html`.

## Deploy on Vercel

1. Import the GitHub repository into Vercel.
2. Select Vite framework, use `npm run build` and output directory `dist`.
3. Deploy. `vercel.json` enables SPA fallback routing.

## Accessibility and performance

Semantic sections, keyboard-operable menu, navigation labels, reduced-motion awareness, responsive grids, lazy reveal animation via viewport detection, and no external imagery required. For production, provide a web-optimised portrait, custom favicon, and canonical URL metadata.
