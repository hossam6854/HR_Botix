import React from 'react';

const ResponsiveMenu = ({ isActive, toggleMenu }) => {
  return (
    <div className={`responsive-menu ${isActive ? 'active' : ''}`}>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#team">Team</a></li>
        <li><a href="/log">Sign up Now</a></li>
      </ul>
    </div>
  );
}

export default ResponsiveMenu;
