import React, { useState } from 'react';
import { Shield, Key, Smartphone, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { storageService } from '../../services/storageService';
import MaterialCard from '../UI/MaterialCard';
import MaterialButton from '../UI/MaterialButton';

const SecuritySettings: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState(() => storageService.getSecuritySettings());
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSettingChange = (setting: keyof typeof settings, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      // In a real app, you'd verify the current password and update it
      if (user) {
        localStorage.setItem(`password_${user.id}`, passwordData.newPassword);
        setMessage('Password updated successfully!');
        setShowChangePassword(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        
        // Add activity
        storageService.addActivity({
          id: Date.now().toString(),
          action: 'Password changed',
          user: `${user.firstName} ${user.lastName}`,
          timestamp: new Date().toISOString(),
          type: 'system',
        });
      }
    } catch (error) {
      setMessage('Error updating password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecuritySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      storageService.updateSecuritySettings(settings);
      setMessage('Security settings updated successfully!');
    } catch (error) {
      setMessage('Error updating security settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetToDefaults = () => {
    const defaultSettings = {
      twoFactorEnabled: true,
      sessionTimeout: '30',
      loginNotifications: true,
      dataEncryption: true,
      accessLogging: true,
      passwordExpiry: '90',
    };
    setSettings(defaultSettings);
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('Error') 
            ? 'bg-red-50 border border-red-200 text-red-600' 
            : 'bg-green-50 border border-green-200 text-green-600'
        }`}>
          {message}
        </div>
      )}

      {/* Password Management */}
      <MaterialCard className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <Key className="w-6 h-6 text-red-700" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Password Management</h3>
            <p className="text-gray-600">Manage your account password and security preferences.</p>
          </div>
        </div>

        {!showChangePassword ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Last changed: 30 days ago</p>
              <p className="text-sm text-gray-500">Password strength: Strong</p>
            </div>
            <MaterialButton onClick={() => setShowChangePassword(true)}>
              Change Password
            </MaterialButton>
          </div>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex space-x-4">
              <MaterialButton type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Password'}
              </MaterialButton>
              <MaterialButton 
                type="button" 
                variant="outlined" 
                onClick={() => setShowChangePassword(false)}
              >
                Cancel
              </MaterialButton>
            </div>
          </form>
        )}
      </MaterialCard>

      {/* Security Settings */}
      <MaterialCard className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-blue-700" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
            <p className="text-gray-600">Configure additional security measures for your account.</p>
          </div>
        </div>

        <form onSubmit={handleSecuritySubmit} className="space-y-6">
          {/* Two-Factor Authentication */}
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <Smartphone className="w-5 h-5 text-gray-500 mr-3" aria-hidden="true" />
              <div>
                <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleSettingChange('twoFactorEnabled', !settings.twoFactorEnabled)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                settings.twoFactorEnabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
              role="switch"
              aria-checked={settings.twoFactorEnabled}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  settings.twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Session Timeout */}
          <div>
            <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout (minutes)
            </label>
            <select
              id="sessionTimeout"
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="120">2 hours</option>
              <option value="480">8 hours</option>
            </select>
          </div>

          {/* Additional Security Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Login Notifications</p>
                <p className="text-sm text-gray-600">Get notified of new login attempts</p>
              </div>
              <button
                type="button"
                onClick={() => handleSettingChange('loginNotifications', !settings.loginNotifications)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.loginNotifications ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={settings.loginNotifications}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.loginNotifications ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-900">Access Logging</p>
                <p className="text-sm text-gray-600">Keep detailed logs of account access</p>
              </div>
              <button
                type="button"
                onClick={() => handleSettingChange('accessLogging', !settings.accessLogging)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  settings.accessLogging ? 'bg-blue-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={settings.accessLogging}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.accessLogging ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <MaterialButton type="button" variant="outlined" onClick={handleResetToDefaults}>
              Reset to Defaults
            </MaterialButton>
            <MaterialButton type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Security Settings'}
            </MaterialButton>
          </div>
        </form>
      </MaterialCard>

      {/* Security Status */}
      <MaterialCard className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <AlertCircle className="w-6 h-6 text-green-600" aria-hidden="true" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">Security Status</h3>
            <p className="text-green-600 text-sm">Your account security is strong</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Password Strength:</span>
            <span className="font-medium text-green-600">Strong</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">2FA Status:</span>
            <span className={`font-medium ${settings.twoFactorEnabled ? 'text-green-600' : 'text-red-600'}`}>
              {settings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Login:</span>
            <span className="font-medium text-gray-900">
              {user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Active Sessions:</span>
            <span className="font-medium text-gray-900">2</span>
          </div>
        </div>
      </MaterialCard>
    </div>
  );
};

export default SecuritySettings;