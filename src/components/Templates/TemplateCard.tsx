import React from 'react';
import { Download, Star, Calendar, FileText } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { storageService } from '../../services/storageService';
import MaterialCard from '../UI/MaterialCard';
import MaterialButton from '../UI/MaterialButton';

interface TemplateData {
  id: number;
  title: string;
  description: string;
  category: string;
  framework: string;
  format: string;
  size: string;
  downloads: number;
  rating: number;
  lastUpdated: string;
}

interface TemplateCardProps {
  template: TemplateData;
  onDownload?: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onDownload }) => {
  const { user } = useAuth();

  const formatDownloads = (downloads: number) => {
    if (downloads >= 1000) {
      return `${(downloads / 1000).toFixed(1)}k`;
    }
    return downloads.toString();
  };

  const getFormatIcon = (format: string) => {
    return <FileText className="w-4 h-4" aria-hidden="true" />;
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'PDF': return 'bg-red-100 text-red-800';
      case 'DOC': return 'bg-blue-100 text-blue-800';
      case 'XLSX': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownload = () => {
    // In a real app, this would trigger an actual file download
    // For demo purposes, we'll simulate the download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `${template.title}.${template.format.toLowerCase()}`;
    link.click();
    
    // Update download count
    if (onDownload) {
      onDownload();
    }
    
    // Add activity
    storageService.addActivity({
      id: Date.now().toString(),
      action: `Downloaded template: ${template.title}`,
      user: `${user?.firstName} ${user?.lastName}`,
      timestamp: new Date().toISOString(),
      type: 'template',
    });
  };

  const handlePreview = () => {
    // In a real app, this would open a preview modal or new tab
    alert(`Preview for "${template.title}" would open here. This would show a preview of the document content.`);
  };

  return (
    <MaterialCard 
      className="p-6 h-full flex flex-col" 
      hoverable
      role="article"
      ariaLabel={`${template.title} template`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 mr-4">
          <h3 className="font-medium text-gray-900 text-lg mb-1">{template.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
        </div>
        <div className={`flex items-center px-2 py-1 rounded text-xs font-medium ${getFormatColor(template.format)}`}>
          {getFormatIcon(template.format)}
          <span className="ml-1">{template.format}</span>
        </div>
      </div>

      {/* Metadata */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Category:</span>
          <span className="font-medium text-gray-900">{template.category}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Framework:</span>
          <span className="font-medium text-gray-900">{template.framework}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Size:</span>
          <span className="font-medium text-gray-900">{template.size}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center">
          <Download className="w-4 h-4 mr-1" aria-hidden="true" />
          <span>{formatDownloads(template.downloads)} downloads</span>
        </div>
        <div className="flex items-center">
          <Star className="w-4 h-4 mr-1 text-yellow-500 fill-current" aria-hidden="true" />
          <span>{template.rating}</span>
        </div>
      </div>

      {/* Last Updated */}
      <div className="flex items-center text-xs text-gray-500 mb-6">
        <Calendar className="w-3 h-3 mr-1" aria-hidden="true" />
        <span>Updated: {template.lastUpdated}</span>
      </div>

      {/* Actions */}
      <div className="mt-auto space-y-2">
        <MaterialButton className="w-full" onClick={handleDownload}>
          <Download className="w-4 h-4 mr-2" />
          Download
        </MaterialButton>
        <MaterialButton variant="outlined" className="w-full" onClick={handlePreview}>
          Preview
        </MaterialButton>
      </div>
    </MaterialCard>
  );
};

export default TemplateCard;