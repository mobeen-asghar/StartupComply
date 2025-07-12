import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, CheckCircle, Circle, Plus, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { storageService } from '../../services/storageService';
import { Checklist, ChecklistItem } from '../../types';
import MaterialCard from '../UI/MaterialCard';
import MaterialButton from '../UI/MaterialButton';
import ProgressBar from '../UI/ProgressBar';

const ChecklistDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [checklist, setChecklist] = useState<Checklist | null>(null);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');

  useEffect(() => {
    if (id) {
      const checklists = storageService.getChecklists();
      const found = checklists.find(c => c.id === id);
      setChecklist(found || null);
    }
  }, [id]);

  if (!checklist) {
    return (
      <div className="space-y-8">
        <div className="flex items-center space-x-4">
          <Link to="/checklists">
            <MaterialButton variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Checklists
            </MaterialButton>
          </Link>
        </div>
        <MaterialCard className="p-12 text-center">
          <p className="text-gray-500 text-lg">Checklist not found.</p>
          <Link to="/checklists">
            <MaterialButton className="mt-4" variant="outlined">
              Return to Checklists
            </MaterialButton>
          </Link>
        </MaterialCard>
      </div>
    );
  }

  const completedItems = checklist.items.filter(item => item.completed).length;
  const totalItems = checklist.items.length;
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const handleToggleItem = (itemId: string) => {
    const updatedItems = checklist.items.map(item => {
      if (item.id === itemId) {
        const updated = {
          ...item,
          completed: !item.completed,
          completedAt: !item.completed ? new Date().toISOString() : undefined,
          completedBy: !item.completed ? `${user?.firstName} ${user?.lastName}` : undefined,
        };
        return updated;
      }
      return item;
    });

    const updatedChecklist = { ...checklist, items: updatedItems };
    storageService.updateChecklist(updatedChecklist);
    setChecklist(updatedChecklist);

    // Add activity
    const toggledItem = checklist.items.find(item => item.id === itemId);
    if (toggledItem) {
      storageService.addActivity({
        id: Date.now().toString(),
        action: `${!toggledItem.completed ? 'Completed' : 'Reopened'} task: ${toggledItem.title}`,
        user: `${user?.firstName} ${user?.lastName}`,
        timestamp: new Date().toISOString(),
        type: 'checklist',
      });
    }
  };

  const handleAddItem = () => {
    if (!newItemTitle.trim()) return;

    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      title: newItemTitle.trim(),
      description: newItemDescription.trim(),
      completed: false,
      priority: 'medium',
      category: checklist.category,
      framework: checklist.framework,
    };

    const updatedChecklist = {
      ...checklist,
      items: [...checklist.items, newItem],
    };

    storageService.updateChecklist(updatedChecklist);
    setChecklist(updatedChecklist);
    setNewItemTitle('');
    setNewItemDescription('');
    setShowAddItem(false);

    // Add activity
    storageService.addActivity({
      id: Date.now().toString(),
      action: `Added new task: ${newItem.title}`,
      user: `${user?.firstName} ${user?.lastName}`,
      timestamp: new Date().toISOString(),
      type: 'checklist',
    });
  };

  const handleDeleteItem = (itemId: string) => {
    const itemToDelete = checklist.items.find(item => item.id === itemId);
    const updatedItems = checklist.items.filter(item => item.id !== itemId);
    const updatedChecklist = { ...checklist, items: updatedItems };

    storageService.updateChecklist(updatedChecklist);
    setChecklist(updatedChecklist);

    // Add activity
    if (itemToDelete) {
      storageService.addActivity({
        id: Date.now().toString(),
        action: `Deleted task: ${itemToDelete.title}`,
        user: `${user?.firstName} ${user?.lastName}`,
        timestamp: new Date().toISOString(),
        type: 'checklist',
      });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link to="/checklists">
          <MaterialButton variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Checklists
          </MaterialButton>
        </Link>
      </div>

      {/* Checklist Overview */}
      <MaterialCard className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-medium text-gray-900 mb-2">{checklist.title}</h1>
            <p className="text-gray-600 mb-4">{checklist.description}</p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className={`px-3 py-1 rounded-full font-medium ${getPriorityColor(checklist.priority)}`}>
                {checklist.priority} priority
              </span>
              <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                {checklist.framework}
              </span>
              <div className="flex items-center text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                Due: {new Date(checklist.dueDate).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Overall Progress</span>
            <span className="text-sm font-medium text-gray-900">{progress}%</span>
          </div>
          <ProgressBar 
            progress={progress} 
            color={progress >= 80 ? 'success' : progress >= 50 ? 'primary' : 'warning'}
            showLabel={false}
          />
          <p className="text-sm text-gray-600 mt-2">
            {completedItems} of {totalItems} tasks completed
          </p>
        </div>
      </MaterialCard>

      {/* Tasks */}
      <MaterialCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-gray-900">Tasks</h2>
          <MaterialButton onClick={() => setShowAddItem(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Task
          </MaterialButton>
        </div>

        {/* Add New Item Form */}
        {showAddItem && (
          <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Task</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="newItemTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  id="newItemTitle"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label htmlFor="newItemDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  id="newItemDescription"
                  value={newItemDescription}
                  onChange={(e) => setNewItemDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter task description"
                />
              </div>
              <div className="flex space-x-4">
                <MaterialButton onClick={handleAddItem} disabled={!newItemTitle.trim()}>
                  Add Task
                </MaterialButton>
                <MaterialButton variant="outlined" onClick={() => setShowAddItem(false)}>
                  Cancel
                </MaterialButton>
              </div>
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="space-y-4">
          {checklist.items.map((item, index) => (
            <div
              key={item.id}
              className={`border rounded-lg p-4 transition-all duration-200 ${
                item.completed 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => handleToggleItem(item.id)}
                  className={`mt-1 p-1 rounded-full transition-colors duration-200 ${
                    item.completed
                      ? 'text-green-600 hover:text-green-700'
                      : 'text-gray-400 hover:text-blue-600'
                  }`}
                >
                  {item.completed ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium ${
                    item.completed ? 'text-green-800 line-through' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className={`text-sm mt-1 ${
                      item.completed ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {item.description}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs">
                    <span className={`px-2 py-1 rounded font-medium ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                    
                    {item.dueDate && (
                      <div className="flex items-center text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        Due: {new Date(item.dueDate).toLocaleDateString()}
                      </div>
                    )}
                    
                    {item.assignee && (
                      <div className="flex items-center text-gray-500">
                        <User className="w-3 h-3 mr-1" />
                        {item.assignee}
                      </div>
                    )}
                    
                    {item.completed && item.completedAt && (
                      <div className="text-green-600">
                        Completed {new Date(item.completedAt).toLocaleDateString()}
                        {item.completedBy && ` by ${item.completedBy}`}
                      </div>
                    )}
                  </div>
                </div>
                
                <MaterialButton
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </MaterialButton>
              </div>
            </div>
          ))}
          
          {checklist.items.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">No tasks in this checklist yet.</p>
              <MaterialButton onClick={() => setShowAddItem(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Task
              </MaterialButton>
            </div>
          )}
        </div>
      </MaterialCard>
    </div>
  );
};

export default ChecklistDetail;