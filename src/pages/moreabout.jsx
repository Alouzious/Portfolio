import React, { useEffect, useState } from 'react';
import './moreabout.css';
import axios from 'axios';

function MoreAbout() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    axios.get('https://alouzious-portfolio.onrender.com/api/about/')
      .then(response => {
        if (response.data) setAboutData(response.data);
      })
      .catch(error => console.error('Error fetching about content:', error));
  }, []);

  if (!aboutData) return <div className="about-section">Loading...</div>;

  return (
    <section id="about" className="moreabout-section">
      <div className="moreabout-container">

        <div className="moreabout-left">
          <div className="profile-glow">
            <img src={aboutData.image} alt="Profile" className="profile-image" />
          </div>
        </div>
        <div className="moreabout-right">
          <p className="hello">About Me</p>
          <p className="morebio">{aboutData.morebio}</p>
          <a href="#more-about" className="btn-mmore">{aboutData.cta_button_text}</a>
        </div>

      </div>
    </section>
   );
}

export default MoreAbout;
