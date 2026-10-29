export function Section({ id, tone = "white", className = "", labelledBy, children }) {
  return (
    <section
      id={id}
      className={`section section--${tone} ${className}`}
      aria-labelledby={labelledBy}
    >
      <div className="container">{children}</div>
    </section>
  );
}

export function SectionHeading({ id, eyebrow, title, subtitle, align = "left", as: Tag = "h2" }) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Tag id={id} className="section-title">
        {title}
      </Tag>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}
