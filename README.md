# JHUSSAINKHARAL — Cinematic Portfolio

Personal portfolio for **Rai Jawad Hussain Kharal** (Jhussainkharal) — Web Designer / AI Creative, Hafizabad, Pakistan.

Built as a single-page cinematic experience: obsidian surfaces, editorial typography, controlled electric-blue atmospheric light, selective glassmorphism and purposeful motion.

---

## Stack

| Layer      | Choice                               |
| ---------- | ------------------------------------ |
| Framework  | React 19                             |
| Build tool | Vite 7                               |
| Styling    | Tailwind CSS v4 (design tokens in `src/index.css`) |
| Motion     | Framer Motion                        |
| Scrolling  | Lenis (disabled under reduced motion)|
| Hosting    | Static — GitHub Pages compatible     |

No backend. No tracking. No paid services required.

---

## Structure

```
├── public/
│   └── og.jpg                 # social preview image
├── src/
│   ├── animations/motion.ts   # shared easing + variants
│   ├── assets/                # portrait + project visuals (replaceable)
│   ├── components/            # Nav, Cursor, Preloader, Section, Magnetic, Reveal, ProjectChapter
│   ├── data/site.ts           # ALL content: name, links, projects, skills, story
│   ├── hooks/                 # reduced motion, pointer type, smooth scroll, scroll-spy
│   ├── sections/              # Hero, Intro, WhatIBuild, Work, AILab, Capabilities, Story, About, Contact, Footer
│   ├── index.css              # design tokens, glass system, grain, focus states
│   └── App.tsx
└── .github/workflows/deploy.yml
```

### Editing content

Everything textual lives in **`src/data/site.ts`** — name, title, email, Instagram, project records, AI workflow, capability levels and the story. Components never hard-code copy.

### Replacing imagery

Drop new files into `src/assets/` using the same filenames (or update the imports at the top of `src/data/site.ts`):

```
src/assets/portrait.jpg
src/assets/stockcounter.jpg
src/assets/pmsa.jpg
src/assets/apex-racing.jpg
src/assets/cooking-store.jpg
```

Images are imported (not hard-linked), so Vite fingerprints and optimises them automatically. Prefer `.webp` for production uploads.

---

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the production build
```

---

## Deploying to GitHub Pages

1. Create a repository (e.g. `jhussainkharal-portfolio`) and push the project to `main`.
2. **If the site will live at `https://<user>.github.io/<repo>/`**, set the base path in `vite.config.ts`:

   ```ts
   export default defineConfig({
     base: "/jhussainkharal-portfolio/",
     // ...plugins
   });
   ```

   For a user site (`https://<user>.github.io`) or a custom domain, leave `base` as `/`.

3. In **Settings → Pages**, set *Source* to **GitHub Actions**.
4. Push. `.github/workflows/deploy.yml` builds the site and publishes `dist/`.

### Custom domain (later)

Add a `public/CNAME` file containing `jhussainkharal.com`, point the DNS `A`/`CNAME` records at GitHub Pages, reset `base` to `/`, and redeploy. Nothing in the architecture blocks this.

---

## Accessibility & motion

- Semantic landmarks and headings, skip link, visible focus rings.
- Full keyboard operation (menus, tabs, accordions are real buttons).
- `prefers-reduced-motion` disables smooth scrolling, the preloader, parallax, the custom cursor and the grain animation.
- Custom cursor and magnetic hover are pointer-device only.

## Performance notes

- Lazy-loaded, async-decoded imagery below the fold.
- Transform/opacity-only animations (GPU friendly), springs instead of scroll listeners.
- No video, no particle systems, no 3D runtime cost on mobile.

## Content policy

Every claim on the site is real. No invented clients, awards, statistics, testimonials or years of experience. Stockcounter is stated as a working but private project.
