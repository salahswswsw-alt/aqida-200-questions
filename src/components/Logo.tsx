import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`logo-container ${className || ''}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" fill="var(--color-gold)"/>
        {/* Simple Islamic geometric star pattern inside the gold box */}
        <path d="M20 6L23.5 15.5L33 19L23.5 22.5L20 32L16.5 22.5L7 19L16.5 15.5L20 6Z" fill="#072f2a" />
        <circle cx="20" cy="19" r="3" fill="var(--color-gold)"/>
      </svg>
      <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-white)', letterSpacing: '-0.5px' }}>
        العقيدة
      </span>
    </div>
  );
};

export default Logo;
