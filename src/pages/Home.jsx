import Button from "../components/Button.jsx";
import CtaBand from "../components/CtaBand.jsx";
import Icon from "../components/Icon.jsx";
import { Section, SectionHeading } from "../components/Section.jsx";
import { Link } from "../router.jsx";
import { img } from "../lib/assets.js";
import { BRAND, HOME } from "../data/content.js";

const TAGS = BRAND.tagline.split("•").map((t) => t.trim());

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="hero" aria-labelledby="home-title">
        <div className="container hero__inner">
          <div className="hero__copy">
            <ul className="chips" aria-label={BRAND.name}>
              {TAGS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <h1 id="home-title" className="hero__title">
              {BRAND.headline}
            </h1>
            <p className="lead">{BRAND.intro}</p>
            <div className="hero__actions">
              <Button to="/contact">Contact Us</Button>
              <Button to="/services" variant="secondary" arrow={false}>
                Our Services
              </Button>
            </div>
          </div>

          <figure className="hero__media">
            <img
              src={img("hero")}
              alt="A marketing team reviewing performance dashboards together in a modern office"
              width="1200"
              height="775"
              fetchpriority="high"
            />
          </figure>
        </div>
      </section>

      {/* ---------------------------------------------------------- intro */}
      <Section tone="white" labelledBy="intro-title">
        <div className="split">
          <div>
            <SectionHeading id="intro-title" title={HOME.title} />
            {HOME.paragraphs.map((p) => (
              <p key={p} className="prose">
                {p}
              </p>
            ))}
          </div>

          <aside className="panel" aria-labelledby="bring-title">
            <h3 id="bring-title" className="panel__title">
              {HOME.bringTitle}
            </h3>
            <ul className="checklist">
              {HOME.bring.map((b) => (
                <li key={b}>
                  <Icon name="check" size={24} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      {/* ------------------------------------------------- core services */}
      <Section tone="soft" labelledBy="core-title">
        <SectionHeading id="core-title" title={HOME.coreTitle} align="center" />
        <ul className="core-grid">
          {HOME.core.map((s) => (
            <li key={s.title} className="card card--media">
              <div className="card__image">
                <img src={img(s.image)} alt="" width="1000" height="667" loading="lazy" />
              </div>
              <div className="card__body">
                <span className="icon-badge">
                  <Icon name={s.icon} size={26} />
                </span>
                <h3 className="card__title">{s.title}</h3>
                <p>{s.text}</p>
                <Link to={`/services#${s.anchor}`} className="text-link">
                  <span>
                    Learn more<span className="visually-hidden"> about {s.title}</span>
                  </span>
                  <Icon name="arrow" size={20} />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------- goals */}
      <Section tone="white" labelledBy="goals-title">
        <div className="goals">
          <div>
            <SectionHeading id="goals-title" title={HOME.goalsTitle} />
            {HOME.goals.map((p) => (
              <p key={p} className="prose">
                {p}
              </p>
            ))}
          </div>
          <p className="statement">{HOME.closing}</p>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
