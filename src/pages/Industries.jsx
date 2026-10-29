import CtaBand from "../components/CtaBand.jsx";
import Icon from "../components/Icon.jsx";
import PageHero from "../components/PageHero.jsx";
import { Section } from "../components/Section.jsx";
import { INDUSTRIES } from "../data/content.js";

export default function Industries() {
  return (
    <>
      <PageHero eyebrow={INDUSTRIES.label} title={INDUSTRIES.title}>
        <p className="lead">{INDUSTRIES.intro}</p>
      </PageHero>

      <Section tone="white">
        <ul className="grid grid--industries">
          {INDUSTRIES.items.map((item) => (
            <li key={item.title} className="card card--industry">
              <span className="icon-badge icon-badge--lg">
                <Icon name={item.icon} size={32} />
              </span>
              <h2 className="card__title">{item.title}</h2>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="soft">
        <p className="statement statement--wide">{INDUSTRIES.closing}</p>
      </Section>

      <CtaBand />
    </>
  );
}
