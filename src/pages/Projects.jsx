import React from 'react';
import { Link } from 'react-router-dom';
import DecryptedText from '../components/DecryptedText';
import TiltedCard from '../components/TiltedCard';
import { sound } from '../utils/sound';
import {
  FolderGit2,
  Server,
  Activity,
  Smartphone,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Terminal,
  ShieldCheck,
} from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'Enterprise Active Directory Attack & Defense Lab',
      category: 'INFRASTRUCTURE & RED TEAMING',
      icon: <Server size={22} className="text-purple" />,
      badge: 'Multi-Forest Architecture',
      description:
        'Engineered an enterprise-scale virtualized Active Directory environment spanning Windows Server 2022 domain controllers, cross-forest trusts, and joined workstations to model real-world offensive attack paths and defensive hardening controls.',
      highlights: [
        'Mapped complex domain object ACLs and hidden trust relationships utilizing BloodHound CE and SharpHound ingestors.',
        'Executed privilege escalation kill-chains including Kerberoasting (GetUserSPNs), AS-REP Roasting, and DCSync via Mimikatz to extract NTDS.dit hashes.',
        'Simulated lateral movement maneuvers via WinRM, Pass-the-Hash (Impacket psexec/wmiexec), and DCOM execution.',
        'Implemented defensive hardening including Tiered Administration models, Protected Users group policies, and Microsoft LAPS.',
      ],
      tags: ['Windows Server 2022', 'Active Directory', 'BloodHound', 'Mimikatz', 'Impacket', 'LAPS', 'PowerShell'],
    },
    {
      title: 'Automated SOC & SIEM Telemetry Pipeline',
      category: 'BLUE TEAM & DETECTION ENGINEERING',
      icon: <Activity size={22} className="text-emerald" />,
      badge: 'Production Telemetry',
      description:
        'Architected an end-to-end Security Operations Center pipeline running Wazuh SIEM, Elasticsearch, and Kibana to ingest, parse, and correlate endpoint and network security telemetry from distributed Linux and Windows sensors.',
      highlights: [
        'Configured Sysmon on Windows endpoints to capture high-fidelity telemetry on process creation (Event ID 1), network connections (Event ID 3), and DLL injection (Event ID 7).',
        'Authored and calibrated 25+ custom Sigma detection rules mapped to the MITRE ATT&CK framework for detecting living-off-the-land binaries (LOLBins).',
        'Integrated Zeek network monitor logs to inspect unencrypted HTTP traffic, DNS tunneling anomalies, and TLS fingerprint anomalies (JA3/JA4).',
        'Developed automated Python alert enrichment scripts that query VirusTotal and AbuseIPDB to dispatch high-priority incident triage summaries.',
      ],
      tags: ['Wazuh SIEM', 'Elasticsearch', 'Sysmon', 'Zeek', 'Sigma Rules', 'Python Automation', 'Docker'],
    },
    {
      title: 'Android Mobile Application Security Assessment Lab',
      category: 'MOBILE SECURITY & REVERSE ENGINEERING',
      icon: <Smartphone size={22} className="text-blue" />,
      badge: 'Dynamic Instrumentation',
      description:
        'Established a comprehensive mobile pentesting research environment using rooted Android emulators and physical test devices to uncover OWASP Mobile Top 10 vulnerabilities in production client APKs.',
      highlights: [
        'Developed custom Frida JavaScript hooks to intercept runtime method arguments and dynamically bypass commercial SSL pinning implementations (OkHttp, TrustManager).',
        'Defeated root-detection mechanisms (Rootbeer, SafetyNet checks) to execute arbitrary memory tampering inside sensitive financial applications.',
        'Decompiled and audited Android applications using Jadx-GUI, identifying insecure shared preferences, hardcoded API secret keys, and exported broadcast receivers.',
        'Configured Burp Suite Pro transparent proxying with custom CA installation to intercept and manipulate REST/GraphQL mobile API traffic.',
      ],
      tags: ['Android Pentest', 'Frida Instrumentation', 'Objection', 'Jadx-GUI', 'Burp Suite Pro', 'OWASP Mobile Top 10', 'APKTool'],
    },
  ];

  return (
    <div className="page-container page-projects animate-enter">
      {/* Page Header */}
      <div className="page-header-box">
        <div className="page-breadcrumb">
          <Link to="/" className="breadcrumb-link" onClick={() => sound.click()}>Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Projects</span>
        </div>
        <h1 className="page-main-title">
          <DecryptedText text="Security Engineering &amp; Research Labs" speed={24} />
        </h1>
        <p className="page-sub-title">
          Production-grade infrastructure labs, threat detection pipelines, and reverse-engineering research environments.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((proj) => (
          <TiltedCard key={proj.title} className="card-module project-card" maxTilt={6}>
            <div className="project-top-row">
              <div className="project-icon-box">{proj.icon}</div>
              <div className="project-meta-col">
                <span className="project-cat-badge">{proj.category}</span>
                <h2 className="project-title">{proj.title}</h2>
              </div>
              <span className="project-status-chip">{proj.badge}</span>
            </div>

            <p className="project-desc-text">{proj.description}</p>

            <div className="project-highlights-box">
              <div className="box-subheading">Technical Implementations</div>
              <ul className="project-highlights-list">
                {proj.highlights.map((h, idx) => (
                  <li key={idx} className="project-highlight-item">
                    <CheckCircle2 size={16} className="text-purple bullet-icon" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="project-tags-wrap">
              {proj.tags.map((t) => (
                <span key={t} className="pill-item rb-magnet">
                  {t}
                </span>
              ))}
            </div>
          </TiltedCard>
        ))}
      </div>

      {/* Bottom Nav Footer */}
      <div className="page-nav-footer">
        <Link to="/experience" className="btn-control btn-secondary" onClick={() => sound.click()}>
          <ArrowLeft size={14} />
          <span>Previous: Experience</span>
        </Link>
        <Link to="/skills" className="btn-control btn-primary" onClick={() => sound.click()}>
          <span>Next: Skills &amp; Certifications</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
