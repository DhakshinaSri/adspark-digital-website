import { Link } from "../router.jsx";
import Logo from "./Logo.jsx";
import { BRAND, FOOTER } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__about">
          <Link to="/" aria-label="AdSpark Digital – Home" className="site-footer__brand">
            <Logo height={30} />
          </Link>
          <p className="site-footer__tagline">{BRAND.footerTagline}</p>
          <p>{BRAND.footerText}</p>
        </div>

        <nav aria-labelledby="footer-quick">
          <h2 id="footer-quick" className="footer-title">
            {FOOTER.quickLinksTitle}
          </h2>
          <ul className="footer-list">
            {FOOTER.quickLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-services">
          <h2 id="footer-services" className="footer-title">
            {FOOTER.servicesTitle}
          </h2>
          <ul className="footer-list">
            {FOOTER.services.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="site-footer__bar">
        <div className="container">
          <p>{BRAND.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
