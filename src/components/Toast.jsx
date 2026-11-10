import React from 'react';

export default function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className={`rb-toast ${toast.visible ? 'is-visible' : ''}`} aria-live="polite">
      <span>✨</span>
      <span>{toast.message}</span>
    </div>
  );
}
