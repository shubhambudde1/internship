import React from 'react';
import logo from '../assets/logo.svg';

const Header = () => (
  <header className="header">
    <div className="logo">
      <img src={logo} alt="Logo" />
    </div>
    <nav className="nav">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#services">Services</a>
      <a href="#contact">Contact</a>
    </nav>
  </header>
);

export default Header;
