import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import FeaturedProjects from "./components/FeaturedProjects";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <FeaturedProjects />
        <Skills />
        <Contact />
      </main>
      <footer className="mx-auto max-w-3xl border-t border-line px-6 py-8 text-sm text-muted">
        &copy; {new Date().getFullYear()} Adrian Hero Adona
      </footer>
    </>
  );
}
