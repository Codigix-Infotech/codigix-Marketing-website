"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'glow';
  className?: string;
}

export default function AnimatedButton({ children, href, onClick, variant = 'primary', className = '' }: AnimatedButtonProps) {
  const baseStyle = "inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold transition-colors relative overflow-hidden group";
  
  let variantStyle = "";
  if (variant === 'primary') {
    variantStyle = "bg-primary-text text-primary-bg hover:bg-gray-200";
  } else if (variant === 'outline') {
    variantStyle = "border border-white/20 text-white hover:bg-white/10";
  } else if (variant === 'glow') {
    variantStyle = "bg-primary-accent text-white shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:shadow-[0_0_40px_rgba(59,130,246,0.8)]";
  }

  const Component = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick };

  return (
    <Component 
      {...props}
      className={`${baseStyle} ${variantStyle} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      )}
    </Component>
  );
}
