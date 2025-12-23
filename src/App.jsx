import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Timeline from "./components/Timeline";
import Skills from "./components/Skills";
import Projects from "./components/Projects";

import Github from "./components/Github";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import VoiceNav from "./components/VoiceNav";
import Preloader from "./components/Preloader";

function App() {
  return (
    <>
      <Preloader />
      <VoiceNav />
      <Navbar />
      <Home />
      {/* <About /> */}
      <About />
      <Timeline />
      <Skills />
      <Projects />
      <Github />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
