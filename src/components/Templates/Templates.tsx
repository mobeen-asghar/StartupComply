import React, { useState } from 'react';
import { Search, Download, Filter, FileText, Upload } from 'lucide-react';
import { storageService } from '../../services/storageService';
import MaterialCard from '../UI/MaterialCard';
import MaterialButton from '../UI/MaterialButton';
import TemplateCard from './TemplateCard';

const categories = ['All', 'Privacy', 'Security', 'Healthcare', 'Finance'];
const frameworks = ['All', 'GDPR', 'SOC 2', 'ISO 27001', 'HIPAA', 'Multiple'];
const formats = ['All', 'DOC', 'PDF', 'XLSX'];

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState(() => storageService.getTemplates());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFramework, setSelectedFramework] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesFramework = selectedFramework === 'All' || template.framework === selectedFramework;
    const matchesFormat = selectedFormat === 'All' || template.format === selectedFormat;
    
    return matchesSearch && matchesCategory && matchesFramework && matchesFormat;
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedFramework('All');
    setSelectedFormat('All');
  };

  const handleRequestTemplate = () => {
    // In a real app, this would open a modal or form
    alert('Template request feature would be implemented here. You can contact support to request custom templates.');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-2">Document Templates</h1>
          <p className="text-sm sm:text-base text-gray-600">Download ready-to-use compliance documents and templates.</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <MaterialButton variant="outlined" className="touch-target">
            <Upload className="w-4 h-4 mr-2" />
            Upload Template
          </MaterialButton>
          <MaterialButton onClick={handleRequestTemplate} className="touch-target">
            <FileText className="w-4 h-4 mr-2" />
            Request Template
          </MaterialButton>
        </div>
      </div>

      {/* Search and Filters */}
      <MaterialCard className="p-4 sm:p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full touch-target"
              aria-label="Search templates"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-target"
              aria-label="Filter by category"
            >
              <option value="" disabled>Category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-target"
              aria-label="Filter by framework"
            >
              <option value="" disabled>Framework</option>
              {frameworks.map(framework => (
                <option key={framework} value={framework}>{framework}</option>
              ))}
            </select>

            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-target"
              aria-label="Filter by format"
            >
              <option value="" disabled>Format</option>
              {formats.map(format => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>

            <MaterialButton variant="outlined" className="w-full touch-target" onClick={handleClearFilters}>
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </MaterialButton>
          </div>
        </div>
      </MaterialCard>

      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <p className="text-sm sm:text-base text-gray-600">
          Showing {filteredTemplates.length} of {templates.length} templates
        </p>
        <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm touch-target">
          <option value="popular">Sort by: Most Popular</option>
          <option value="recent">Sort by: Most Recent</option>
          <option value="rating">Sort by: Highest Rated</option>
          <option value="name">Sort by: Name A-Z</option>
        </select>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredTemplates.map(template => (
          <TemplateCard 
            key={template.id} 
            template={template} 
            onDownload={() => {
              storageService.updateTemplateDownloads(template.id);
              setTemplates(storageService.getTemplates());
            }}
          />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <MaterialCard className="p-8 sm:p-12 text-center">
          <p className="text-gray-500 text-base sm:text-lg">No templates found matching your criteria.</p>
          <MaterialButton className="mt-4 touch-target" variant="outlined" onClick={handleRequestTemplate}>
            Request Custom Template
          </MaterialButton>
        </MaterialCard>
      )}
    </div>
  );
};

export default Templates;