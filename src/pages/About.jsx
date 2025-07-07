import React, { useEffect, useState } from 'react';
import {ReactTyped} from 'react-typed';  // corrected import
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';
import './About.css';
import axios from 'axios';

function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/about/')
      .then(response => {
        if (response.data) setAboutData(response.data);
      })
      .catch(error => console.error('Error fetching about content:', error));
  }, []);

  if (!aboutData) return <div className="about-section">Loading...</div>;

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-left">
          <p className="hello">Hello, It's Me</p>
          <h1 className="name">{aboutData.name}</h1>
          <h2 className="typed-text">
            And I'm a{' '}
            <ReactTyped
              strings={[aboutData.title]} 
              typeSpeed={80} 
              backSpeed={60} 
              loop
              showCursor
              cursorChar="|"
            />
          </h2>
          <p className="bio">{aboutData.bio}</p>
          <div className="social-icons">
            <a href={aboutData.LinkdIn} target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href={aboutData.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href={aboutData.whatsapp} target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
            <a href={aboutData.x_twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
          <a href="#more-about" className="btn-more">{aboutData.cta_button_text}</a>
        </div>

        <div className="about-right">
          <div className="profile-glow">
            <img src={aboutData.image} alt="Profile" className="profile-image" />
          </div>
        </div>
      </div>
    </section>
   );
}

export default About;
