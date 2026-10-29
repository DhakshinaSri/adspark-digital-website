// Runs after "vite build". Turns the single-page app into real HTML files:
//
//   dist/index.html            -> Home
//   dist/about/index.html      -> About Us        (…/<repo>/about/ opens directly, no 404)
//   dist/services/index.html   -> Services        … and so on for every page
//   dist/404.html              -> sends any unknown address back to the app (GitHub Pages)
//   dist/sitemap.xml, dist/robots.txt
//
// Every page therefore has its own title, description, canonical link and the full text
// content in the HTML, which is what search engines and link previews read.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { getBase, getSiteUrl } from "./config.mjs";
import { PAGES, NOT_FOUND, buildJsonLd } from "../src/data/seo.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssrEntry = join(root, ".ssr", "entry-server.js");

const base = getBase(); // "/" or "/repo-name/"
const siteUrl = getSiteUrl(); // "https://user.github.io"
const origin = siteUrl + base.replace(/\/$/, ""); // "https://user.github.io/repo-name"

if (!existsSync(join(dist, "index.html")) || !existsSync(ssrEntry)) {
  console.error("Pre-render: build output not found. Run `npm run build`.");
  process.exit(1);
}

const template = readFileSync(join(dist, "index.html"), "utf8");
if (!template.includes("<!--app-html-->")) {
  console.error('Pre-render: the "<!--app-html-->" placeholder is missing from index.html.');
  process.exit(1);
}
const { render } = await import(pathToFileURL(ssrEntry).href);

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const urlFor = (route) => origin + (route === "/" ? "/" : route + "/");

function headTags(route, meta, { index = true } = {}) {
  const image = `${origin}/images/og-image.jpg`;
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${index ? "index, follow" : "noindex"}" />`,
  ];
  if (index) {
    tags.push(
      `<link rel="canonical" href="${urlFor(route)}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="AdSpark Digital" />`,
      `<meta property="og:title" content="${esc(meta.title)}" />`,
      `<meta property="og:description" content="${esc(meta.description)}" />`,
      `<meta property="og:url" content="${urlFor(route)}" />`,
      `<meta property="og:image" content="${image}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${esc(meta.title)}" />`,
      `<meta name="twitter:description" content="${esc(meta.description)}" />`,
      `<meta name="twitter:image" content="${image}" />`,
      `<script type="application/ld+json">${JSON.stringify(buildJsonLd(route, siteUrl, base)).replace(/</g, "\\u003c")}</script>`
    );
  }
  return tags.join("\n    ");
}

function withHead(html, tags) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta\s+name="description"[^>]*>/, "")
    .replace("</head>", `    ${tags}\n  </head>`);
}

function writePage(route, html) {
  const dir = route === "/" ? dist : join(dist, ...route.split("/").filter(Boolean));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
}

// ---- one HTML file per page -------------------------------------------------------
for (const [route, meta] of Object.entries(PAGES)) {
  const app = render(route);
  let html = template.replace("<!--app-html-->", app);
  html = html.replace('<div id="root">', `<div id="root" data-route="${route}">`);
  html = withHead(html, headTags(route, meta));
  writePage(route, html);
  console.log("  pre-rendered", route === "/" ? "/" : route + "/");
}

// ---- 404.html (GitHub Pages serves this for any address that has no file) ---------------
// It forwards "/<repo>/whatever" to "/<repo>/?/whatever"; index.html then restores the address
// and the app shows the right page (or its own "Page not found").
const keep = base.split("/").filter(Boolean).length;
const redirect = `<script>
      var keep = ${keep};
      var l = window.location;
      l.replace(
        l.protocol + "//" + l.host + l.pathname.split("/").slice(0, 1 + keep).join("/") + "/?/" +
          l.pathname.slice(1).split("/").slice(keep).join("/").replace(/&/g, "~and~") +
          (l.search ? "&" + l.search.slice(1).replace(/&/g, "~and~") : "") + l.hash
      );
    </script>`;
let notFound = template
  .replace("<!--app-html-->", `<p style="padding:24px;font-family:sans-serif"><a href="${base}">AdSpark Digital</a></p>`)
  .replace(/<script type="module"[^>]*><\/script>/g, "")
  .replace(/<link rel="modulepreload"[^>]*>/g, "");
// the "restore address" script from index.html must not run on this page
notFound = notFound.replace(/<script>\s*\/\/ GitHub Pages sends[\s\S]*?<\/script>/, redirect);
notFound = withHead(notFound, headTags("/404", NOT_FOUND, { index: false }));
writeFileSync(join(dist, "404.html"), notFound);
console.log("  wrote 404.html");

// ---- sitemap + robots ---------------------------------------------------------------
const today = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  Object.entries(PAGES)
    .map(
      ([route, m]) =>
        `  <url>\n    <loc>${urlFor(route)}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${m.changefreq}</changefreq>\n    <priority>${m.priority}</priority>\n  </url>`
    )
    .join("\n") +
  `\n</urlset>\n`;
writeFileSync(join(dist, "sitemap.xml"), sitemap);
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);

rmSync(join(root, ".ssr"), { recursive: true, force: true });

// Reminder: the enquiry form only delivers messages when it is connected to a form service.
const envFiles = [".env", ".env.local", ".env.production", ".env.production.local"]
  .filter((f) => existsSync(join(root, f)))
  .map((f) => readFileSync(join(root, f), "utf8"))
  .join("\n");
if (!process.env.VITE_FORM_ENDPOINT && !/^\s*VITE_FORM_ENDPOINT\s*=\s*\S+/m.test(envFiles)) {
  console.warn(
    "\n  NOTE: the contact form is not connected to an inbox yet, so enquiries are not delivered.\n" +
      "        Add VITE_FORM_ENDPOINT to .env.production (see README.md, section 'Contact form')."
  );
}
console.log(`\nDone. Site base path: ${base}   Public address: ${origin}/`);
