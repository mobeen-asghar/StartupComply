/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
        'sans': ['Roboto', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Material Design 3 Color System
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3',
          600: '#1e88e5',
          700: '#1976d2', // Primary color
          800: '#1565c0',
          900: '#0d47a1',
        },
        secondary: {
          50: '#e8f5e8',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50',
          600: '#43a047',
          700: '#2e7d32', // Secondary color
          800: '#388e3c',
          900: '#1b5e20',
        },
        surface: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#eeeeee',
          300: '#e0e0e0',
          400: '#bdbdbd',
          500: '#9e9e9e',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
        // Semantic colors
        success: {
          50: '#e8f5e8',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50',
          600: '#43a047',
          700: '#388e3c',
          800: '#2e7d32',
          900: '#1b5e20',
        },
        warning: {
          50: '#fff8e1',
          100: '#ffecb3',
          200: '#ffe082',
          300: '#ffd54f',
          400: '#ffca28',
          500: '#ffc107',
          600: '#ffb300',
          700: '#ffa000',
          800: '#ff8f00',
          900: '#ff6f00',
        },
        error: {
          50: '#ffebee',
          100: '#ffcdd2',
          200: '#ef9a9a',
          300: '#e57373',
          400: '#ef5350',
          500: '#f44336',
          600: '#e53935',
          700: '#d32f2f',
          800: '#c62828',
          900: '#b71c1c',
        },
        // Material Design 3 semantic tokens
        'on-primary': '#ffffff',
        'on-secondary': '#ffffff',
        'on-surface': '#1c1b1f',
        'on-surface-variant': '#49454f',
        'outline': '#79747e',
        'outline-variant': '#cac4d0',
      },
      spacing: {
        // 8px grid system
        '0.5': '0.125rem', // 2px
        '1': '0.25rem',    // 4px
        '1.5': '0.375rem', // 6px
        '2': '0.5rem',     // 8px
        '2.5': '0.625rem', // 10px
        '3': '0.75rem',    // 12px
        '3.5': '0.875rem', // 14px
        '4': '1rem',       // 16px
        '5': '1.25rem',    // 20px
        '6': '1.5rem',     // 24px
        '7': '1.75rem',    // 28px
        '8': '2rem',       // 32px
        '9': '2.25rem',    // 36px
        '10': '2.5rem',    // 40px
        '11': '2.75rem',   // 44px
        '12': '3rem',      // 48px
        '14': '3.5rem',    // 56px
        '16': '4rem',      // 64px
        '20': '5rem',      // 80px
        '24': '6rem',      // 96px
        '28': '7rem',      // 112px
        '32': '8rem',      // 128px
        '36': '9rem',      // 144px
        '40': '10rem',     // 160px
        '44': '11rem',     // 176px
        '48': '12rem',     // 192px
        '52': '13rem',     // 208px
        '56': '14rem',     // 224px
        '60': '15rem',     // 240px
        '64': '16rem',     // 256px
        '72': '18rem',     // 288px
        '80': '20rem',     // 320px
        '96': '24rem',     // 384px
      },
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',   // 4px
        'DEFAULT': '0.375rem', // 6px
        'md': '0.375rem',  // 6px
        'lg': '0.5rem',    // 8px
        'xl': '0.75rem',   // 12px
        '2xl': '1rem',     // 16px
        '3xl': '1.5rem',   // 24px
        'full': '9999px',
      },
      boxShadow: {
        // Material Design elevation shadows
        'elevation-0': 'none',
        'elevation-1': '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        'elevation-2': '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
        'elevation-3': '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
        'elevation-4': '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        'elevation-6': '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
        'elevation-8': '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
        'elevation-12': '0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12)',
        'elevation-16': '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)',
        'elevation-24': '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 150ms ease-out',
        'slide-in': 'slideIn 200ms ease-out',
        'slide-up': 'slideUp 150ms ease-out',
        'scale-in': 'scaleIn 150ms ease-out',
        'ripple': 'ripple 200ms ease-out',
      },
      transitionTimingFunction: {
        'material': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        'material-decelerate': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
        'material-accelerate': 'cubic-bezier(0.4, 0.0, 1, 1)',
        'material-sharp': 'cubic-bezier(0.4, 0.0, 0.6, 1)',
      },
      transitionDuration: {
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
      },
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        // Material Design breakpoints
        'mobile': '600px',
        'tablet': '900px',
        'desktop': '1200px',
        // Touch device breakpoints
        'touch': { 'raw': '(hover: none) and (pointer: coarse)' },
        'no-touch': { 'raw': '(hover: hover) and (pointer: fine)' },
        // Reduced motion
        'reduce-motion': { 'raw': '(prefers-reduced-motion: reduce)' },
        'no-reduce-motion': { 'raw': '(prefers-reduced-motion: no-preference)' },
      },
      fontSize: {
        // Material Design Typography Scale
        'display-large': ['3.5625rem', { lineHeight: '4rem', fontWeight: '400' }],
        'display-medium': ['2.8125rem', { lineHeight: '3.25rem', fontWeight: '400' }],
        'display-small': ['2.25rem', { lineHeight: '2.75rem', fontWeight: '400' }],
        'headline-large': ['2rem', { lineHeight: '2.5rem', fontWeight: '400' }],
        'headline-medium': ['1.75rem', { lineHeight: '2.25rem', fontWeight: '400' }],
        'headline-small': ['1.5rem', { lineHeight: '2rem', fontWeight: '400' }],
        'title-large': ['1.375rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        'title-medium': ['1rem', { lineHeight: '1.5rem', fontWeight: '500' }],
        'title-small': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
        'label-large': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
        'label-medium': ['0.75rem', { lineHeight: '1rem', fontWeight: '500' }],
        'label-small': ['0.6875rem', { lineHeight: '1rem', fontWeight: '500' }],
        'body-large': ['1rem', { lineHeight: '1.5rem', fontWeight: '400' }],
        'body-medium': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '400' }],
        'body-small': ['0.75rem', { lineHeight: '1rem', fontWeight: '400' }],
      },
      opacity: {
        '4': '0.04',
        '8': '0.08',
        '12': '0.12',
        '16': '0.16',
        '38': '0.38',
      },
      zIndex: {
        'tooltip': '1000',
        'modal': '1050',
        'popover': '1060',
        'overlay': '1070',
        'max': '2147483647',
      },
    },
  },
  plugins: [
    // Custom plugin for Material Design utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Touch target utilities
        '.touch-target': {
          minHeight: '48px',
          minWidth: '48px',
        },
        '.touch-target-small': {
          minHeight: '40px',
          minWidth: '40px',
        },
        '.touch-target-large': {
          minHeight: '56px',
          minWidth: '56px',
        },
        // State layer utilities
        '.state-layer': {
          position: 'relative',
          overflow: 'hidden',
        },
        '.state-layer::before': {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'currentColor',
          opacity: '0',
          transition: 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
        },
        '.state-layer:hover::before': {
          opacity: '0.04',
        },
        '.state-layer:focus::before': {
          opacity: '0.12',
        },
        '.state-layer:active::before': {
          opacity: '0.16',
        },
        // Elevation utilities
        '.elevation-0': { boxShadow: 'none' },
        '.elevation-1': { boxShadow: theme('boxShadow.elevation-1') },
        '.elevation-2': { boxShadow: theme('boxShadow.elevation-2') },
        '.elevation-3': { boxShadow: theme('boxShadow.elevation-3') },
        '.elevation-4': { boxShadow: theme('boxShadow.elevation-4') },
        '.elevation-6': { boxShadow: theme('boxShadow.elevation-6') },
        '.elevation-8': { boxShadow: theme('boxShadow.elevation-8') },
        '.elevation-12': { boxShadow: theme('boxShadow.elevation-12') },
        '.elevation-16': { boxShadow: theme('boxShadow.elevation-16') },
        '.elevation-24': { boxShadow: theme('boxShadow.elevation-24') },
      };
      addUtilities(newUtilities);
    }
  ],
};