import { BRAND, FAQ } from "./content.js";

// Page titles + descriptions (used at build time for static HTML and at run time
// when the visitor moves between pages). Wording is taken from the Word document.
export const PAGES = {
  "/": {
    title: "AdSpark Digital | Digital Advertising, Social Media, SEO & Branding",
    description: BRAND.intro,
    changefreq: "monthly",
    priority: "1.0",
  },
  "/about": {
    title: "About Us | AdSpark Digital",
    description:
      "AdSpark Digital was envisioned with a simple idea: businesses deserve digital marketing that reflects who they are and what they want to achieve.",
    changefreq: "yearly",
    priority: "0.8",
  },
  "/services": {
    title: "Our Services | AdSpark Digital",
    description:
      "Social media marketing, paid digital advertising, search engine optimisation, YouTube channel management, branding, content creation and digital strategy.",
    changefreq: "monthly",
    priority: "0.9",
  },
  "/industries": {
    title: "Industries We Serve | AdSpark Digital",
    description:
      "Our digital marketing services can be tailored to a variety of industries, from startups and healthcare to retail, real estate, technology and personal brands.",
    changefreq: "yearly",
    priority: "0.7",
  },
  "/contact": {
    title: "Contact Us | AdSpark Digital",
    description:
      "Let's talk about your brand. Tell us what you have in mind and we will work with you to identify suitable services and plan the next steps.",
    changefreq: "yearly",
    priority: "0.8",
  },
};

export const NOT_FOUND = {
  title: "Page not found | AdSpark Digital",
  description: BRAND.intro,
};

export function normalizePath(path) {
  if (!path) return "/";
  const clean = path.replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
}

export function getPageMeta(path) {
  return PAGES[normalizePath(path)] || NOT_FOUND;
}

// Structured data (schema.org) so search engines understand the business and FAQs.
export function buildJsonLd(path, siteUrl, base) {
  const origin = siteUrl + base.replace(/\/$/, "");
  const graph = [
    {
      "@type": "Organization",
      "@id": origin + "/#organization",
      name: BRAND.name,
      url: origin + "/",
      logo: origin + "/logo.svg",
      description: BRAND.intro,
    },
    {
      "@type": "WebSite",
      "@id": origin + "/#website",
      name: BRAND.name,
      url: origin + "/",
      publisher: { "@id": origin + "/#organization" },
      inLanguage: "en",
    },
  ];
  if (normalizePath(path) === "/contact") {
    graph.push({
      "@type": "FAQPage",
      mainEntity: FAQ.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
