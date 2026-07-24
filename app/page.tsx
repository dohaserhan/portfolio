import Hero from "../components/Hero";
import TechMarquee from "../components/TechMarquee";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-dark text-white">
      <Hero />
      <TechMarquee />
      <About/>
      <Projects />

      {/* <section id="about" className="min-h-screen scroll-mt-28">
        About
      </section> */}

      {/* <section id="projects" className="min-h-screen scroll-mt-28">
        Projects
      </section> */}

      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
