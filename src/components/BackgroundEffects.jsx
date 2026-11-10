import React, { useEffect, useRef } from 'react';
import { sound } from '../utils/sound';

export default function BackgroundEffects({ theme }) {
  const sparkCanvasRef = useRef(null);
  const particleCanvasRef = useRef(null);
  const cursorBlobRef = useRef(null);

  // 1. ClickSpark Engine
  useEffect(() => {
    const canvas = sparkCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const sparks = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function spawnSparks(x, y) {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const colors = isLight
        ? ['#7c3aed', '#4f46e5', '#059669', '#d97706', '#0284c7', '#ec4899']
        : ['#c084fc', '#818cf8', '#22d3ee', '#4df5c2', '#ffffff', '#e0d7ff'];

      const count = 12;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.45;
        const speed = Math.random() * 3.8 + 2.0;
        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          length: Math.random() * 11 + 6,
          width: Math.random() * 1.8 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.038 + 0.024,
          gravity: 0.12,
        });
      }
    }

    const onPointerDown = (e) => {
      // Don't trigger on interactive input fields
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      spawnSparks(e.clientX, e.clientY);
      sound.spark();
    };

    window.addEventListener('pointerdown', onPointerDown);

    function animate() {
      if (sparks.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          s.x += s.vx;
          s.y += s.vy;
          s.vy += s.gravity;
          s.alpha -= s.decay;

          if (s.alpha <= 0) {
            sparks.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.vx * 2, s.y - s.vy * 2);
          ctx.strokeStyle = s.color;
          ctx.globalAlpha = Math.max(0, s.alpha);
          ctx.lineWidth = s.width;
          ctx.lineCap = 'round';
          ctx.stroke();
          ctx.restore();
        }
      }
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointerdown', onPointerDown);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 2. Interactive Constellation Particle Web
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const COUNT = 58;
    const PALETTE = ['#7c3aed', '#818cf8', '#c084fc', '#22d3ee', '#a78bfa', '#6366f1'];
    const mousePos = { x: -9999, y: -9999 };

    const onMouseMove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    const onMouseLeave = () => {
      mousePos.x = -9999;
      mousePos.y = -9999;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.6,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      alpha: Math.random() * 0.45 + 0.15,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    }));

    function hexToRgb(hex) {
      return [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
      ].join(',');
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const lineMaxAlpha = isLight ? 0.12 : 0.08;
      const lineRgb = isLight ? '124,58,237' : '139,92,246';

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${lineRgb},${lineMaxAlpha * (1 - dist / 130)})`;
            ctx.lineWidth = isLight ? 0.8 : 0.6;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        // Cursor proximity repulsion & tether
        const mdx = p.x - mousePos.x;
        const mdy = p.y - mousePos.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 100 && mdist > 0) {
          const force = ((100 - mdist) / 100) * 1.8;
          p.x += (mdx / mdist) * force;
          p.y += (mdy / mdist) * force;

          ctx.beginPath();
          ctx.moveTo(mousePos.x, mousePos.y);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(${lineRgb},${lineMaxAlpha * 1.6 * (1 - mdist / 100)})`;
          ctx.lineWidth = isLight ? 0.9 : 0.7;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(p.color)},${p.alpha})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
      });

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, []);

  // 3. Cursor Glow Follower
  useEffect(() => {
    const blob = cursorBlobRef.current;
    if (!blob) return;
    let curX = -999, curY = -999, targetX = -999, targetY = -999;
    let rafId;

    const onPointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      blob.style.opacity = '1';
    };

    const onPointerLeave = () => {
      blob.style.opacity = '0';
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerleave', onPointerLeave);

    function loop() {
      if (curX === -999) {
        curX = targetX;
        curY = targetY;
      } else {
        curX += (targetX - curX) * 0.12;
        curY += (targetY - curY) * 0.12;
      }
      blob.style.left = `${curX}px`;
      blob.style.top = `${curY}px`;
      rafId = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="rb-cursor-blob" ref={cursorBlobRef} aria-hidden="true" />
      <canvas id="rb-particles" ref={particleCanvasRef} />
      <canvas id="rb-click-sparks" ref={sparkCanvasRef} />
      <div className="ambient-aurora" aria-hidden="true">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>
      <div className="ambient-grid" aria-hidden="true" />
      <div className="ambient-grain" aria-hidden="true" />
      <div className="ambient-spotlight" aria-hidden="true" />
    </>
  );
}
