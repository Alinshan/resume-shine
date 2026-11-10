import React, { useState, useEffect, useRef } from 'react';
import { sound } from '../utils/sound';

const CIPHER_CHARS = 'ABCDEF0123456789!@#$%&*<>[]{}~';

export default function DecryptedText({ text, speed = 28, className = '', as = 'span', onHover = true }) {
  const [displayText, setDisplayText] = useState(text);
  const isScramblingRef = useRef(false);
  const Component = as;

  const scramble = () => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;
    let step = 0;
    const total = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, idx) => {
            if (char === ' ' || char === '•' || char === '—' || char === '/') return char;
            if (idx < step) return text[idx];
            return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
          })
          .join('')
      );
      step += 0.85;
      if (step >= total) {
        clearInterval(interval);
        setDisplayText(text);
        isScramblingRef.current = false;
      }
    }, speed);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scramble();
    }, 150);
    return () => clearTimeout(timer);
  }, [text]);

  const handleMouseEnter = () => {
    if (onHover) {
      sound.click();
      scramble();
    }
  };

  return (
    <Component className={className} onMouseEnter={handleMouseEnter}>
      {displayText}
    </Component>
  );
}
