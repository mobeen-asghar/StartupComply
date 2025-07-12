import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface MaterialInputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
  maxLength?: number;
  autoComplete?: string;
  id?: string;
}

const MaterialInput: React.FC<MaterialInputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = ' ',
  disabled = false,
  error,
  helperText,
  required = false,
  className = '',
  startIcon,
  endIcon,
  multiline = false,
  rows = 3,
  maxLength,
  autoComplete,
  id,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const hasValue = value.length > 0;
  const isLabelFloating = isFocused || hasValue;
  const hasError = Boolean(error);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const inputClasses = `
    w-full px-4 py-3 text-base font-roboto
    bg-transparent border border-outline rounded-lg
    transition-all duration-150 ease-material
    focus:outline-none focus:border-2 focus:border-primary-700
    disabled:opacity-38 disabled:cursor-not-allowed
    ${startIcon ? 'pl-12' : ''}
    ${endIcon ? 'pr-12' : ''}
    ${hasError ? 'border-error-500 focus:border-error-500' : ''}
    ${className}
  `;

  const labelClasses = `
    absolute left-4 pointer-events-none
    font-roboto transition-all duration-150 ease-material
    ${isLabelFloating 
      ? 'top-0 text-xs bg-white px-1 -translate-y-1/2' 
      : 'top-1/2 text-base -translate-y-1/2'
    }
    ${isFocused 
      ? hasError ? 'text-error-500' : 'text-primary-700'
      : hasError ? 'text-error-500' : 'text-on-surface-variant'
    }
    ${startIcon && !isLabelFloating ? 'left-12' : ''}
  `;

  const containerClasses = `
    input-material relative mb-4
    ${disabled ? 'opacity-38' : ''}
  `;

  const InputComponent = multiline ? 'textarea' : 'input';

  return (
    <div className={containerClasses}>
      <div className="relative">
        {startIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            {startIcon}
          </div>
        )}
        
        <InputComponent
          ref={inputRef as any}
          id={id}
          type={multiline ? undefined : type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          maxLength={maxLength}
          autoComplete={autoComplete}
          rows={multiline ? rows : undefined}
          className={inputClasses}
          aria-describedby={
            error ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          aria-invalid={hasError}
        />

        <motion.label
          htmlFor={id}
          className={labelClasses}
          animate={{
            y: isLabelFloating ? '-50%' : '-50%',
            scale: isLabelFloating ? 0.75 : 1,
          }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </motion.label>

        {endIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            {endIcon}
          </div>
        )}
      </div>

      {(error || helperText) && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className={`mt-1 text-xs font-roboto ${
            error ? 'text-error-500' : 'text-on-surface-variant'
          }`}
          id={error ? `${id}-error` : `${id}-helper`}
        >
          {error || helperText}
        </motion.div>
      )}
    </div>
  );
};

export default MaterialInput;