import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CheckSquare, FileText, Settings, Shield, Menu, Users, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import MaterialButton from '../UI/MaterialButton';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const navigationItems = [
  { path: '/dashboard', icon: Home, label: 'Dashboard', ariaLabel: 'Go to dashboard' },
  { path: '/checklists', icon: CheckSquare, label: 'Checklists', ariaLabel: 'View compliance checklists' },
  { path: '/templates', icon: FileText, label: 'Templates', ariaLabel: 'Browse document templates' },
  { path: '/team', icon: Users, label: 'Team', ariaLabel: 'Manage team members' },
  { path: '/reports', icon: BarChart3, label: 'Reports', ariaLabel: 'View reports and analytics' },
  { path: '/settings', icon: Settings, label: 'Settings', ariaLabel: 'Open settings' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { company } = useAuth();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-200 ease-in-out z-50 safe-area-top ${
          isOpen ? 'w-64' : 'w-16'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${
          !isOpen ? 'lg:w-16' : 'lg:w-64'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 min-h-[56px] sm:min-h-[64px]">
          <div className={`flex items-center space-x-3 transition-opacity duration-200 ${
            isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'
          }`}>
            <Shield className="w-8 h-8 text-blue-700" aria-hidden="true" />
            <span className="text-lg sm:text-xl font-medium text-gray-900">StartupComply</span>
          </div>
          
          <MaterialButton
            onClick={onToggle}
            variant="ghost"
            size="sm"
            className="hidden lg:flex touch-target"
            aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            <Menu className="w-5 h-5" />
          </MaterialButton>
        </div>

        {/* Navigation */}
        <nav className="p-3 sm:p-4 space-y-1 sm:space-y-2" role="menubar">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-2 sm:py-3 rounded-lg transition-all duration-200 ease-in-out relative group touch-target ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } ${!isOpen ? 'justify-center' : ''}`}
                role="menuitem"
                aria-label={item.ariaLabel}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <span className={`transition-opacity duration-200 ${
                  isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'
                }`}>
                  {item.label}
                </span>
                
                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="absolute left-14 sm:left-16 bg-gray-900 text-white px-2 py-1 rounded text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 pointer-events-none">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User info */}
        <div className={`absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 transition-opacity duration-200 safe-area-bottom ${
          isOpen ? 'opacity-100' : 'opacity-0 lg:opacity-0'
        }`}>
          <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
            <div className="text-xs sm:text-sm font-medium text-gray-900">
              {company?.name || 'My Company'}
            </div>
            <div className="text-xs text-gray-500">GDPR Compliance: 75%</div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;