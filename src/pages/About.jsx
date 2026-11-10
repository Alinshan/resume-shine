import React from 'react';
import { Link } from 'react-router-dom';
import DecryptedText from '../components/DecryptedText';
import TiltedCard from '../components/TiltedCard';
import { sound } from '../utils/sound';
import {
  GraduationCap,
  Trophy,
  ShieldCheck,
  Target,
  Search,
  Cpu,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export default function About() {
  const coreCompetencies = [
    {
      title: 'Active Directory Exploitation',
      desc: 'Deep domain mapping with BloodHound, Kerberoasting, AS-REP Roasting, DCSync credential attacks, and lateral movement detection.',
      icon: <Target className="text-purple" size={20} />,
    },
    {
      title: 'SOC & SIEM Operations',
      desc: 'Real-time telemetry ingestion using Wazuh & Elasticsearch. Writing Sigma detection rules and investigating suspicious alerts.',
      icon: <ShieldCheck className="text-emerald" size={20} />,
    },
    {
      title: 'Mobile Application Pentesting',
      desc: 'Dynamic analysis of Android binaries using Frida instrumentation, Objection, SSL pinning bypass, and static decompilation with Jadx.',
      icon: <Search className="text-blue" size={20} />,
    },
    {
      title: 'Threat Emulation & Research',
      desc: 'Emulating modern threat actors across Linux/Windows endpoints, evading standard AV signatures, and crafting actionable remediation reports.',
      icon: <Cpu className="text-amber" size={20} />,
    },
  ];

  return (
    <div className="page-container page-about animate-enter">
      {/* Page Title Header */}
      <div className="page-header-box">
        <div className="page-breadcrumb">
          <Link to="/" className="breadcrumb-link" onClick={() => sound.click()}>Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">About</span>
        </div>
        <h1 className="page-main-title">
          <DecryptedText text="Executive Dossier // Profile & Background" speed={24} />
        </h1>
        <p className="page-sub-title">
          Professional trajectory, security core competencies, formal computer science education, and industry milestones.
        </p>
      </div>

      <div className="page-grid-layout">
        {/* Profile Card */}
        <TiltedCard className="card-module dossier-profile-card">
          <div className="card-header-bar">
            <h2 className="card-title">Professional Trajectory</h2>
            <span className="card-badge">Summary</span>
          </div>

          <div className="dossier-body-text">
            <p className="profile-copy">
              Passionate, hands-on <strong>Cybersecurity Researcher</strong> and <strong>EC-Council CEH Master v12</strong> certified professional with extensive practical exposure in both offensive penetration testing and defensive Security Operations Center (SOC) environments.
            </p>
            <p className="profile-copy">
              Specialized in dissecting multi-stage Active Directory kill-chains, analyzing host and network telemetry through enterprise SIEM frameworks, and assessing Android mobile applications for zero-day and OWASP Mobile Top 10 vulnerabilities.
            </p>
            <p className="profile-copy">
              Combines deep technical curiosity with an adversarial mindset to anticipate threat vectors, identify misconfigurations before adversaries exploit them, and partner with development teams to remediate structural weaknesses.
            </p>
          </div>
        </TiltedCard>

        {/* Education & Honors */}
        <div className="dossier-side-col">
          <TiltedCard className="card-module edu-card">
            <div className="card-header-bar">
              <h2 className="card-title flex items-center gap-2">
                <GraduationCap size={18} className="text-purple inline" />
                <span>Formal Education</span>
              </h2>
              <span className="card-badge">2021 - 2024</span>
            </div>

            <div className="edu-detail-content">
              <div className="edu-degree">Bachelor of Computer Applications (BCA)</div>
              <div className="edu-institution">University of Kerala &bull; Kerala, India</div>
              <p className="edu-notes">
                Focused coursework in Computer Networks, Operating Systems, Relational Database Management Systems, Data Structures, and Information Security.
              </p>
            </div>
          </TiltedCard>

          <TiltedCard className="card-module honors-card">
            <div className="card-header-bar">
              <h2 className="card-title flex items-center gap-2">
                <Trophy size={18} className="text-amber inline" />
                <span>Global Rankings &amp; Honors</span>
              </h2>
              <span className="card-badge">Top 1%</span>
            </div>

            <ul className="honors-list">
              <li>
                <CheckCircle2 size={16} className="text-emerald" />
                <span><strong>TryHackMe Global Top 1%</strong> &bull; Ranked #262 out of 3M+ security professionals worldwide</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="text-purple" />
                <span><strong>270+ Attack Rooms &amp; CTFs</strong> &bull; Mastered privilege escalation, binary exploitation, and network pivoting</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="text-blue" />
                <span><strong>418-Day Continuous Streak</strong> &bull; Dedicated daily hands-on research and threat emulation</span>
              </li>
            </ul>
          </TiltedCard>
        </div>
      </div>

      {/* Core Competencies Grid */}
      <section className="competencies-section mt-8">
        <h2 className="section-heading mb-4">Core Technical Focus Areas</h2>
        <div className="competencies-grid">
          {coreCompetencies.map((c) => (
            <TiltedCard key={c.title} className="competency-card" maxTilt={6}>
              <div className="comp-icon-wrap">{c.icon}</div>
              <h3 className="comp-title">{c.title}</h3>
              <p className="comp-desc">{c.desc}</p>
            </TiltedCard>
          ))}
        </div>
      </section>

      {/* Bottom Nav Footer */}
      <div className="page-nav-footer">
        <Link to="/" className="btn-control btn-secondary" onClick={() => sound.click()}>
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </Link>
        <Link to="/experience" className="btn-control btn-primary" onClick={() => sound.click()}>
          <span>Next: Professional Experience</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
