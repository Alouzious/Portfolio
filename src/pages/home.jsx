import React from 'react';
import About from './About';
// import MoreAbout from './moreabout';
import Services from '../components/services';
import Skills from './skills';
import Projects from './projects';
import Contact from './contact';
import Footer from '../components/footer';


function Home() {
  return (
    <div style={{ overflowX: 'hidden', maxWidth: '100vw' }}>
      <About />
      {/* <MoreAbout /> */}
      <Services />
      <Skills />
      <Projects />
      <Contact />
      <Footer />

    </div>
  );
}

export default Home;
