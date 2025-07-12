import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-200 ease-in-out ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'
      }`}>
        <TopBar onMenuClick={toggleSidebar} />
        <main 
          className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto safe-area-bottom"
          role="main"
          aria-label="Main content"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;