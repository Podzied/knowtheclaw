'use client';

import { useState } from 'react';

const navLinks = [
  { href: '#shift', label: 'What Changed' },
  { href: '#what', label: 'What It Does' },
  { href: '#demo', label: 'Live Demo' },
  { href: '#skills', label: 'Skills' },
  { href: '#setup', label: 'Setup' },
  { href: '#security', label: 'Security' },
  { href: '#community', label: 'Community' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav>
      <div className="nav-inner">
        <a href="#top" className="nav-mark">
          Know<span className="claw">The</span>Claw
        </a>
        <ul className="nav-links">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className={`mobile-nav${menuOpen ? ' open' : ''}`}>
        {navLinks.map(({ href, label }) => (
          <a key={href} href={href} onClick={closeMenu}>
            {label}
          </a>
        ))}
        <a href="#about" onClick={closeMenu}>
          About
        </a>
      </div>
    </nav>
  );
}
