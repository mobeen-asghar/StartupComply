import React from 'react';
import { CheckCircle, AlertTriangle, Clock, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { storageService } from '../../services/storageService';
import MaterialCard from '../UI/MaterialCard';
import ProgressBar from '../UI/ProgressBar';
import MaterialButton from '../UI/MaterialButton';
import ComplianceOverview from './ComplianceOverview';
import UpcomingTasks from './UpcomingTasks';
import RecentActivity from './RecentActivity';
import QuickActions from './QuickActions';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const checklists = storageService.getChecklists();
  
  // Calculate statistics from real data
  const totalItems = checklists.reduce((sum, checklist) => sum + checklist.items.length, 0);
  const completedItems = checklists.reduce((sum, checklist) => 
    sum + checklist.items.filter(item => item.completed).length, 0
  );
  const pendingItems = totalItems - completedItems;
  const overdueItems = checklists.reduce((sum, checklist) => 
    sum + checklist.items.filter(item => 
      !item.completed && item.dueDate && new Date(item.dueDate) < new Date()
    ).length, 0
  );
  const complianceScore = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const statsData = [
    {
      title: 'Active Compliance Items',
      value: totalItems.toString(),
      change: `${completedItems} completed`,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Pending Reviews',
      value: pendingItems.toString(),
      change: `${Math.round((pendingItems / totalItems) * 100) || 0}% remaining`,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Overdue Tasks',
      value: overdueItems.toString(),
      change: overdueItems > 0 ? 'Needs attention' : 'All on track',
      icon: AlertTriangle,
      color: overdueItems > 0 ? 'text-red-600' : 'text-green-600',
      bgColor: overdueItems > 0 ? 'bg-red-50' : 'bg-green-50',
    },
    {
      title: 'Compliance Score',
      value: `${complianceScore}%`,
      change: complianceScore >= 80 ? 'Excellent' : complianceScore >= 60 ? 'Good' : 'Needs work',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600">
          Welcome back, {user?.firstName}! Here's your compliance overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statsData.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <MaterialCard 
              key={index} 
              className="p-4 sm:p-6"
              elevation="low"
              hoverable
              role="article"
              ariaLabel={`${stat.title}: ${stat.value}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-xl sm:text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-2 sm:p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} aria-hidden="true" />
                </div>
              </div>
            </MaterialCard>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <ComplianceOverview />
          <RecentActivity />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6 sm:space-y-8">
          <UpcomingTasks />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;