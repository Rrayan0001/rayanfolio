import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CustomCursor from "./components/shared/CustomCursor";
import Footer from "./components/shared/Footer";
import Hero from "./components/shared/Hero";
import Projects from "./components/shared/Projects";
import Skills from "./components/shared/Skills";
import Timeline from "./components/shared/Timeline";
import WelcomeAnimation from "./components/shared/WelcomeAnimation";
import { TracingBeam } from "./components/ui/TracingBeam";

const App = () => {
  const [animDone, setAnimDone] = useState(false);

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {!animDone && (
          <WelcomeAnimation onComplete={() => setAnimDone(true)} />
        )}
      </AnimatePresence>
      <main className="relative min-h-screen w-full bg-dark-2 text-zinc-300 max-sm:p-1 max-sm:pt-14 max-sm:px-1 selection:bg-red-600">
        <TracingBeam>
          <Hero />
          <Projects />
          <Timeline />
          <Skills />
          <Footer />
        </TracingBeam>
      </main>
    </>
  );
};

export default App;
