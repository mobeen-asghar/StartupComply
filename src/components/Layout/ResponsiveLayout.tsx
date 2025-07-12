import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
  children,
  sidebar,
  header,
  footer,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const layoutVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const sidebarVariants = {
    closed: {
      x: '-100%',
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      x: 0,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.15,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-surface-50 flex flex-col"
      variants={layoutVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-700 focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      {/* Header */}
      {header && (
        <motion.header
          className="sticky top-0 z-40 elevation-2 bg-white safe-area-top"
          initial={{ y: -64 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          {header}
        </motion.header>
      )}

      <div className="flex flex-1 relative">
        {/* Sidebar */}
        {sidebar && (
          <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex md:flex-col md:w-64 md:bg-white md:elevation-1 md:relative md:z-30">
              {sidebar}
            </aside>

            {/* Mobile Sidebar */}
            <AnimatePresence>
              {isMobile && sidebarOpen && (
                <>
                  {/* Overlay */}
                  <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    variants={overlayVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    onClick={() => setSidebarOpen(false)}
                  />

                  {/* Mobile Sidebar */}
                  <motion.aside
                    className="fixed left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white elevation-16 z-50 md:hidden safe-area-top safe-area-bottom"
                    variants={sidebarVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    {sidebar}
                  </motion.aside>
                </>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Main Content */}
        <main
          id="main-content"
          className="flex-1 flex flex-col min-w-0 relative"
          role="main"
        >
          <div className="flex-1 container-responsive py-6 md:py-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Footer */}
      {footer && (
        <motion.footer
          className="bg-white elevation-2 safe-area-bottom"
          initial={{ y: 64 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          {footer}
        </motion.footer>
      )}

      {/* Mobile Menu Toggle (if sidebar exists) */}
      {sidebar && isMobile && (
        <motion.button
          className="fixed bottom-6 right-6 w-14 h-14 bg-primary-700 text-white rounded-full elevation-6 flex items-center justify-center z-30 md:hidden touch-target"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle navigation menu"
        >
          <motion.div
            animate={{ rotate: sidebarOpen ? 45 : 0 }}
            transition={{ duration: 0.15 }}
          >
            {sidebarOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </motion.div>
        </motion.button>
      )}
    </motion.div>
  );
};

export default ResponsiveLayout;