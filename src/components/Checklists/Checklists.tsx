import React, { useState } from 'react';
import { Filter, Search, Plus } from 'lucide-react';
import { storageService } from '../../services/storageService';
import MaterialCard from '../UI/MaterialCard';
import MaterialButton from '../UI/MaterialButton';
import ChecklistCard from './ChecklistCard';

const categories = ['All', 'Privacy', 'Security', 'Healthcare', 'Finance'];
const priorities = ['All', 'High', 'Medium', 'Low'];

const Checklists: React.FC = () => {
  const [checklists, setChecklists] = useState(() => storageService.getChecklists());
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Missing function added
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedPriority('All');
  };

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
    setChecklists(storageService.getChecklists());

    storageService.addActivity({
      id: Date.now().toString(),
      action: 'Created new checklist',
      user: 'Current User',
      timestamp: new Date().toISOString(),
      type: 'checklist',
    });
  };

  const checklistsData = checklists.map(checklist => {
    const totalItems = checklist.items.length;
    const completedItems = checklist.items.filter(item => item.completed).length;
    const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

    return {
      id: checklist.id,
      title: checklist.title,
      description: checklist.description,
      progress,
      totalItems,
      completedItems,
      category: checklist.category,
      priority: checklist.priority,
      dueDate: checklist.dueDate,
    };
  });

  const filteredChecklists = checklistsData.filter(checklist => {
    const matchesCategory = selectedCategory === 'All' || checklist.category === selectedCategory;
    const matchesPriority = selectedPriority === 'All' || checklist.priority === selectedPriority.toLowerCase();
    const matchesSearch = checklist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          checklist.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-2">Compliance Checklists</h1>
          <p className="text-sm sm:text-base text-gray-600">Track and manage your compliance requirements.</p>
        </div>
        <MaterialButton onClick={handleCreateChecklist} className="touch-target">
          <Plus className="w-4 h-4 mr-2" />
          Create Checklist
        </MaterialButton>
      </div>

      {/* Filters and Search */}
      <MaterialCard className="p-4 sm:p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search checklists..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64 touch-target"
                aria-label="Search checklists"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-target"
              aria-label="Filter by category"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Priority Filter */}
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-target"
              aria-label="Filter by priority"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <div className="flex justify-end">
            <MaterialButton className="touch-target" onClick={handleClearFilters}>
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </MaterialButton>
          </div>
        </div>
      </MaterialCard>

      {/* Checklists Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredChecklists.map(checklist => (
          <ChecklistCard key={checklist.id} checklist={checklist} />
        ))}
      </div>

      {filteredChecklists.length === 0 && (
        <MaterialCard className="p-8 sm:p-12 text-center">
          <p className="text-gray-500 text-base sm:text-lg">No checklists found matching your criteria.</p>
          <MaterialButton className="mt-4 touch-target" variant="outlined" onClick={handleCreateChecklist}>
            Create New Checklist
          </MaterialButton>
        </MaterialCard>
      )}
    </div>
  );
};

export default Checklists;
