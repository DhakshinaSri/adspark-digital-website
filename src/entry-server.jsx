import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { Router } from "./router.jsx";
import { BASE } from "./lib/assets.js";

// Used by scripts/prerender.mjs to create real HTML for every page at build time.
export function render(path) {
  return renderToString(
    <Router basename={BASE.replace(/\/$/, "")} url={path}>
      <App />
    </Router>
  );
}
