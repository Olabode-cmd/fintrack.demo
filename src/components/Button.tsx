import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'default', 
  size = 'md', 
  to, 
  onClick, 
  disabled = false,
  className = ''
}: ButtonProps) {
  const baseClasses = 'cursor-pointer inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    default: 'bg-[#34616F] text-black hover:bg-[#34616F]/90 focus:ring-[#34616F]',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-full',
    md: 'px-4 py-2 text-sm rounded-full',
    lg: 'px-6 py-3 text-base rounded-full'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (to) {
    return (
      <Link href={to} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}