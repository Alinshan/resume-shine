# Shine B John // Cybersecurity Portfolio (React & ReactBits)

A modern, multi-page portfolio and security dossier for **Shine B John** (Certified Ethical Hacker CEH Master v12, SOC Analyst & Penetration Tester).

Built with **React 19**, **Vite**, **React Router 7**, and the [React Bits](https://reactbits.dev/) design system.

---

## 🧭 Multi-Page Architecture

Each category is separated into its own modular React page component:

- **Landing Page (`src/pages/Home.jsx`)**: Executive header, moniker avatar, status chips, contact bar, punchy elevator pitch, and 3D interactive directory showcase cards.
- **Executive Dossier (`src/pages/About.jsx`)**: Comprehensive background, technical focus areas, formal BCA education, and global TryHackMe honors.
- **Professional Experience (`src/pages/Experience.jsx`)**: Penetration testing engagements, offensive scope of work, key deliverables, and applied toolsets.
- **Security Projects (`src/pages/Projects.jsx`)**: Active Directory Attack & Defense Lab, Automated SOC/SIEM Telemetry Pipeline, and Android Frida Pentesting.
- **Skills & Certifications (`src/pages/Skills.jsx`)**: CEH Master v12, TCM Practical Ethical Hacking, and categorized TrueFocus skill filters.
- **Security Terminal Sandbox (`src/pages/TerminalLab.jsx`)**: Interactive Kali Linux simulation runner with scenarios (Active Directory, SOC/SIEM, Mobile Pentest) + live TryHackMe benchmark counters.

---

## ✨ Features & Micro-Interactions

- **Full Dark & Light Theme Parity**: High-contrast, saturated colors in both modes via ReactBits squish switch.
- **ClickSpark Burst Engine**: Dynamic multi-angle canvas sparks on pointer clicks.
- **Electric Orbiting BorderBeam**: Rotating laser perimeter border (`@property --border-angle`).
- **3D TiltedCard**: Real-time perspective tracking with dynamic specular glare.
- **Constellation Particle Web**: Canvas particles with cursor repulsion and laser links.
- **DecryptedText Cipher**: Cyberpunk scramble text animation on headings.
- **CountUp Numbers**: Numerical interpolation for platform metrics.
- **TrueFocus Pills**: Contextual focus highlighting on skill badges.
- **Web Audio Micro-Sounds**: Synthesizer audio feedback for clicks, toggles, and simulation runs.
- **macOS Floating Action Dock**: Quick navigation, theme switch, sound toggle, email copy, and scroll-to-top.

---

## 🛠️ Local Development

```bash
# Install dependencies
pnpm install

# Run local dev server with HMR
pnpm dev

# Build for production
pnpm build
```

