import { useState } from "react";
import Icon from "./Icon.jsx";

// To receive enquiries by e-mail, create a free form at https://formspree.io (or similar)
// and put its URL in a .env file:  VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

const EMPTY = { fullName: "", email: "", phone: "", message: "" };

function validate(v) {
  const e = {};
  if (!v.fullName.trim()) e.fullName = "Please enter your full name.";
  if (!v.email.trim()) e.email = "Please enter your email id.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim()))
    e.email = "Please enter a valid email id, for example name@company.com.";
  const digits = v.phone.replace(/\D/g, "");
  if (!v.phone.trim()) e.phone = "Please enter your contact number.";
  else if (!/^[+()\d\s.-]+$/.test(v.phone.trim()) || digits.length < 7 || digits.length > 15)
    e.phone = "Please enter a valid contact number.";
  if (!v.message.trim()) e.message = "Please enter your message.";
  return e;
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed

  const set = (name) => (e) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const firstBad = Object.keys(found)[0];
    if (firstBad) {
      const el = document.getElementById("field-" + firstBad);
      el && el.focus();
      return;
    }
    setStatus("sending");
    try {
      if (!ENDPOINT) {
        // Demo mode: nothing is sent anywhere until VITE_FORM_ENDPOINT is set (see README.md).
        console.warn("[AdSpark Digital] Contact form is not connected yet. Set VITE_FORM_ENDPOINT – see README.md.");
      } else {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: values.fullName,
            email: values.email,
            phone: values.phone,
            message: values.message,
          }),
        });
        if (!res.ok) throw new Error("Request failed");
      }
      setStatus("sent");
      setValues(EMPTY);
    } catch (err) {
      setStatus("failed");
    }
  }

  const field = (name, label, props = {}) => {
    const err = errors[name];
    const Tag = props.as || "input";
    const { as, ...rest } = props;
    return (
      <div className={`field${err ? " has-error" : ""}`}>
        <label htmlFor={`field-${name}`}>
          {label} <span className="field__req" aria-hidden="true">*</span>
        </label>
        <Tag
          id={`field-${name}`}
          name={name}
          value={values[name]}
          onChange={set(name)}
          required
          aria-required="true"
          aria-invalid={err ? "true" : "false"}
          aria-describedby={err ? `error-${name}` : undefined}
          {...rest}
        />
        {err && (
          <p className="field__error" id={`error-${name}`}>
            {err}
          </p>
        )}
      </div>
    );
  };

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-labelledby="form-title">
      {field("fullName", "Full name", { type: "text", autoComplete: "name" })}
      {field("email", "Email id", { type: "email", autoComplete: "email", inputMode: "email" })}
      {field("phone", "Contact number", { type: "tel", autoComplete: "tel", inputMode: "tel" })}
      {field("message", "Message", { as: "textarea", rows: 6 })}

      <button type="submit" className="btn btn--primary btn--block" disabled={status === "sending"}>
        <span>{status === "sending" ? "Sending…" : "Send message"}</span>
        <Icon name="arrow" size={20} />
      </button>

      <div role="status" aria-live="polite" className="form__status">
        {status === "sent" && (
          <p className="form__ok">
            <Icon name="check" size={20} /> Thank you. Your message has been sent.
          </p>
        )}
        {status === "failed" && (
          <p className="form__fail">Sorry, your message could not be sent. Please try again.</p>
        )}
      </div>
    </form>
  );
}
