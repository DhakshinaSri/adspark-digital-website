import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/*
  A tiny, dependency-free router that works on GitHub Pages sub-folders.

  - `basename` is the folder the site is hosted in, e.g. "/adspark-digital-website".
  - Pages are real folders in the build output (about/index.html, ...), so a direct
    visit or a refresh on /adspark-digital-website/about/ never gives a 404.
*/

const RouterContext = createContext({
  basename: "",
  path: "/",
  hash: "",
  navigate: () => {},
});

export function normalize(path) {
  const clean = (path || "/").replace(/\/+$/, "");
  return clean === "" ? "/" : clean;
}

function stripBase(pathname, basename) {
  let p = pathname;
  if (basename && (p === basename || p.startsWith(basename + "/"))) {
    p = p.slice(basename.length);
  }
  return normalize(p || "/");
}

export function Router({ basename = "", url, children }) {
  // `url` is only passed while pre-rendering on the server.
  const [loc, setLoc] = useState(() => {
    if (url) {
      const [pathname, hash = ""] = url.split("#");
      return { path: normalize(pathname), hash: hash ? "#" + hash : "" };
    }
    return {
      path: stripBase(window.location.pathname, basename),
      hash: window.location.hash,
    };
  });

  useEffect(() => {
    const onPop = () =>
      setLoc({
        path: stripBase(window.location.pathname, basename),
        hash: window.location.hash,
      });
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [basename]);

  const navigate = useCallback(
    (to, { replace = false } = {}) => {
      const [pathname, hash = ""] = to.split("#");
      const path = normalize(pathname || loc.path);
      const full = basename + (path === "/" ? "/" : path + "/") + (hash ? "#" + hash : "");
      if (replace) window.history.replaceState({}, "", full);
      else window.history.pushState({}, "", full);
      setLoc({ path, hash: hash ? "#" + hash : "" });
    },
    [basename, loc.path]
  );

  const value = useMemo(
    () => ({ basename, path: loc.path, hash: loc.hash, navigate }),
    [basename, loc.path, loc.hash, navigate]
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export const useRouter = () => useContext(RouterContext);

export function hrefFor(basename, to) {
  const [pathname, hash = ""] = to.split("#");
  const path = normalize(pathname);
  return basename + (path === "/" ? "/" : path + "/") + (hash ? "#" + hash : "");
}

export function Link({ to, children, onClick, ...rest }) {
  const { basename, navigate } = useRouter();
  const href = hrefFor(basename, to);
  const handle = (e) => {
    if (onClick) onClick(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      rest.target === "_blank"
    )
      return;
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={href} onClick={handle} {...rest}>
      {children}
    </a>
  );
}

// A link that knows when it points at the page currently open.
export function NavLink({ to, className = "", children, ...rest }) {
  const { path } = useRouter();
  const active = normalize(to.split("#")[0]) === path;
  return (
    <Link
      to={to}
      className={className + (active ? " is-active" : "")}
      aria-current={active ? "page" : undefined}
      {...rest}
    >
      {children}
    </Link>
  );
}
