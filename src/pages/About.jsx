import CtaBand from "../components/CtaBand.jsx";
import Icon from "../components/Icon.jsx";
import PageHero from "../components/PageHero.jsx";
import { Section, SectionHeading } from "../components/Section.jsx";
import { ABOUT, WHY, PROCESS } from "../data/content.js";

export default function About() {
  const [first, ...rest] = ABOUT.paragraphs;
  const closing = rest[rest.length - 1];
  const body = rest.slice(0, -1);

  return (
    <>
      <PageHero eyebrow={ABOUT.label} title={ABOUT.title}>
        <p className="lead">{first}</p>
      </PageHero>

      {/* --------------------------------------------------- our story */}
      <Section tone="white">
        <div className="prose-columns">
          {body.map((p) => (
            <p key={p} className="prose">
              {p}
            </p>
          ))}
        </div>
        <p className="statement statement--wide">{closing}</p>
      </Section>

      {/* ------------------------------------------- mission and vision */}
      <Section tone="soft" labelledBy="mission-title">
        <h2 id="mission-title" className="visually-hidden">
          {ABOUT.mission.title} and {ABOUT.vision.title}
        </h2>
        <div className="grid grid--2">
          {[
            { ...ABOUT.mission, icon: "mission" },
            { ...ABOUT.vision, icon: "vision" },
          ].map((m) => (
            <article key={m.title} className="card card--feature">
              <span className="icon-badge icon-badge--lg">
                <Icon name={m.icon} size={32} />
              </span>
              <h3 className="card__title">{m.title}</h3>
              <p>{m.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------ values */}
      <Section tone="white" labelledBy="values-title">
        <SectionHeading id="values-title" title={ABOUT.valuesTitle} align="center" />
        <ul className="grid grid--values">
          {ABOUT.values.map((v) => (
            <li key={v.title} className="card">
              <span className="icon-badge">
                <Icon name={v.icon} size={26} />
              </span>
              <h3 className="card__title">{v.title}</h3>
              <p>{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------- why choose us */}
      <Section tone="warm" labelledBy="why-title">
        <SectionHeading
          id="why-title"
          eyebrow={WHY.title}
          title={WHY.subtitle}
          align="center"
        />
        <div className="prose-center">
          {WHY.paragraphs.map((p) => (
            <p key={p} className="prose">
              {p}
            </p>
          ))}
        </div>
        <ul className="grid grid--3">
          {WHY.items.map((w) => (
            <li key={w.title} className="card">
              <span className="icon-badge">
                <Icon name={w.icon} size={26} />
              </span>
              <h3 className="card__title">{w.title}</h3>
              <p>{w.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* ------------------------------------------------------ process */}
      <Section tone="white" labelledBy="process-title">
        <SectionHeading id="process-title" title={PROCESS.title} align="center" />
        <ol className="steps">
          {PROCESS.steps.map((s) => (
            <li key={s.number} className="step">
              <span className="step__number" aria-hidden="true">
                {s.number}
              </span>
              <h3 className="step__title">
                <span className="visually-hidden">Step {Number(s.number)}: </span>
                {s.title}
              </h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand />
    </>
  );
}
