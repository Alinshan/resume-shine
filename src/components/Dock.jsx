import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { sound } from '../utils/sound';
import {
  Home,
  User,
  Briefcase,
  FolderGit2,
  Award,
  Terminal,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Mail,
  ArrowUp,
} from 'lucide-react';

export default function Dock({ theme, setTheme, soundEnabled, setSoundEnabled, showToast }) {
  const navigate = useNavigate();

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    sound.toggle();
    setTheme(next);
    showToast(`Switched to ${next.toUpperCase()} mode`);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) sound.click();
    showToast(next ? 'Sound enabled 🔊' : 'Sound muted 🔇');
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText('shinebjohn3@gmail.com');
    sound.chime();
    showToast('Email copied to clipboard! 📋');
  };

  const scrollToTop = () => {
    sound.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { to: '/', label: 'Home', icon: <Home size={18} /> },
    { to: '/about', label: 'About', icon: <User size={18} /> },
    { to: '/experience', label: 'Experience', icon: <Briefcase size={18} /> },
    { to: '/projects', label: 'Projects', icon: <FolderGit2 size={18} /> },
    { to: '/skills', label: 'Skills & Certs', icon: <Award size={18} /> },
    { to: '/terminal', label: 'Terminal Lab', icon: <Terminal size={18} /> },
  ];

  return (
    <nav className="rb-dock" aria-label="Quick Actions Dock">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `rb-dock-item ${isActive ? 'is-dock-active' : ''}`}
          onClick={() => sound.click()}
          aria-label={item.label}
        >
          {item.icon}
          <span className="dock-tooltip">{item.label}</span>
        </NavLink>
      ))}

      <div className="dock-divider" aria-hidden="true" />

      {/* Theme Toggle */}
      <button
        type="button"
        className="rb-dock-item"
        onClick={toggleTheme}
        aria-label="Toggle Theme (Dark / Light)"
      >
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        <span className="dock-tooltip">Toggle Theme</span>
      </button>

      {/* Sound Toggle */}
      <button
        type="button"
        className="rb-dock-item"
        onClick={toggleSound}
        aria-label="Toggle Sound Effects"
      >
        {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        <span className="dock-tooltip">Toggle Sound</span>
      </button>

      {/* Copy Email */}
      <button
        type="button"
        className="rb-dock-item"
        onClick={copyEmail}
        aria-label="Copy Email"
      >
        <Mail size={18} />
        <span className="dock-tooltip">Copy Email</span>
      </button>

      {/* Scroll Top */}
      <button
        type="button"
        className="rb-dock-item"
        onClick={scrollToTop}
        aria-label="Scroll to Top"
      >
        <ArrowUp size={18} />
        <span className="dock-tooltip">Top</span>
      </button>
    </nav>
  );
}
