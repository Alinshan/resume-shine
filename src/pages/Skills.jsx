import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DecryptedText from '../components/DecryptedText';
import TiltedCard from '../components/TiltedCard';
import { sound } from '../utils/sound';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState('all');

  const certs = [
    {
      title: 'Certified Ethical Hacker (CEH) Master v12',
      issuer: 'EC-Council',
      badge: 'ANSI Accredited &bull; 6-Hour Practical Exam Cleared',
      date: '2024',
      status: 'VERIFIED CREDENTIAL',
      desc: 'Demonstrated mastery across 20 vulnerability modules including network reconnaissance, perimeter defense bypass, Active Directory enumeration, cloud computing exploitation, and cryptography.',
      accent: 'border-beam-card',
    },
    {
      title: 'Practical Ethical Hacking (PEH)',
      issuer: 'TCM Security',
      badge: 'Professional Certification',
      date: '2023',
      status: 'VERIFIED CREDENTIAL',
      desc: 'In-depth hands-on technical curriculum covering real-world network pentesting, Active Directory exploitation killchains, Open-Source Intelligence (OSINT), and report writing.',
      accent: '',
    },
    {
      title: 'TryHackMe Global Top 1% Ranking',
      issuer: 'TryHackMe Platform',
      badge: '270+ Attack Rooms &bull; Rank #262 Globally',
      date: '2024',
      status: 'ACTIVE RANKING',
      desc: 'Sustained top 1% global standing across 3,000,000+ registered cybersecurity professionals through rigorous completion of advanced CTF challenges, Linux/Windows privilege escalation, and domain penetration.',
      accent: '',
    },
  ];

  const skillCategories = [
    {
      id: 'offensive',
      label: 'Offensive & Red Teaming',
      skills: [
        { name: 'Active Directory Exploitation', level: 'Expert' },
        { name: 'BloodHound / SharpHound', level: 'Expert' },
        { name: 'Mimikatz / DCSync', level: 'Expert' },
        { name: 'Burp Suite Professional', level: 'Expert' },
        { name: 'Metasploit Framework', level: 'Advanced' },
        { name: 'Nmap & Vulnerability Scanning', level: 'Expert' },
        { name: 'Kerberoasting & AS-REP Roasting', level: 'Expert' },
        { name: 'Impacket Suite', level: 'Expert' },
        { name: 'Hydra & Hashcat', level: 'Advanced' },
        { name: 'Privilege Escalation (Lin/Win)', level: 'Expert' },
      ],
    },
    {
      id: 'defensive',
      label: 'Defensive & SOC Operations',
      skills: [
        { name: 'Wazuh SIEM Ingestion', level: 'Expert' },
        { name: 'Elasticsearch / ELK Stack', level: 'Advanced' },
        { name: 'Sysmon Telemetry', level: 'Expert' },
        { name: 'Sigma Rule Engineering', level: 'Advanced' },
        { name: 'Zeek / Network Flow Logs', level: 'Advanced' },
        { name: 'Threat Hunting & Triage', level: 'Expert' },
        { name: 'MITRE ATT&CK Mapping', level: 'Expert' },
        { name: 'Wireshark Packet Analysis', level: 'Expert' },
      ],
    },
    {
      id: 'mobile',
      label: 'Mobile & Web Pentesting',
      skills: [
        { name: 'Frida Dynamic Instrumentation', level: 'Expert' },
        { name: 'Objection Framework', level: 'Advanced' },
        { name: 'SSL Pinning Bypass', level: 'Expert' },
        { name: 'Jadx-GUI Decompilation', level: 'Advanced' },
        { name: 'OWASP Mobile Top 10', level: 'Expert' },
        { name: 'OWASP Web Top 10', level: 'Expert' },
        { name: 'REST & GraphQL API Auditing', level: 'Advanced' },
        { name: 'Root Detection Bypass', level: 'Expert' },
      ],
    },
    {
      id: 'tooling',
      label: 'Languages & Systems',
      skills: [
        { name: 'Python Automation', level: 'Advanced' },
        { name: 'Bash Scripting', level: 'Advanced' },
        { name: 'PowerShell Security', level: 'Advanced' },
        { name: 'Linux / Kali / Parrot', level: 'Expert' },
        { name: 'Windows Server 2022', level: 'Advanced' },
        { name: 'Docker Containers', level: 'Intermediate' },
        { name: 'Git & Version Control', level: 'Advanced' },
        { name: 'SQL Querying & Injection', level: 'Advanced' },
      ],
    },
  ];

  const handleFilterClick = (id) => {
    sound.tab();
    setActiveFilter(id);
  };

  const displayedCategories =
    activeFilter === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeFilter);

  return (
    <div className="page-container page-skills animate-enter">
      {/* Page Header */}
      <div className="page-header-box">
        <div className="page-breadcrumb">
          <Link to="/" className="breadcrumb-link" onClick={() => sound.click()}>Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Skills &amp; Certs</span>
        </div>
        <h1 className="page-main-title">
          <DecryptedText text="Credentials &amp; Technical Capabilities" speed={24} />
        </h1>
        <p className="page-sub-title">
          Industry-accredited security certifications, specialized toolsets, and interactive TrueFocus skill badges.
        </p>
      </div>

      {/* Certifications Row */}
      <section className="certifications-section mb-10">
        <div className="section-header-row mb-4">
          <h2 className="section-heading flex items-center gap-2">
            <Award size={20} className="text-purple inline" />
            <span>Accredited Certifications</span>
          </h2>
          <span className="card-badge">Industry Verified</span>
        </div>

        <div className="certs-grid">
          {certs.map((c) => (
            <TiltedCard
              key={c.title}
              className={`card-module cert-card ${c.accent}`}
              maxTilt={7}
            >
              <div className="cert-top-row">
                <div className="cert-icon-wrap">
                  <Award size={22} className="text-purple" />
                </div>
                <div className="cert-issuer-col">
                  <span className="cert-issuer">{c.issuer}</span>
                  <h3 className="cert-title">{c.title}</h3>
                </div>
                <span className="cert-date-chip">{c.date}</span>
              </div>

              <div className="cert-meta-badge">
                <ShieldCheck size={14} className="text-emerald" />
                <span dangerouslySetInnerHTML={{ __html: c.badge }} />
              </div>

              <p className="cert-desc">{c.desc}</p>
            </TiltedCard>
          ))}
        </div>
      </section>

      {/* Interactive TrueFocus Skills Matrix */}
      <section className="skills-matrix-section">
        <div className="section-header-row mb-4">
          <div>
            <div className="section-eyebrow">INTERACTIVE MATRIX</div>
            <h2 className="section-heading">Categorized Technical Toolsets</h2>
          </div>

          {/* Filter Tabs */}
          <div className="skill-filter-tabs">
            <button
              type="button"
              className={`filter-tab ${activeFilter === 'all' ? 'is-active' : ''}`}
              onClick={() => handleFilterClick('all')}
            >
              All Skills
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filter-tab ${activeFilter === cat.id ? 'is-active' : ''}`}
                onClick={() => handleFilterClick(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="skills-grid-columns">
          {displayedCategories.map((cat) => (
            <TiltedCard key={cat.id} className="card-module skill-cat-card" maxTilt={5}>
              <div className="skill-cat-header">
                <h3 className="skill-cat-title">{cat.label}</h3>
                <span className="skill-count">{cat.skills.length} competencies</span>
              </div>

              {/* TrueFocus Pill Container */}
              <div className="pills-wrap">
                {cat.skills.map((s) => (
                  <span
                    key={s.name}
                    className="pill-item rb-magnet skill-pill"
                    title={`${s.name} (${s.level})`}
                  >
                    <span className="pill-name">{s.name}</span>
                    <span className="pill-level-dot" />
                  </span>
                ))}
              </div>
            </TiltedCard>
          ))}
        </div>
      </section>

      {/* Bottom Nav Footer */}
      <div className="page-nav-footer">
        <Link to="/projects" className="btn-control btn-secondary" onClick={() => sound.click()}>
          <ArrowLeft size={14} />
          <span>Previous: Projects</span>
        </Link>
        <Link to="/terminal" className="btn-control btn-primary" onClick={() => sound.click()}>
          <span>Next: Interactive Security Terminal</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

