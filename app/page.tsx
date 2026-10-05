import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import Skills from "@/components/Skills";
import SmoothScroll from "@/components/SmoothScroll";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Education />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
    </>
  );
}
