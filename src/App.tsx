import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Rail from "./components/Rail";
import Skills from "./components/Skills";
import { MotionProvider } from "./lib/motion";

export default function App() {
  return (
    <MotionProvider>
      <a className="skip" href="#main">
        skip to content
      </a>
      <div className="shell">
        <Rail />
        <div className="page">
          <main id="main">
            <Hero />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </MotionProvider>
  );
}
