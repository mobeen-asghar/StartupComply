import React from 'react';
import { Bell, Search, User, Menu, LogOut, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { storageService } from '../../services/storageService';
import MaterialButton from '../UI/MaterialButton';
import MaterialCard from '../UI/MaterialCard';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(() => storageService.getNotifications());
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      storageService.markNotificationAsRead(notification.id);
      setNotifications(storageService.getNotifications());
    }
    setShowNotifications(false);
  };

  const markAllAsRead = () => {
    storageService.markAllNotificationsAsRead();
    setNotifications(storageService.getNotifications());
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };
  return (
    <header 
      className="bg-white border-b border-gray-200 h-14 sm:h-16 flex items-center justify-between px-4 sm:px-6 shadow-sm safe-area-top"
      role="banner"
    >
      <div className="flex items-center space-x-4">
        <MaterialButton
          onClick={onMenuClick}
          variant="ghost"
          size="sm"
          className="lg:hidden touch-target"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </MaterialButton>
        
        <div className="relative" ref={searchRef}>
          <div className={`${showSearch ? 'flex' : 'hidden md:flex'} items-center bg-gray-100 rounded-full px-3 sm:px-4 py-2 w-64 lg:w-96`}>
            <Search className="w-4 h-4 text-gray-500 mr-2" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search compliance items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none text-xs sm:text-sm w-full"
              aria-label="Search compliance items"
            />
            {showSearch && (
              <MaterialButton
                variant="ghost"
                size="sm"
                onClick={() => setShowSearch(false)}
                className="md:hidden ml-2"
              >
                <X className="w-4 h-4" />
              </MaterialButton>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-1 sm:space-x-2">
        <MaterialButton
          variant="ghost"
          size="sm"
          onClick={() => setShowSearch(!showSearch)}
          className="md:hidden touch-target"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </MaterialButton>

        <div className="relative" ref={notificationRef}>
          <MaterialButton
            variant="ghost"
            size="sm"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative touch-target"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center pointer-events-none">
                {unreadCount}
              </span>
            )}
          </MaterialButton>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 max-w-[90vw] z-50">
              <MaterialCard className="p-0 max-h-96 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <MaterialButton
                      variant="text"
                      size="sm"
                      onClick={markAllAsRead}
                      className="text-xs"
                    >
                      Mark all read
                    </MaterialButton>
                  )}
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 last:border-b-0 cursor-pointer hover:bg-gray-50 ${
                          !notification.read ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="flex items-start space-x-3">
                          <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium text-gray-900 ${!notification.read ? 'font-semibold' : ''}`}>
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{getTimeAgo(notification.createdAt)}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No notifications</p>
                    </div>
                  )}
                </div>
              </MaterialCard>
            </div>
          )}
        </div>

        <MaterialButton
          onClick={handleLogout}
          variant="text"
          size="sm" 
          className="flex items-center space-x-1 sm:space-x-2 touch-target"
          aria-label="Logout"
        >
          <User className="w-4 h-4" />
          <span className="hidden sm:inline text-xs sm:text-sm">
            {user?.firstName} {user?.lastName}
          </span>
          <LogOut className="w-4 h-4" />
        </MaterialButton>
      </div>
    </header>
  );
};

export default TopBar;