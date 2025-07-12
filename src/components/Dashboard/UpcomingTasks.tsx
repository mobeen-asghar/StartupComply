import React from 'react';
import { Calendar, User, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { storageService } from '../../services/storageService';
import MaterialCard from '../UI/MaterialCard';
import MaterialButton from '../UI/MaterialButton';

const UpcomingTasks: React.FC = () => {
  const checklists = storageService.getChecklists();
  
  // Get all incomplete tasks with due dates
  const tasksData = checklists
    .flatMap(checklist => 
      checklist.items
        .filter(item => !item.completed && item.dueDate)
        .map(item => ({
          id: item.id,
          checklistId: checklist.id,
          title: item.title,
          dueDate: item.dueDate!,
          priority: item.priority,
          assignee: item.assignee || 'Unassigned',
          framework: checklist.framework,
        }))
    )
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 4); // Show only first 4 tasks

  return (
    <MaterialCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-900">Upcoming Tasks</h2>
        <Link to="/checklists">
          <MaterialButton variant="text" size="sm">
            View All
          </MaterialButton>
        </Link>
      </div>

      <div className="space-y-4">
        {tasksData.length > 0 ? tasksData.map((task, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors duration-200"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-medium text-gray-900 text-sm">{task.title}</h3>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                task.priority === 'high' ? 'bg-red-100 text-red-800' :
                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {task.priority}
              </span>
            </div>
            
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-2" aria-hidden="true" />
                <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <User className="w-3 h-3 mr-2" aria-hidden="true" />
                <span>{task.assignee}</span>
              </div>
              <div className="flex items-center">
                <AlertCircle className="w-3 h-3 mr-2" aria-hidden="true" />
                <span>{task.framework}</span>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No upcoming tasks with due dates.</p>
            <Link to="/checklists">
              <MaterialButton variant="outlined" className="mt-4">
                View Checklists
              </MaterialButton>
            </Link>
          </div>
        )}
      </div>
    </MaterialCard>
  );
};

export default UpcomingTasks;