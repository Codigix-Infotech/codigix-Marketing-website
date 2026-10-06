import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export default function Button({ href, variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent disabled:pointer-events-none disabled:opacity-50 px-6 py-3';

  const variants = {
    primary: 'bg-primary-accent text-white hover:bg-blue-700 shadow-sm',
    secondary: 'bg-secondary-accent text-white hover:bg-teal-700 shadow-sm',
    outline: 'border border-border bg-transparent hover:bg-secondary-bg text-primary-text',
  };

  const classes = `${baseClasses} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
