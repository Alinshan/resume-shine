import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DecryptedText from '../components/DecryptedText';
import CountUp from '../components/CountUp';
import TiltedCard from '../components/TiltedCard';
import { sound } from '../utils/sound';
import {
  Terminal,
  Play,
  RotateCcw,
  Copy,
  Check,
  Flame,
  Award,
  Globe,
  Server,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

export default function TerminalLab({ showToast }) {
  const [activeTab, setActiveTab] = useState('ad');
  const [simLines, setSimLines] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const scenarios = {
    ad: {
      title: 'Active Directory Exploitation',
      cmd: "python3 bloodhound.py -d corp.local -u 'sjohn' -p 'P@ssw0rd123' -c All --zip",
      initialLogs: [
        { text: '[*] Connecting to LDAP server: ldap://dc01.corp.local:389', cls: 'term-dim' },
        { text: '[+] Authenticated successfully as corp.local\\sjohn', cls: 'term-green' },
        { text: '[*] Enumerating 1,482 Domain Users, 324 Computers, 87 Security Groups...', cls: 'term-info' },
        { text: '[!] Detected Kerberoastable SPN: MSSQLSvc/sql01.corp.local:1433 (svc_sql)', cls: 'term-warn' },
        { text: '[!] AS-REP Roastable account identified: corp.local\\svc_backup (DoNotRequirePreAuth)', cls: 'term-warn' },
        { text: '[+] Mapped unconstrained delegation path: DEV-WKS-04 -> DC01.CORP.LOCAL', cls: 'term-purple' },
        { text: '[+] BloodHound JSON telemetry exported: 20261110_bloodhound.zip [SHA256: 9f8a...]', cls: 'term-green' },
      ],
    },
    soc: {
      title: 'SOC / SIEM Threat Triage',
      cmd: 'wazuh-logtest -q < /var/log/suricata/eve.json | jq .alert',
      initialLogs: [
        { text: '[*] Ingesting real-time Suricata IDS network stream...', cls: 'term-dim' },
        { text: '[ALERT: LEVEL 12] ET EXPLOIT Cobalt Strike Beacon Malleable C2 Profile Match', cls: 'term-danger' },
        { text: '[+] Source IP: 192.168.1.144:49821 -> Dest C2: 185.220.101.5:443', cls: 'term-info' },
        { text: '[*] Triggering automated Sysmon Event correlation on host WKSTN-09...', cls: 'term-dim' },
        { text: '[!] Found suspicious parent process: powershell.exe spawned from rundll32.exe', cls: 'term-warn' },
        { text: '[+] Auto-containment triggered: Host WKSTN-09 network isolated via Wazuh Active Response', cls: 'term-green' },
        { text: '[+] Incident ticket INC-94821 dispatched to SOC Queue [Tier 2 Escalation]', cls: 'term-purple' },
      ],
    },
    mobile: {
      title: 'Android Frida Dynamic Instrumentation',
      cmd: 'frida -U -f com.securebank.app -l ./scripts/bypass_ssl_root.js --no-pause',
      initialLogs: [
        { text: '[*] Spawning com.securebank.app on Android Test Device (Pixel 7 / Android 14)...', cls: 'term-dim' },
        { text: '[+] Attached Frida runtime engine PID: 1892', cls: 'term-green' },
        { text: '[*] Hooking TrustManagerImpl.verifyChain() & X509TrustManager...', cls: 'term-info' },
        { text: '[+] SSL Pinning successfully bypassed. Intercepting encrypted HTTPS traffic in Burp Suite', cls: 'term-green' },
        { text: '[*] Intercepting Rootbeer root-detection checks: isRooted(), checkSuExists()...', cls: 'term-dim' },
        { text: '[+] Method overridden: isRooted() returning false [Tamper Flag Cleared]', cls: 'term-purple' },
        { text: '[+] Target app running in fully instrumented memory space. Ready for API fuzzing.', cls: 'term-green' },
      ],
    },
  };

  const currentScenario = scenarios[activeTab];

  const runSimulation = (tabKey = activeTab) => {
    sound.laser();
    setIsRunning(true);
    setSimLines([]);
    const logs = scenarios[tabKey].initialLogs;

    logs.forEach((log, idx) => {
      setTimeout(() => {
        setSimLines((prev) => [...prev, log]);
        if (idx === logs.length - 1) {
          setIsRunning(false);
          sound.chime();
          showToast(`Simulation completed: ${scenarios[tabKey].title}`);
        }
      }, (idx + 1) * 110);
    });
  };

  useEffect(() => {
    runSimulation(activeTab);
  }, [activeTab]);

  const handleTabChange = (key) => {
    sound.tab();
    setActiveTab(key);
  };

  const handleCopyCmd = () => {
    navigator.clipboard?.writeText(currentScenario.cmd);
    sound.chime();
    setCopied(true);
    showToast('Command copied to clipboard! 📋');
    setTimeout(() => setCopied(false), 2000);
  };

  const metrics = [
    { label: 'TryHackMe Rooms', target: 270, suffix: '+', sub: 'Completed CTFs & Labs', icon: <Server size={18} className="text-purple" /> },
    { label: 'Continuous Streak', target: 418, suffix: ' Days', sub: 'Active Daily Research', icon: <Flame size={18} className="text-amber" /> },
    { label: 'Platform Level', target: 31, suffix: '', sub: 'Master Rank Tier', icon: <Award size={18} className="text-emerald" /> },
    { label: 'Global Ranking', target: 262, prefix: '#', sub: 'Top 1% Worldwide', icon: <Globe size={18} className="text-cyan" /> },
  ];

  return (
    <div className="page-container page-terminal animate-enter">
      {/* Page Header */}
      <div className="page-header-box">
        <div className="page-breadcrumb">
          <Link to="/" className="breadcrumb-link" onClick={() => sound.click()}>Home</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Terminal Lab</span>
        </div>
        <h1 className="page-main-title">
          <DecryptedText text="Security Sandbox &amp; Benchmarks" speed={24} />
        </h1>
        <p className="page-sub-title">
          Interactive offensive and defensive simulation terminal alongside verified TryHackMe competitive platform metrics.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="metrics-grid mb-8">
        {metrics.map((m) => (
          <TiltedCard key={m.label} className="card-module metric-card" maxTilt={6}>
            <div className="metric-icon-row">
              <span className="metric-icon-wrap">{m.icon}</span>
              <span className="metric-tag">TryHackMe</span>
            </div>
            <div className="metric-value-wrap">
              <span className="metric-number">
                <CountUp end={m.target} prefix={m.prefix || ''} suffix={m.suffix || ''} />
              </span>
            </div>
            <div className="metric-label">{m.label}</div>
            <div className="metric-sub">{m.sub}</div>
          </TiltedCard>
        ))}
      </div>

      {/* Interactive Terminal Sandbox Card */}
      <div className="sec-terminal-card border-beam-card tilted-card">
        <div className="terminal-header">
          <div className="window-dots" aria-hidden="true">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>

          <div className="terminal-title">
            <span className="terminal-host">synxop@kali-lab</span>:
            <span className="terminal-path">~/security-research</span>
          </div>

          <div className="terminal-tabs">
            <button
              type="button"
              className={`terminal-tab ${activeTab === 'ad' ? 'is-active' : ''}`}
              onClick={() => handleTabChange('ad')}
            >
              Active Directory
            </button>
            <button
              type="button"
              className={`terminal-tab ${activeTab === 'soc' ? 'is-active' : ''}`}
              onClick={() => handleTabChange('soc')}
            >
              SIEM / SOC
            </button>
            <button
              type="button"
              className={`terminal-tab ${activeTab === 'mobile' ? 'is-active' : ''}`}
              onClick={() => handleTabChange('mobile')}
            >
              Mobile Pentest
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="terminal-body">
          <div className="term-line prompt-line">
            <span className="term-prompt">$</span>
            <span className="term-cmd">{currentScenario.cmd}</span>
            <button
              type="button"
              className="term-copy-btn"
              onClick={handleCopyCmd}
              title="Copy Command to Clipboard"
            >
              {copied ? <Check size={13} className="text-emerald" /> : <Copy size={13} />}
            </button>
          </div>

          {simLines.map((line, idx) => (
            <div key={idx} className={`term-line ${line.cls} term-log-entry`}>
              {line.text}
            </div>
          ))}

          {isRunning && (
            <div className="term-line term-dim flex items-center gap-2">
              <span className="term-spinner">⠋</span>
              <span>Executing payload stream...</span>
            </div>
          )}
        </div>

        {/* Terminal Footer */}
        <div className="terminal-footer">
          <div className="terminal-status-info">
            <span className="footer-status-dot" />
            <span>Target Scenario: <strong>{currentScenario.title}</strong></span>
          </div>

          <button
            type="button"
            className="btn-control btn-secondary rb-magnet run-sim-btn"
            onClick={() => runSimulation(activeTab)}
            disabled={isRunning}
          >
            {isRunning ? <RotateCcw size={13} className="animate-spin" /> : <Play size={13} />}
            <span>{isRunning ? 'Simulating...' : 'Run Attack Simulation'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Nav Footer */}
      <div className="page-nav-footer mt-10">
        <Link to="/skills" className="btn-control btn-secondary" onClick={() => sound.click()}>
          <ArrowLeft size={14} />
          <span>Previous: Skills &amp; Certs</span>
        </Link>
        <Link to="/" className="btn-control btn-primary" onClick={() => sound.click()}>
          <span>Back to Home</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

