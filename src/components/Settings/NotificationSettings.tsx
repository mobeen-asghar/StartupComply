import React, { useState } from 'react';
import { Bell, Mail, Smartphone, AlertTriangle } from 'lucide-react';
import { storageService } from '../../services/storageService';
import MaterialCard from '../UI/MaterialCard';
import MaterialButton from '../UI/MaterialButton';

const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = useState(() => storageService.getNotificationSettings());
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      storageService.updateNotificationSettings(settings);
      setMessage('Notification settings updated successfully!');
    } catch (error) {
      setMessage('Error updating notification settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetToDefaults = () => {
    const defaultSettings = {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      taskReminders: true,
      deadlineAlerts: true,
      complianceUpdates: true,
      weeklyReports: true,
      immediateAlerts: true,
      dailyDigest: false,
    };
    setSettings(defaultSettings);
  };

  const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void; id: string; label: string; description: string }> = 
    ({ checked, onChange, id, label, description }) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div className="flex-1">
        <label htmlFor={id} className="text-sm font-medium text-gray-900 block">
          {label}
        </label>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        type="button"
        id={id}
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          checked ? 'bg-blue-600' : 'bg-gray-200'
        }`}
        role="switch"
        aria-checked={checked}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );

  return (
    <MaterialCard className="p-6">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center">
          <Bell className="w-10 h-10 text-purple-700" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-medium text-gray-900">Notification Settings</h2>
          <p className="text-gray-600">Configure how you receive compliance updates and alerts.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {message && (
          <div className={`p-4 rounded-lg ${
            message.includes('Error') 
              ? 'bg-red-50 border border-red-200 text-red-600' 
              : 'bg-green-50 border border-green-200 text-green-600'
          }`}>
            {message}
          </div>
        )}

        {/* Notification Channels */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Channels</h3>
          <div className="space-y-4">
            <ToggleSwitch
              id="emailNotifications"
              checked={settings.emailNotifications}
              onChange={() => handleToggle('emailNotifications')}
              label="Email Notifications"
              description="Receive notifications via email"
            />
            <ToggleSwitch
              id="pushNotifications"
              checked={settings.pushNotifications}
              onChange={() => handleToggle('pushNotifications')}
              label="Browser Push Notifications"
              description="Show desktop notifications in your browser"
            />
            <ToggleSwitch
              id="smsNotifications"
              checked={settings.smsNotifications}
              onChange={() => handleToggle('smsNotifications')}
              label="SMS Notifications"
              description="Receive critical alerts via text message"
            />
          </div>
        </div>

        {/* Compliance Alerts */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            <AlertTriangle className="w-5 h-5 inline mr-2" aria-hidden="true" />
            Compliance Alerts
          </h3>
          <div className="space-y-4">
            <ToggleSwitch
              id="taskReminders"
              checked={settings.taskReminders}
              onChange={() => handleToggle('taskReminders')}
              label="Task Reminders"
              description="Get reminded about upcoming compliance tasks"
            />
            <ToggleSwitch
              id="deadlineAlerts"
              checked={settings.deadlineAlerts}
              onChange={() => handleToggle('deadlineAlerts')}
              label="Deadline Alerts"
              description="Receive alerts for approaching deadlines"
            />
            <ToggleSwitch
              id="complianceUpdates"
              checked={settings.complianceUpdates}
              onChange={() => handleToggle('complianceUpdates')}
              label="Compliance Updates"
              description="Stay informed about regulatory changes"
            />
            <ToggleSwitch
              id="immediateAlerts"
              checked={settings.immediateAlerts}
              onChange={() => handleToggle('immediateAlerts')}
              label="Immediate Alerts"
              description="Get instant notifications for critical compliance issues"
            />
          </div>
        </div>

        {/* Reports and Summaries */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Reports & Summaries</h3>
          <div className="space-y-4">
            <ToggleSwitch
              id="weeklyReports"
              checked={settings.weeklyReports}
              onChange={() => handleToggle('weeklyReports')}
              label="Weekly Reports"
              description="Receive weekly compliance progress reports"
            />
            <ToggleSwitch
              id="dailyDigest"
              checked={settings.dailyDigest}
              onChange={() => handleToggle('dailyDigest')}
              label="Daily Digest"
              description="Get a daily summary of compliance activities"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <MaterialButton type="button" variant="outlined" onClick={handleResetToDefaults}>
            Reset to Defaults
          </MaterialButton>
          <MaterialButton type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Settings'}
          </MaterialButton>
        </div>
      </form>
    </MaterialCard>
  );
};

export default NotificationSettings;