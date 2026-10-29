import { useEffect, useRef, useState } from "react";
import { useRouter } from "./router.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Services from "./pages/Services.jsx";
import Industries from "./pages/Industries.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import { getPageMeta, PAGES, normalizePath } from "./data/seo.js";

const ROUTES = {
  "/": Home,
  "/about": About,
  "/services": Services,
  "/industries": Industries,
  "/contact": Contact,
};

function setMeta(name, content) {
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function App() {
  const { path, hash } = useRouter();
  const Page = ROUTES[path] || NotFound;
  const mainRef = useRef(null);
  const isFirst = useRef(true);
  const [announcement, setAnnouncement] = useState("");

  // Keep the browser tab title and description in step with the page being shown.
  useEffect(() => {
    const meta = getPageMeta(path);
    document.title = meta.title;
    setMeta("description", meta.description);
    setMeta("robots", PAGES[normalizePath(path)] ? "index, follow" : "noindex");
  }, [path]);

  // After moving to another page: go to the top (or to the #section), move keyboard focus
  // to the main content and tell screen readers where they are.
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        if (!isFirst.current) el.focus({ preventScroll: true });
        isFirst.current = false;
        return;
      }
    }
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    window.scrollTo(0, 0);
    if (mainRef.current) mainRef.current.focus({ preventScroll: true });
    setAnnouncement(getPageMeta(path).title);
  }, [path, hash]);

  const skip = (e) => {
    e.preventDefault();
    if (mainRef.current) {
      mainRef.current.scrollIntoView();
      mainRef.current.focus();
    }
  };

  return (
    <>
      <a className="skip-link" href="#main-content" onClick={skip}>
        Skip to main content
      </a>
      <Header />
      <main id="main-content" ref={mainRef} tabIndex={-1}>
        <Page />
      </main>
      <Footer />
      <div className="visually-hidden" role="status" aria-live="polite">
        {announcement}
      </div>
    </>
  );
}
