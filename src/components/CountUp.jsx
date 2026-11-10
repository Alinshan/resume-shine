import React, { useState, useEffect, useRef } from 'react';

export default function CountUp({ end, duration = 1400, suffix = '', prefix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !counted.current) {
          counted.current = true;
          const start = performance.now();
          const target = parseInt(end, 10);

          const frame = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);
            setVal(Math.floor(ease * target));
            if (progress < 1) {
              requestAnimationFrame(frame);
            } else {
              setVal(target);
            }
          };
          requestAnimationFrame(frame);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className="rb-countup">
      {prefix}{val}{suffix}
    </span>
  );
}

