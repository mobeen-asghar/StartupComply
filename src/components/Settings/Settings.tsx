import React, { useState } from 'react';
import MaterialCard from '../UI/MaterialCard';
import ProfileSettings from './ProfileSettings';
import CompanySettings from './CompanySettings';
import NotificationSettings from './NotificationSettings';
import SecuritySettings from './SecuritySettings';

const tabs = [
  { id: 'profile', label: 'Profile', component: ProfileSettings },
  { id: 'company', label: 'Company', component: CompanySettings },
  { id: 'notifications', label: 'Notifications', component: NotificationSettings },
  { id: 'security', label: 'Security', component: SecuritySettings },
];

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ProfileSettings;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-2">Settings</h1>
        <p className="text-sm sm:text-base text-gray-600">Manage your account and compliance preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* Tab Navigation */}
        <div className="lg:col-span-1">
          <MaterialCard className="p-4">
            <nav className="space-y-1" role="tablist" aria-label="Settings navigation">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-3 py-2 sm:py-3 rounded-lg text-sm font-medium transition-colors duration-200 touch-target ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                  aria-controls={`${tab.id}-panel`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </MaterialCard>
        </div>

        {/* Tab Content */}
        <div className="lg:col-span-3">
          <div
            id={`${activeTab}-panel`}
            role="tabpanel"
            aria-labelledby={`${activeTab}-tab`}
          >
            <ActiveComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;