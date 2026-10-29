import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useRouter } from "../router.jsx";
import Logo from "./Logo.jsx";
import Icon from "./Icon.jsx";
import { NAV } from "../data/content.js";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { path } = useRouter();
  const toggleRef = useRef(null);

  // close the menu after navigating
  useEffect(() => setOpen(false), [path]);

  // Escape closes the menu and returns focus to the button
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current && toggleRef.current.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="AdSpark Digital – Home">
          <Logo height={30} />
        </Link>

        <nav className="nav" aria-label="Main navigation">
          <button
            ref={toggleRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="primary-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={26} />
            <span className="visually-hidden">{open ? "Close menu" : "Menu"}</span>
          </button>

          <ul id="primary-menu" className={`nav__list${open ? " is-open" : ""}`}>
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={item.to === "/contact" ? "nav__link nav__link--cta" : "nav__link"}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
