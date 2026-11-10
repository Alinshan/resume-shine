import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dock from './components/Dock';
import BackgroundEffects from './components/BackgroundEffects';
import Toast from './components/Toast';
import Home from './pages/Home';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import TerminalLab from './pages/TerminalLab';
import { isSoundEnabled, setSoundEnabled, sound } from './utils/sound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

function MainLayout() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('rb-theme') || 'dark';
    } catch (_) {
      return 'dark';
    }
  });

  const [soundActive, setSoundActive] = useState(() => isSoundEnabled());
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (message) => {
    setToast({ visible: true, message });
    setTimeout(() => {
      setToast({ visible: false, message: '' });
    }, 2600);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('rb-theme', theme);
    } catch (_) {}
  }, [theme]);

  const handleSoundChange = (val) => {
    setSoundActive(val);
    setSoundEnabled(val);
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const onKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 't' || e.key === 'T') {
        const next = theme === 'dark' ? 'light' : 'dark';
        sound.toggle();
        setTheme(next);
        showToast(`Theme switched to ${next.toUpperCase()}`);
      } else if (e.key === 'm' || e.key === 'M') {
        const next = !soundActive;
        handleSoundChange(next);
        if (next) sound.click();
        showToast(next ? 'Sound enabled 🔊' : 'Sound muted 🔇');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [theme, soundActive]);

  return (
    <div className="app-root">
      <ScrollToTop />
      <BackgroundEffects theme={theme} />

      <Navbar
        theme={theme}
        setTheme={setTheme}
        soundEnabled={soundActive}
        setSoundEnabled={handleSoundChange}
        showToast={showToast}
      />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home theme={theme} showToast={showToast} />} />
          <Route path="/about" element={<About showToast={showToast} />} />
          <Route path="/experience" element={<Experience showToast={showToast} />} />
          <Route path="/projects" element={<Projects showToast={showToast} />} />
          <Route path="/skills" element={<Skills showToast={showToast} />} />
          <Route path="/terminal" element={<TerminalLab showToast={showToast} />} />
          <Route path="*" element={<Home theme={theme} showToast={showToast} />} />
        </Routes>
      </main>

      <Dock
        theme={theme}
        setTheme={setTheme}
        soundEnabled={soundActive}
        setSoundEnabled={handleSoundChange}
        showToast={showToast}
      />

      <Toast toast={toast} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

