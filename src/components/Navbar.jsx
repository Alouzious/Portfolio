import React from 'react';
import './Navbar.css'; // Optional, for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">Portfolio</h1>
      </div>
      <ul className="navbar-right">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
