import ContactForm from "../components/ContactForm.jsx";
import Faq from "../components/Faq.jsx";
import PageHero from "../components/PageHero.jsx";
import { Section, SectionHeading } from "../components/Section.jsx";
import { img } from "../lib/assets.js";
import { CONTACT, FAQ } from "../data/content.js";

export default function Contact() {
  return (
    <>
      <PageHero eyebrow={CONTACT.label} title={CONTACT.title} />

      <Section tone="white" labelledBy="form-title">
        <div className="contact">
          <div className="contact__intro">
            {CONTACT.paragraphs.map((p) => (
              <p key={p} className="prose">
                {p}
              </p>
            ))}
            <figure className="contact__media">
              <img
                src={img("contact")}
                alt="A laptop showing a digital marketing dashboard beside brand and mood board sheets"
                width="1000"
                height="667"
                loading="lazy"
              />
            </figure>
          </div>

          <div className="panel panel--form">
            <h2 id="form-title" className="panel__title">
              {CONTACT.formTitle}
            </h2>
            <ContactForm />
          </div>
        </div>
      </Section>

      <Section tone="soft" labelledBy="faq-title">
        <SectionHeading id="faq-title" title={FAQ.title} align="center" />
        <Faq items={FAQ.items} />
      </Section>
    </>
  );
}
