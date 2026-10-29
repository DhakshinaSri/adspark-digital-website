import Button from "./Button.jsx";
import { CONTACT } from "../data/content.js";

export default function CtaBand() {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-band__inner">
          <h2 id="cta-title" className="cta-band__title">
            {CONTACT.title}
          </h2>
          <Button to="/contact">Contact Us</Button>
        </div>
      </div>
    </section>
  );
}
