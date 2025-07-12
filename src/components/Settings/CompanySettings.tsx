import React, { useState } from 'react';
import { Building, Globe, Users, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import MaterialCard from '../UI/MaterialCard';
import MaterialButton from '../UI/MaterialButton';

const CompanySettings: React.FC = () => {
  const { company, updateCompany, user } = useAuth();
  const [formData, setFormData] = useState({
    name: company?.name || 'My Company',
    industry: company?.industry || 'Technology',
    employeeCount: company?.employeeCount || '1-10',
    website: company?.website || '',
    address: company?.address || '',
    city: company?.city || '',
    state: company?.state || '',
    zipCode: company?.zipCode || '',
    country: company?.country || 'United States',
    primaryContact: company?.primaryContact || `${user?.firstName} ${user?.lastName}`,
    complianceOfficer: company?.complianceOfficer || `${user?.firstName} ${user?.lastName}`,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      updateCompany(formData);
      setMessage('Company settings updated successfully!');
    } catch (error) {
      setMessage('Error updating company settings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MaterialCard className="p-6">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <Building className="w-10 h-10 text-green-700" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-medium text-gray-900">Company Settings</h2>
          <p className="text-gray-600">Manage your organization's information and compliance settings.</p>
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

        {/* Company Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Retail">Retail</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="employeeCount" className="block text-sm font-medium text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-1" aria-hidden="true" />
                Employee Count
              </label>
              <select
                id="employeeCount"
                name="employeeCount"
                value={formData.employeeCount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="1-10">1-10</option>
                <option value="11-50">11-50</option>
                <option value="50-100">50-100</option>
                <option value="101-500">101-500</option>
                <option value="500+">500+</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                <Globe className="w-4 h-4 inline mr-1" aria-hidden="true" />
                Website
              </label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Street Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                State/Province
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Compliance Contacts */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            <Shield className="w-5 h-5 inline mr-2" aria-hidden="true" />
            Compliance Contacts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="primaryContact" className="block text-sm font-medium text-gray-700 mb-2">
                Primary Contact
              </label>
              <input
                type="text"
                id="primaryContact"
                name="primaryContact"
                value={formData.primaryContact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="complianceOfficer" className="block text-sm font-medium text-gray-700 mb-2">
                Compliance Officer
              </label>
              <input
                type="text"
                id="complianceOfficer"
                name="complianceOfficer"
                value={formData.complianceOfficer}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <MaterialButton 
            type="button" 
            variant="outlined"
            onClick={() => setFormData({
              name: company?.name || 'My Company',
              industry: company?.industry || 'Technology',
              employeeCount: company?.employeeCount || '1-10',
              website: company?.website || '',
              address: company?.address || '',
              city: company?.city || '',
              state: company?.state || '',
              zipCode: company?.zipCode || '',
              country: company?.country || 'United States',
              primaryContact: company?.primaryContact || `${user?.firstName} ${user?.lastName}`,
              complianceOfficer: company?.complianceOfficer || `${user?.firstName} ${user?.lastName}`,
            })}
          >
            Cancel
          </MaterialButton>
          <MaterialButton type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Changes'}
          </MaterialButton>
        </div>
      </form>
    </MaterialCard>
  );
};

export default CompanySettings;