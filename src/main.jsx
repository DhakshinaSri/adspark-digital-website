import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "@fontsource-variable/inter";
import "@fontsource-variable/plus-jakarta-sans";
import "./styles/global.css";
import App from "./App.jsx";
import { Router, normalize } from "./router.jsx";
import { BASE } from "./lib/assets.js";

const basename = BASE.replace(/\/$/, "");
const container = document.getElementById("root");

// Where the visitor is, relative to the site folder (e.g. "/about").
let here = window.location.pathname;
if (basename && (here === basename || here.startsWith(basename + "/"))) {
  here = here.slice(basename.length);
}
here = normalize(here || "/");

const app = (
  <StrictMode>
    <Router basename="{basename}">
      <App />
    </Router>
  </StrictMode>
);

// The build step stores the page it pre-rendered in data-route. Only reuse that HTML when
// it is the page being asked for; otherwise (e.g. after a 404.html redirect) draw it fresh.
if (container.hasChildNodes() && container.dataset.route === here) {
  hydrateRoot(container, app);
} else {
  container.textContent = "";
  createRoot(container).render(app);
}
