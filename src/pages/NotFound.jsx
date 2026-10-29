import Button from "../components/Button.jsx";
import PageHero from "../components/PageHero.jsx";

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="Page not found">
      <div className="hero__actions">
        <Button to="/">Home</Button>
      </div>
    </PageHero>
  );
}
