import React from 'react';

export default function AbstractMap() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div 
        className="w-full h-full"
        style={{
          backgroundImage: 'radial-gradient(rgba(148, 163, 184, 0.8) 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
          backgroundPosition: '0 0',
          WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 80%)',
          maskImage: 'radial-gradient(circle at center, black 10%, transparent 80%)',
          opacity: 0.7
        }}
      />
    </div>
  );
}
