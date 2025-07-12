import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MaterialButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const MaterialButton: React.FC<MaterialButtonProps> = ({
  children,
  onClick,
  variant = 'contained',
  size = 'medium',
  disabled = false,
  className = '',
  type = 'button',
  ariaLabel,
  startIcon,
  endIcon,
  fullWidth = false,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: currentColor;
      opacity: 0.3;
      pointer-events: none;
      transform: scale(0);
      animation: ripple-animation 0.2s ease-out;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
    `;

    // Add ripple keyframes if not already present
    if (!document.querySelector('#ripple-keyframes')) {
      const style = document.createElement('style');
      style.id = 'ripple-keyframes';
      style.textContent = `
        @keyframes ripple-animation {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 200);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      createRipple(event);
      onClick?.(event);
    }
  };

  const baseClasses = `
    btn-material touch-target state-layer
    relative inline-flex items-center justify-content-center
    font-roboto text-button
    border-0 rounded cursor-pointer
    transition-all duration-150 ease-material
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
    disabled:opacity-38 disabled:cursor-not-allowed disabled:pointer-events-none
    overflow-hidden
    ${fullWidth ? 'w-full' : ''}
  `;

  const variantClasses = {
    contained: 'btn-contained elevation-2 hover:elevation-4',
    outlined: 'btn-outlined',
    text: 'btn-text',
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm min-h-[40px]',
    medium: 'px-4 py-2 text-base min-h-[48px]',
    large: 'px-6 py-3 text-lg min-h-[56px]',
  };

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      aria-label={ariaLabel}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.1 }}
    >
      {startIcon && (
        <span className="mr-2 flex items-center justify-center">
          {startIcon}
        </span>
      )}
      <span className="relative z-10 flex items-center">
        {children}
      </span>
      {endIcon && (
        <span className="ml-2 flex items-center justify-center">
          {endIcon}
        </span>
      )}
    </motion.button>
  );
};

export default MaterialButton;