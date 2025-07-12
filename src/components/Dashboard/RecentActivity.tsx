import React from 'react';
import { CheckCircle, FileText, Upload, UserCheck } from 'lucide-react';
import { storageService } from '../../services/storageService';
import MaterialCard from '../UI/MaterialCard';

const getTimeAgo = (timestamp: string) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays} days ago`;
  
  return time.toLocaleDateString();
};

const RecentActivity: React.FC = () => {
  const activities = storageService.getActivities().slice(0, 4); // Show only recent 4 activities
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'checklist': return CheckCircle;
      case 'template': return FileText;
      case 'task': return UserCheck;
      case 'system': return Upload;
      default: return CheckCircle;
    }
  };
  
  const getActivityColor = (type: string) => {
    switch (type) {
      case 'checklist': return 'text-green-600';
      case 'template': return 'text-purple-600';
      case 'task': return 'text-orange-600';
      case 'system': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <MaterialCard className="p-6">
      <h2 className="text-xl font-medium text-gray-900 mb-6">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.length > 0 ? activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          const color = getActivityColor(activity.type);
          return (
            <div key={index} className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-gray-50`}>
                <Icon className={`w-4 h-4 ${color}`} aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>by {activity.user}</span>
                  <span>•</span>
                  <span>{getTimeAgo(activity.timestamp)}</span>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No recent activity to display.</p>
          </div>
        )}
      </div>
    </MaterialCard>
  );
};

export default RecentActivity;