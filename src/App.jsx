import { Grain } from "./components/Grain";
import { Cursor } from "./components/Cursor";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Stack } from "./sections/Stack";
import { Projects } from "./sections/Projects";
import { Work } from "./sections/Work";
import { Personal } from "./sections/Personal";
import { Lab } from "./sections/Lab";
import { Contact } from "./sections/Contact";

export default function App() {
  return (
    <>
      <Grain />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Work />
        <Personal />
        <Lab />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
