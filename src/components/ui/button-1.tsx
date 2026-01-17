'use client';

import type { HTMLAttributes } from 'react';

interface GradientButtonProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  width?: string;
  height?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const GradientButton = ({
  children,
  width = '600px',
  height = '100px',
  className = '',
  onClick,
  disabled = false,
  ...props
}: GradientButtonProps) => {
  const commonGradientStyles = `
    relative rounded-[50px] cursor-pointer
    flex items-center justify-center
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div className="text-[#eee] text-center">
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        className={`
          ${commonGradientStyles}
          rotatingGradient
          ${className}
        `}
        style={{
          '--r': '0deg',
          ...(width === 'auto' ? {} : { minWidth: width }),
          height: height
        } as React.CSSProperties}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        aria-disabled={disabled}
        {...props}
      >
        <span className="relative z-10 text-[var(--color-text)] flex items-center justify-center label px-4 py-2">
          {children}
        </span>
      </div>
    </div>
  );
};

export default GradientButton;
