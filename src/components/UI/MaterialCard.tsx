import React from 'react';
import { motion } from 'framer-motion';

interface MaterialCardProps {
  children: React.ReactNode;
  className?: string;
  elevation?: 0 | 1 | 2 | 3 | 4 | 6 | 8 | 12 | 16 | 24;
  hoverable?: boolean;
  onClick?: () => void;
  role?: string;
  ariaLabel?: string;
  variant?: 'elevated' | 'filled' | 'outlined';
}

const MaterialCard: React.FC<MaterialCardProps> = ({
  children,
  className = '',
  elevation = 1,
  hoverable = false,
  onClick,
  role,
  ariaLabel,
  variant = 'elevated',
}) => {
  const baseClasses = 'card-material bg-white rounded-lg transition-all duration-150 ease-material';
  
  const elevationClasses = {
    0: 'elevation-0',
    1: 'elevation-1',
    2: 'elevation-2',
    3: 'elevation-3',
    4: 'elevation-4',
    6: 'elevation-6',
    8: 'elevation-8',
    12: 'elevation-12',
    16: 'elevation-16',
    24: 'elevation-24',
  };

  const variantClasses = {
    elevated: elevationClasses[elevation],
    filled: 'bg-surface-100 elevation-0',
    outlined: 'border border-outline elevation-0',
  };

  const hoverClasses = hoverable 
    ? 'hover:elevation-4 cursor-pointer state-layer micro-interaction'
    : '';

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`;

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 16,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    hover: hoverable ? {
      y: -2,
      transition: {
        duration: 0.1,
        ease: [0.4, 0, 0.2, 1]
      }
    } : {},
    tap: hoverable ? {
      scale: 0.98,
      transition: {
        duration: 0.1,
        ease: [0.4, 0, 0.2, 1]
      }
    } : {}
  };

  return (
    <motion.div
      className={combinedClasses}
      onClick={onClick}
      role={role}
      aria-label={ariaLabel}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      layout
    >
      {children}
    </motion.div>
  );
};

export default MaterialCard;