import { Link } from "../router.jsx";
import Icon from "./Icon.jsx";

export default function Button({ to, variant = "primary", arrow = true, children, ...rest }) {
  return (
    <Link to={to} className={`btn btn--${variant}`} {...rest}>
      <span>{children}</span>
      {arrow && <Icon name="arrow" size={20} />}
    </Link>
  );
}
