import { BASE } from "../lib/assets.js";

export default function Logo({ height = 32 }) {
  // The logo SVG is 411 x 58
  const width = Math.round((411 / 58) * height);
  return (
    <img
      src={`${BASE}logo.svg`}
      alt="AdSpark Digital"
      width={width}
      height={height}
      className="logo"
    />
  );
}
