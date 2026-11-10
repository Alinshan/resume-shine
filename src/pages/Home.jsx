import React from 'react';
import { Link } from 'react-router-dom';
import DecryptedText from '../components/DecryptedText';
import TiltedCard from '../components/TiltedCard';
import { sound } from '../utils/sound';
import {
  ShieldAlert,
  Terminal,
  Briefcase,
  FolderGit2,
  Award,
  User,
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  Sparkles,
} from 'lucide-react';

export default function Home({ showToast }) {
  const handleCopy = (text, label) => {
    navigator.clipboard?.writeText(text);
    sound.chime();
    showToast(`${label} copied to clipboard! 📋`);
  };

  const categories = [
    {
      to: '/about',
      title: 'Executive Dossier',
      category: '01 // BACKGROUND & EDUCATION',
      description: 'Comprehensive profile, security methodology, Bachelor of Computer Applications degree, and global achievements.',
      icon: <User className="cat-icon text-purple" size={24} />,
      badge: 'Profile & Honors',
    },
    {
      to: '/experience',
      title: 'Professional Experience',
      category: '02 // OFFENSIVE ENGAGEMENTS',
      description: 'Freelance Penetration Tester & Security Researcher covering Active Directory audits, web app assessments, and vulnerability triage.',
      icon: <Briefcase className="cat-icon text-blue" size={24} />,
      badge: 'Red Team Ops',
    },
    {
      to: '/projects',
      title: 'Security Projects',
      category: '03 // LABS & INFRASTRUCTURE',
      description: 'Enterprise AD Attack & Defense Lab, Automated SOC/SIEM Telemetry Pipeline, and Android Dynamic Analysis with Frida.',
      icon: <FolderGit2 className="cat-icon text-emerald" size={24} />,
      badge: '3 Production Labs',
    },
    {
      to: '/skills',
      title: 'Skills & Certifications',
      category: '04 // CREDENTIALS & STACK',
      description: 'EC-Council Certified Ethical Hacker (CEH) Master v12, TCM Practical Ethical Hacking, and categorized toolsets with TrueFocus.',
      icon: <Award className="cat-icon text-amber" size={24} />,
      badge: 'CEH Master v12',
    },
    {
      to: '/terminal',
      title: 'Interactive Security Terminal',
      category: '05 // LIVE SIMULATION SANDBOX',
      description: 'Interactive Kali Linux terminal runner with Active Directory, SOC SIEM, and Mobile Pentest attack simulation scenarios + TryHackMe stats.',
      icon: <Terminal className="cat-icon text-cyan" size={24} />,
      badge: 'Top 1% Global',
    },
  ];

  return (
    <div className="page-container page-home">
      {/* Hero Header Card */}
      <section className="hero-card border-beam-card tilted-card animate-enter">
        <div className="hero-main-row">
          <div className="name-title-box">
            <h1 className="candidate-name">
              <DecryptedText text="SHINE B JOHN" speed={28} />
            </h1>
            <div className="candidate-role">
              Cybersecurity Researcher &bull; SOC Analyst &amp; Penetration Tester
            </div>

            <div className="hero-badges-row">
              <span className="status-chip chip-credential rb-magnet">
                <ShieldAlert size={14} className="inline mr-1" />
                CEH Master v12
              </span>
              <span className="status-chip chip-available rb-magnet">
                <span className="pulse-dot" />
                Immediate Joining Available
              </span>
            </div>
          </div>

          <div className="hero-portrait-col">
            <div className="avatar-frame rb-magnet" title="Security Researcher Moniker">
              <span className="avatar-initials">SJ</span>
              <div className="avatar-radar" />
            </div>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="contact-bar">
          <span className="contact-link rb-magnet">
            <MapPin size={14} />
            Kochi, Kerala
          </span>
          <button
            type="button"
            className="contact-link rb-magnet btn-ghost-link"
            onClick={() => handleCopy('+919946837394', 'Phone number')}
          >
            <Phone size={14} />
            +91 9946837394
          </button>
          <button
            type="button"
            className="contact-link rb-magnet btn-ghost-link"
            onClick={() => handleCopy('shinebjohn3@gmail.com', 'Email address')}
          >
            <Mail size={14} />
            shinebjohn3@gmail.com
          </button>
          <a
            className="contact-link rb-magnet"
            href="https://www.linkedin.com/in/synxop777/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.click()}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            linkedin.com/in/synxop777
          </a>
        </div>

        {/* Clean Executive Pitch (Little Description) */}
        <div className="hero-description-block">
          <p className="hero-pitch-text">
            Offensive security specialist and defensive analyst focused on <strong>Active Directory exploitation</strong>,{' '}
            <strong>SOC SIEM threat analytics</strong>, and <strong>mobile application vulnerability assessments</strong>.{' '}
            Ranked in the <strong>Top 1% globally</strong> on TryHackMe with 270+ completed enterprise challenge environments,{' '}
            dedicated to discovering attack surfaces and engineering resilient defense postures.
          </p>
          <div className="hero-action-buttons">
            <Link
              to="/experience"
              className="btn-control btn-primary rb-magnet"
              onClick={() => sound.click()}
            >
              <Briefcase size={14} />
              <span>Explore Experience</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/terminal"
              className="btn-control btn-secondary rb-magnet"
              onClick={() => sound.click()}
            >
              <Terminal size={14} />
              <span>Launch Terminal Lab</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Category Section Navigation Showcase */}
      <section className="category-showcase-section animate-enter delay-1">
        <div className="section-header-row">
          <div>
            <div className="section-eyebrow">PORTFOLIO DIRECTORY</div>
            <h2 className="section-heading">Explore Specialized Categories</h2>
          </div>
          <span className="category-count-badge">5 Dedicated Pages</span>
        </div>

        <div className="categories-grid">
          {categories.map((cat, idx) => (
            <TiltedCard key={cat.to} className="category-nav-card" maxTilt={8}>
              <Link
                to={cat.to}
                className="category-card-inner"
                onClick={() => sound.click()}
              >
                <div className="category-top-meta">
                  <span className="category-num">{cat.category}</span>
                  <span className="cat-chip">{cat.badge}</span>
                </div>

                <div className="category-card-header">
                  <div className="cat-icon-wrap">{cat.icon}</div>
                  <h3 className="category-title">{cat.title}</h3>
                </div>

                <p className="category-desc">{cat.description}</p>

                <div className="category-cta-row">
                  <span className="cat-cta-text">Open Page</span>
                  <ArrowRight size={15} className="cat-arrow" />
                </div>
              </Link>
            </TiltedCard>
          ))}
        </div>
      </section>
    </div>
  );
}
