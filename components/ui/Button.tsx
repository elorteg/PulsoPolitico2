import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  children: React.ReactNode;
}

export function Button({ variant = 'default', children, ...props }: ButtonProps) {
  const baseClasses = 'px-4 py-2 rounded ';
  const variantClasses = variant === 'outline' ? 'border border-gray-300' : 'bg-blue-600 text-white';

  return (
    <button className={baseClasses + variantClasses} {...props}>
      {children}
    </button>
  );
}
