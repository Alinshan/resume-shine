import React from 'react';
import { Link } from 'react-router-dom';
import DecryptedText from '../components/DecryptedText';
import TiltedCard from '../components/TiltedCard';
import { sound } from '../utils/sound';
import {
  Briefcase,
  ShieldAlert,
  Terminal,
  FileCheck2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Search,
} from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      role: 'Freelance Penetration Tester & Security Researcher',
      company: 'Independent Engagements & TermJobs Client Assessments',
      location: 'Remote / Hybrid',
      period: '2023 — Present',
      badge: 'Active Engagement',
      summary: 'Conducting comprehensive threat assessments, network penetration tests, and vulnerability remediation across diverse target architectures.',
      bullets: [
        'Executed end-to-end black-box and gray-box penetration tests across web applications and enterprise internal networks, adhering strictly to PTES and OWASP testing standards.',
        'Identified high-severity vulnerabilities including Broken Access Controls (IDOR), SQL Injections, Server-Side Request Forgery (SSRF), and Cross-Site Scripting (XSS), assisting engineering teams with hotfixes.',
        'Audited Active Directory domain controllers, uncovering misconfigured ACLs, unconstrained delegation, and stale service accounts susceptible to Kerberoasting.',
        'Engineered custom Bash and Python automation scripts to streamline reconnaissance, port scanning, banner grabbing, and parameter fuzzing workflows.',
        'Authored executive and technical remediation reports detailing reproducible proof-of-concepts (PoCs), CVSS 3.1 severity scores, and risk mitigation strategies.',
      ],
      skills: ['Burp Suite Pro', 'Nmap', 'BloodHound', 'Metasploit', 'Python Scripting', 'OWASP Top 10', 'CVSS v3.1', 'Bash Automation'],
    },
    {
      role: 'Security Operations & Incident Response Analyst (Lab Engagements)',
      company: 'Threat Emulation & Detection Engineering',
      location: 'Remote',
      period: '2023 — 2024',
      badge: 'Blue Team Operations',
      summary: 'Designing SIEM ingestion pipelines, analyzing security telemetry, and building custom alert detection rules for enterprise workstations and domain controllers.',
      bullets: [
        'Configured Wazuh and Elastic Stack (ELK) SIEM pipelines to ingest and correlate Windows Event Logs, Sysmon telemetry, and Zeek network flow logs.',
        'Developed behavioral Sigma detection rules targeting Mimikatz memory scraping, PowerShell obfuscation, and suspicious Scheduled Task creation.',
        'Analyzed brute-force authentication floods and anomalous Kerberos ticket requests (TGS/TGT), establishing baseline thresholds to minimize false-positive alerts.',
        'Simulated realistic cyber attacks using Caldera and Atomic Red Team to validate SOC sensor coverage and alert delivery pipelines.',
      ],
      skills: ['Wazuh SIEM', 'Elasticsearch', 'Sysmon', 'Sigma Rules', 'Threat Hunting', 'Incident Triage', 'Zeek/Suricata'],
    },
  ];

  return (
    <div className="page-container page-experience animate-enter">
      {/* Page Header */}
      <div className="page-header-box">
        <div className="page-breadcrumb">
          <Link to="/" className="breadcrumb-link" onClick={() => sound.click()}>Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Experience</span>
        </div>
        <h1 className="page-main-title">
          <DecryptedText text="Professional Experience // Threat Operations" speed={24} />
        </h1>
        <p className="page-sub-title">
          Hands-on penetration testing engagements, red team threat emulation, and defensive incident response projects.
        </p>
      </div>

      <div className="experience-timeline">
        {experiences.map((exp, idx) => (
          <TiltedCard key={exp.role} className="card-module timeline-entry-card" maxTilt={6}>
            <div className="timeline-header-row">
              <div className="timeline-left-meta">
                <div className="role-icon-box">
                  <Briefcase size={20} className="text-purple" />
                </div>
                <div>
                  <h2 className="timeline-role">{exp.role}</h2>
                  <div className="timeline-company">
                    <span>{exp.company}</span>
                    <span className="dot-sep">&bull;</span>
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>
              <div className="timeline-right-meta">
                <span className="timeline-period-badge">{exp.period}</span>
                <span className="timeline-tag-chip">{exp.badge}</span>
              </div>
            </div>

            <p className="timeline-summary-text">{exp.summary}</p>

            <div className="timeline-bullets-box">
              <div className="box-subheading">Key Deliverables &amp; Technical Highlights</div>
              <ul className="timeline-bullet-list">
                {exp.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="timeline-bullet-item">
                    <CheckCircle2 size={16} className="bullet-check text-purple" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="timeline-skills-wrap">
              <span className="skills-label">Applied Toolset:</span>
              <div className="pills-wrap">
                {exp.skills.map((s) => (
                  <span key={s} className="pill-item rb-magnet">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </TiltedCard>
        ))}
      </div>

      {/* Bottom Nav Footer */}
      <div className="page-nav-footer">
        <Link to="/about" className="btn-control btn-secondary" onClick={() => sound.click()}>
          <ArrowLeft size={14} />
          <span>Previous: About &amp; Profile</span>
        </Link>
        <Link to="/projects" className="btn-control btn-primary" onClick={() => sound.click()}>
          <span>Next: Security Projects</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
