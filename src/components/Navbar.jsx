import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { sound } from '../utils/sound';
import { Volume2, VolumeX, Mail } from 'lucide-react';

export default function Navbar({ theme, setTheme, soundEnabled, setSoundEnabled, showToast }) {
  const switchRef = useRef(null);

  const toggleTheme = (newTheme) => {
    if (newTheme === theme) return;
    if (switchRef.current) {
      switchRef.current.classList.add('is-squishing');
      setTimeout(() => switchRef.current?.classList.remove('is-squishing'), 320);
    }
    sound.toggle();
    setTheme(newTheme);
    showToast(`Switched to ${newTheme.toUpperCase()} mode`);
  };

  const handleSoundToggle = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) sound.click();
    showToast(next ? 'Sound effects enabled 🔊' : 'Sound muted 🔇');
  };

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard?.writeText('shinebjohn3@gmail.com');
    sound.chime();
    showToast('Email copied: shinebjohn3@gmail.com 📋');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/experience', label: 'Experience' },
    { to: '/projects', label: 'Projects' },
    { to: '/skills', label: 'Skills & Certs' },
    { to: '/terminal', label: 'Terminal Lab' },
  ];

  return (
    <header className="top-bar">
      <div className="top-bar-left">
        <NavLink
          to="/"
          className="brand-mark rb-magnet"
          onClick={() => sound.click()}
        >
          <span className="brand-dot" />
          <span className="brand-name">SYN[X]OP</span>
          <span className="brand-sep">//</span>
          <span className="brand-title">SHINE B JOHN</span>
        </NavLink>
        <span className="status-badge" title="Active Threat Hunting &amp; Pentesting Engagement Ready">
          <span className="status-ping" />
          <span className="status-dot" />
          DEFENSE LEVEL: ACTIVE
        </span>
      </div>

      <nav className="top-nav-links" aria-label="Main Navigation">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}
            onClick={() => sound.click()}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="top-bar-right">
        {/* ReactBits Squish Theme Switcher */}
        <div
          className="rb-theme-switch"
          ref={switchRef}
          role="group"
          aria-label="Theme Switcher (ReactBits Squish Toggle)"
        >
          <button
            type="button"
            className="rb-theme-btn"
            aria-pressed={theme === 'dark'}
            onClick={() => toggleTheme('dark')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
            <span>Dark</span>
          </button>
          <button
            type="button"
            className="rb-theme-btn"
            aria-pressed={theme === 'light'}
            onClick={() => toggleTheme('light')}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
            <span>Light</span>
          </button>
          <div className="rb-theme-thumb" aria-hidden="true" />
        </div>

        {/* Audio Toggle */}
        <button
          className={`sound-toggle-btn rb-magnet ${!soundEnabled ? 'is-muted' : ''}`}
          onClick={handleSoundToggle}
          aria-label="Toggle Sound Effects"
          title={soundEnabled ? 'Mute UI Sound Effects' : 'Enable UI Sound Effects'}
          type="button"
        >
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
        </button>

        {/* Direct Email */}
        <a
          className="btn-control btn-secondary rb-magnet contact-btn-top"
          href="mailto:shinebjohn3@gmail.com"
          onClick={handleCopyEmail}
          title="Click to copy email address"
        >
          <Mail size={13} />
          <span>Contact</span>
        </a>
      </div>
    </header>
  );
}

