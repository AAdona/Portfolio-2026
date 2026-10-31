import { useMotion } from "../lib/motion";
import Divider from "./Divider";

export default function Footer() {
  const { motionOn, toggle } = useMotion();

  return (
    <footer>
      <Divider variant="plain" />
      <div className="foot">
        <span>&copy; {new Date().getFullYear()} Adrian Hero Adona</span>
        <button type="button" className="btn" onClick={toggle} aria-pressed={motionOn}>
          motion: {motionOn ? "on" : "off"}
        </button>
        <span>last updated {__BUILD_DATE__}</span>
      </div>
    </footer>
  );
}
