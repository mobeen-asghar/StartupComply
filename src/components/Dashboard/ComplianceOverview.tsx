import React from 'react';
import { Link } from 'react-router-dom';
import { storageService } from '../../services/storageService';
import MaterialCard from '../UI/MaterialCard';
import ProgressBar from '../UI/ProgressBar';
import MaterialButton from '../UI/MaterialButton';

const ComplianceOverview: React.FC = () => {
  const checklists = storageService.getChecklists();
  
  const complianceData = checklists.map(checklist => {
    const totalItems = checklist.items.length;
    const completedItems = checklist.items.filter(item => item.completed).length;
    const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    
    let status = 'In Progress';
    let color: 'success' | 'primary' | 'warning' = 'primary';
    
    if (progress >= 90) {
      status = 'Nearly Complete';
      color = 'success';
    } else if (progress >= 70) {
      status = 'On Track';
      color = 'success';
    } else if (progress < 50) {
      status = 'Behind Schedule';
      color = 'warning';
    }
    
    return {
      id: checklist.id,
      framework: checklist.framework,
      progress,
      status,
      dueDate: checklist.dueDate,
      color,
    };
  });

  return (
    <MaterialCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-900">Compliance Overview</h2>
        <Link to="/checklists">
          <MaterialButton variant="text" size="sm">
            View All
          </MaterialButton>
        </Link>
      </div>

      <div className="space-y-6">
        {complianceData.map((item, index) => (
          <div key={index} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-medium text-gray-900">{item.framework}</h3>
                <p className="text-sm text-gray-500">Due: {item.dueDate}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                item.color === 'success' ? 'bg-green-100 text-green-800' :
                item.color === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {item.status}
              </span>
            </div>
            <ProgressBar 
              progress={item.progress} 
              color={item.color}
              showLabel={false}
              ariaLabel={`${item.framework} compliance progress: ${item.progress}%`}
            />
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-600">{item.progress}% Complete</span>
              <Link to={`/checklists/${item.id}`}>
                <MaterialButton variant="text" size="sm">
                  View Details
                </MaterialButton>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </MaterialCard>
  );
};

export default ComplianceOverview;