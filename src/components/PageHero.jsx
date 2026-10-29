export default function PageHero({ eyebrow, title, children }) {
  return (
    <section className="page-hero" aria-labelledby="page-title">
      <div className="container page-hero__inner">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 id="page-title" className="page-title">
          {title}
        </h1>
        {children}
      </div>
    </section>
  );
}
