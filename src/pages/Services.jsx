import CtaBand from "../components/CtaBand.jsx";
import Icon from "../components/Icon.jsx";
import PageHero from "../components/PageHero.jsx";
import { Link } from "../router.jsx";
import { img } from "../lib/assets.js";
import { SERVICES } from "../data/content.js";

export default function Services() {
  return (
    <>
      <PageHero eyebrow={SERVICES.label} title={SERVICES.title}>
        <nav className="jump" aria-label={SERVICES.label}>
          <ul>
            {SERVICES.items.map((s) => (
              <li key={s.id}>
                <Link to={`/services#${s.id}`}>
                  <span className="jump__letter" aria-hidden="true">
                    {s.letter}
                  </span>
                  <span>{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {SERVICES.items.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          tabIndex={-1}
          aria-labelledby={`${s.id}-title`}
          className={`section service section--${i % 2 === 0 ? "white" : "soft"}`}
        >
          <div className={`container service__inner${i % 2 === 1 ? " service__inner--flip" : ""}`}>
            <figure className="service__media">
              <img
                src={img(s.image)}
                alt={`${s.title}`}
                width="1000"
                height="667"
                loading="lazy"
              />
            </figure>

            <div className="service__copy">
              <p className="service__letter" aria-hidden="true">
                <Icon name={s.icon} size={22} />
                <span>{s.letter}</span>
              </p>
              <h2 id={`${s.id}-title`} className="section-title">
                <span className="visually-hidden">{s.letter}. </span>
                {s.title}
              </h2>
              <p className="prose">{s.intro}</p>
              <ul className="checklist checklist--cols">
                {s.list.map((li) => (
                  <li key={li}>
                    <Icon name="check" size={22} />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
              {s.note && (
                <p className="note">
                  <Icon name="info" size={24} />
                  <span>{s.note}</span>
                </p>
              )}
            </div>
          </div>
        </section>
      ))}

      <CtaBand />
    </>
  );
}
