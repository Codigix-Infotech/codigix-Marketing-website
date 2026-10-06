import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  src?: string;
}

const sizeMap = {
  sm: 100,
  md: 140,
  lg: 200,
  xl: 250,
};

export default function Logo({ className = '', size = 'md', src = '/logo.png' }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Codigix Infotech"
        width={sizeMap[size]}
        style={{ width: sizeMap[size], height: 'auto' }}
        className="object-contain"
      />
    </div>
  );
}
