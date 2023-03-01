import React from 'react';
import './Footer.css';

export default function Header() {
  return (
    <footer>
      <div className="theme">
        <h1>Theme</h1>
        <div className="color-box purple" />
        <div className="color-box blue" />
        <div className="color-box grey" />
      </div>
    </footer>
  );
}
