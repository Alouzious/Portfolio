import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './contact.css';
import {
  FaEnvelope,
  FaPhone,
  FaTwitter,
  FaGithub,
  FaFacebook,
  FaLinkedin,
} from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [contactInfo, setContactInfo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/contact-info/')
      .then((res) => setContactInfo(res.data))
      .catch((err) => console.error('Failed to fetch contact info:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) return;

    setIsSubmitting(true);
    axios
      .post('https://alouzious-portfolio.onrender.com/api/send-message/', formData)
      .then(() => {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      })
      .catch((err) => {
        console.error('Error sending message:', err);
        alert('Error sending message. Please try again.');
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <section className="contact-section" id='contact'>
      <div className="contact-container">
        <div className="contact-left">
          <h2 className="contact-title">
            Contact <span>Me</span>
          </h2>
          <p className="contact-subtitle">Let's Work Together</p>
          <p className="contact-description">
            {contactInfo?.description || 'Loading description...'}
          </p>

          <div className="contact-details">
            <p>
              <FaEnvelope className="icon" /> {contactInfo?.email}
            </p>
            <p>
              <FaPhone className="icon" /> {contactInfo?.phone}
            </p>
          </div>

          <div className="social-icons">
            {contactInfo?.twitter && (
              <a href={contactInfo.twitter} target="_blank" rel="noreferrer">
                <FaTwitter />
              </a>
            )}
            {contactInfo?.github && (
              <a href={contactInfo.github} target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
            )}
            {contactInfo?.facebook && (
              <a href={contactInfo.facebook} target="_blank" rel="noreferrer">
                <FaFacebook />
              </a>
            )}
            {contactInfo?.linkedin && (
              <a href={contactInfo.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            name="name"
            type="text"
            placeholder="Enter Your Name"
            value={formData.name}
            onChange={handleChange}
            maxLength={100}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            maxLength={100}
            required
          />
          <input
            name="subject"
            type="text"
            placeholder="Enter Your Subject"
            value={formData.subject}
            onChange={handleChange}
            maxLength={150}
            required
          />
          <textarea
            name="message"
            placeholder="Enter Your Message"
            value={formData.message}
            onChange={handleChange}
            maxLength={1000}
            required
          ></textarea>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
