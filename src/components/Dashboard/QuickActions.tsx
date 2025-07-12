import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Upload, FileText, Users, Settings, BarChart3 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { storageService } from '../../services/storageService';
import MaterialCard from '../UI/MaterialCard';
import MaterialButton from '../UI/MaterialButton';

const QuickActions: React.FC = () => {
  const { user } = useAuth();

  const handleCreateChecklist = () => {
    const newChecklist = {
      id: Date.now().toString(),
      title: 'New Compliance Checklist',
      description: 'Custom compliance checklist',
      category: 'Privacy',
      framework: 'Custom',
      priority: 'medium' as const,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    storageService.addChecklist(newChecklist);
    
    // Add activity
    storageService.addActivity({
      id: Date.now().toString(),
      action: 'Created new checklist',
      user: `${user?.firstName} ${user?.lastName}`,
      timestamp: new Date().toISOString(),
      type: 'checklist',
    });

    // Navigate to the new checklist
    window.location.href = `/checklists/${newChecklist.id}`;
  };

  const handleGenerateReport = () => {
    const report = storageService.generateReport('compliance', { dateRange: 'last30days' });
    
    // Add activity
    storageService.addActivity({
      id: Date.now().toString(),
      action: 'Generated compliance report',
      user: `${user?.firstName} ${user?.lastName}`,
      timestamp: new Date().toISOString(),
      type: 'system',
    });

    // Show success message
    alert(`Report "${report.title}" has been generated successfully!`);
  };

  const handleUploadDocument = () => {
    // Simulate file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx,.xlsx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Add activity
        storageService.addActivity({
          id: Date.now().toString(),
          action: `Uploaded document: ${file.name}`,
          user: `${user?.firstName} ${user?.lastName}`,
          timestamp: new Date().toISOString(),
          type: 'template',
        });

        alert(`Document "${file.name}" uploaded successfully!`);
      }
    };
    input.click();
  };

  const actions = [
    {
      title: 'New Checklist',
      description: 'Create a custom compliance checklist',
      icon: Plus,
      action: handleCreateChecklist,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      title: 'Upload Document',
      description: 'Add compliance documents',
      icon: Upload,
      action: handleUploadDocument,
      color: 'bg-green-100 text-green-700',
    },
    {
      title: 'Generate Report',
      description: 'Create compliance reports',
      icon: BarChart3,
      action: handleGenerateReport,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      title: 'Browse Templates',
      description: 'Explore document templates',
      icon: FileText,
      link: '/templates',
      color: 'bg-orange-100 text-orange-700',
    },
    {
      title: 'Team Management',
      description: 'Manage team members',
      icon: Users,
      link: '/team',
      color: 'bg-indigo-100 text-indigo-700',
    },
    {
      title: 'Settings',
      description: 'Configure your account',
      icon: Settings,
      link: '/settings',
      color: 'bg-gray-100 text-gray-700',
    },
  ];

  return (
    <MaterialCard className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const content = (
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{action.title}</p>
                <p className="text-xs text-gray-600">{action.description}</p>
              </div>
            </div>
          );

          if (action.link) {
            return (
              <Link key={index} to={action.link}>
                {content}
              </Link>
            );
          }

          return (
            <div key={index} onClick={action.action}>
              {content}
            </div>
          );
        })}
      </div>
    </MaterialCard>
  );
};

export default QuickActions;