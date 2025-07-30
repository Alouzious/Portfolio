import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './services.css';

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('https://alouzious-portfolio.onrender.com/api/services/')
      .then(response => setServices(response.data))
      .catch(error => console.error('Error loading services:', error));
  }, []);

  return (
    <section id="services" className="services-section">
      <h2 className="section-title">My Services</h2>
      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
