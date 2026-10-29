# AdSpark Digital – Website

Corporate website for AdSpark Digital, built with **React 19 + Vite**. All text comes from
`AdSpark_Digital.docx` and lives in one file: `src/data/content.js`.

Pages: Home · About Us · Services · Industries We Serve · Contact Us
(Why Choose Us and Our Working Process are on About Us; the FAQ is on Contact Us.)

## 1. Run it in VS Code

Requires [Node.js](https://nodejs.org) 18 or newer (20 or 22 recommended).

```bash
npm install
npm run dev        # opens http://localhost:5173
```

## 2. Build and check the production version

```bash
npm run build      # creates the "dist" folder
npm run preview    # opens it exactly as it will appear online
```

`npm run build` prints the address it was built for, for example
`Site base path: /adspark-digital-website/`.

## 3. Publish on GitHub Pages (no more 404 errors)

A "project" site is served from `https://<user>.github.io/<repo-name>/`, so every file and
every page must know the `/<repo-name>/` part. That is handled for you:

* **The folder name is detected automatically** from your repository (git `origin` remote, or
  `GITHUB_REPOSITORY` on GitHub Actions). To force a value use
  `npx cross-env BASE_PATH=/my-repo/ npm run build`. For a `<user>.github.io` repository or a custom domain
  use `npm run build:root`.
* **Every page is a real file**: `…/<repo>/about/`, `…/<repo>/services/` etc. open directly or
  after a refresh. Unknown addresses are caught by `404.html` and show the site's own
  "Page not found" page.
* Different demo sites can live in different repositories under the same
  `https://<user>.github.io/` without affecting each other.

Choose **one** of these ways to publish:

**A. GitHub Actions (recommended)** – push the project to GitHub, then open
*Settings → Pages → Build and deployment → Source* and pick **GitHub Actions**. The workflow
in `.github/workflows/deploy.yml` builds and publishes on every push to `main`.

**B. From your computer** – `npm run deploy` builds the site and pushes `dist` to a
`gh-pages` branch. Then choose *Settings → Pages → Source: Deploy from a branch → gh-pages / (root)*.

Live address: `https://<user>.github.io/<repo-name>/`

## 4. Contact form

The form (Full name, Email id, Contact number, Message) validates on the page, but a static
site has no server, so it needs a form service to deliver messages to your inbox:

1. Create a free form at <https://formspree.io> (or any service that accepts a JSON POST).
2. Copy `.env.example` to `.env.production` and paste the form address into
   `VITE_FORM_ENDPOINT`.
3. Run `npm run build` again.

Until this is done the form works as a demo only and does **not** send the message anywhere.

## 5. Project structure

```
index.html              page shell (SEO tags are filled in at build time)
public/                 logo.svg, favicon.svg, images/ (all pictures from the Word document)
scripts/config.mjs      works out the site folder (/<repo-name>/) and public address
scripts/prerender.mjs   writes one HTML file per page + 404.html, sitemap.xml, robots.txt
src/main.jsx            browser entry
src/entry-server.jsx    build-time entry (pre-rendering)
src/App.jsx             layout, page titles, focus handling
src/router.jsx          small router that understands the site folder
src/data/content.js     ALL website text (from the Word document)
src/data/seo.js         page titles, descriptions, structured data
src/pages/              Home, About, Services, Industries, Contact, NotFound
src/components/         Header, Footer, ContactForm, Faq, Button, …
src/styles/global.css   design system (colours, type, layout)
```

## Design, accessibility and SEO notes

* **Colours** (three): Brand Blue `#0E7ADC` (from the logo; `#0B66BD` for text and buttons),
  Deep Navy `#0B2545` (text only) and Warm Amber `#F7B32B` (accent). Section backgrounds are
  white or very light tints – no dark backgrounds.
* **Type**: Inter (body, 500 weight, 18 px) and Plus Jakarta Sans (headings, 700–800),
  self-hosted through npm – nothing is loaded from Google. No text is smaller than 16 px.
* **Accessibility (WCAG 2.2 AA)**: text contrast 6:1 or better, skip link, landmarks, one `h1`
  per page, visible focus rings, 44 px touch targets, keyboard-operable menu and FAQ,
  labelled form fields with clear error messages, reduced-motion support.
* **SEO**: each page has real HTML content, its own title and description, canonical link,
  Open Graph / Twitter tags, JSON-LD (Organization, WebSite, FAQPage), `sitemap.xml`, `robots.txt`.
* The public address used for canonical links and the sitemap is taken from your GitHub user
  name; set `SITE_URL=https://www.example.com` when building for a custom domain.
