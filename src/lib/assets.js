// import.meta.env.BASE_URL is "/" in dev and "/<repo-name>/" in the production build.
export const BASE = import.meta.env.BASE_URL;
export const img = (name) => `${BASE}images/${name}.webp`;
