import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, CheckCircle, AlertTriangle } from 'lucide-react';
import MaterialCard from '../UI/MaterialCard';
import ProgressBar from '../UI/ProgressBar';
import MaterialButton from '../UI/MaterialButton';

interface ChecklistData {
  id: string;
  title: string;
  description: string;
  progress: number;
  totalItems: number;
  completedItems: number;
  category: string;
  priority: string;
  dueDate: string;
}

interface ChecklistCardProps {
  checklist: ChecklistData;
}

const ChecklistCard: React.FC<ChecklistCardProps> = ({ checklist }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'success';
    if (progress >= 50) return 'primary';
    return 'warning';
  };

  return (
    <MaterialCard 
      className="p-4 sm:p-6 h-full flex flex-col" 
      hoverable
      role="article"
      ariaLabel={`${checklist.title} checklist`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 text-base sm:text-lg mb-1">{checklist.title}</h3>
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{checklist.description}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(checklist.priority)}`}>
          {checklist.priority}
        </span>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <ProgressBar 
          progress={checklist.progress} 
          color={getProgressColor(checklist.progress)}
          showLabel={false}
          ariaLabel={`${checklist.title} progress: ${checklist.progress}%`}
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs sm:text-sm text-gray-600">
            {checklist.completedItems} of {checklist.totalItems} items
          </span>
          <span className="text-xs sm:text-sm font-medium text-gray-900">
            {checklist.progress}%
          </span>
        </div>
      </div>

      {/* Category and Due Date */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-4">
        <span className="bg-gray-100 px-2 py-1 rounded text-xs">{checklist.category}</span>
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
          <span>Due: {checklist.dueDate}</span>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="flex items-center mb-6">
        {checklist.progress >= 90 ? (
          <CheckCircle className="w-4 h-4 text-green-600 mr-2" aria-hidden="true" />
        ) : checklist.progress < 50 ? (
          <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" aria-hidden="true" />
        ) : (
          <div className="w-4 h-4 bg-blue-600 rounded-full mr-2" aria-hidden="true" />
        )}
        <span className="text-xs sm:text-sm text-gray-600">
          {checklist.progress >= 90 ? 'Nearly Complete' : 
           checklist.progress < 50 ? 'Needs Attention' : 'In Progress'}
        </span>
      </div>

      {/* Actions */}
      <div className="mt-auto space-y-2 sm:space-y-3">
        <Link to={`/checklists/${checklist.id}`}>
          <MaterialButton className="w-full touch-target">
            Continue Checklist
          </MaterialButton>
        </Link>
        <Link to={`/checklists/${checklist.id}`}>
          <MaterialButton variant="outlined" className="w-full touch-target">
            View Details
          </MaterialButton>
        </Link>
      </div>
    </MaterialCard>
  );
};

export default ChecklistCard;