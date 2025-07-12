import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Filter, FileText, TrendingUp } from 'lucide-react';
import { storageService } from '../../services/storageService';
import { useAuth } from '../../contexts/AuthContext';
import MaterialCard from '../UI/MaterialCard';
import MaterialButton from '../UI/MaterialButton';

const ReportsPage: React.FC = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState(() => storageService.getReports());
  const [selectedType, setSelectedType] = useState('All');
  const [dateRange, setDateRange] = useState('last30days');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { value: 'compliance', label: 'Compliance Report', description: 'Overall compliance status and progress' },
    { value: 'activity', label: 'Activity Report', description: 'Team activity and task completion' },
    { value: 'risk', label: 'Risk Assessment', description: 'Risk analysis and mitigation status' },
    { value: 'audit', label: 'Audit Report', description: 'Audit readiness and findings' },
  ];

  const dateRanges = [
    { value: 'last7days', label: 'Last 7 days' },
    { value: 'last30days', label: 'Last 30 days' },
    { value: 'last90days', label: 'Last 90 days' },
    { value: 'lastyear', label: 'Last year' },
    { value: 'custom', label: 'Custom range' },
  ];

  const handleGenerateReport = async (type: string) => {
    setIsGenerating(true);
    
    // Simulate report generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const report = storageService.generateReport(type, { dateRange });
    setReports(storageService.getReports());
    
    // Add activity
    storageService.addActivity({
      id: Date.now().toString(),
      action: `Generated ${type} report`,
      user: `${user?.firstName} ${user?.lastName}`,
      timestamp: new Date().toISOString(),
      type: 'system',
    });
    
    setIsGenerating(false);
  };

  const handleDownloadReport = (report: any) => {
    // Simulate file download
    const dataStr = JSON.stringify(report.data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.replace(/\s+/g, '_')}.json`;
    link.click();
    URL.revokeObjectURL(url);

    // Add activity
    storageService.addActivity({
      id: Date.now().toString(),
      action: `Downloaded report: ${report.title}`,
      user: `${user?.firstName} ${user?.lastName}`,
      timestamp: new Date().toISOString(),
      type: 'system',
    });
  };

  const getReportIcon = (type: string) => {
    switch (type) {
      case 'compliance': return <BarChart3 className="w-5 h-5" />;
      case 'activity': return <TrendingUp className="w-5 h-5" />;
      case 'risk': return <FileText className="w-5 h-5" />;
      case 'audit': return <FileText className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'generating': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReports = reports.filter(report => 
    selectedType === 'All' || report.type === selectedType
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-2">Reports & Analytics</h1>
        <p className="text-sm sm:text-base text-gray-600">Generate and manage compliance reports.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MaterialCard className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-semibold text-gray-900">{reports.length}</p>
            </div>
          </div>
        </MaterialCard>

        <MaterialCard className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-semibold text-gray-900">
                {reports.filter(r => new Date(r.generatedAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
              </p>
            </div>
          </div>
        </MaterialCard>

        <MaterialCard className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText className="w-6 h-6 text-purple-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Compliance Score</p>
              <p className="text-2xl font-semibold text-gray-900">85%</p>
            </div>
          </div>
        </MaterialCard>

        <MaterialCard className="p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Next Audit</p>
              <p className="text-2xl font-semibold text-gray-900">45d</p>
            </div>
          </div>
        </MaterialCard>
      </div>

      {/* Generate New Report */}
      <MaterialCard className="p-6">
        <h2 className="text-xl font-medium text-gray-900 mb-4">Generate New Report</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {reportTypes.map(type => (
            <div
              key={type.value}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer transition-colors"
              onClick={() => handleGenerateReport(type.value)}
            >
              <div className="flex items-center space-x-3 mb-2">
                {getReportIcon(type.value)}
                <h3 className="font-medium text-gray-900">{type.label}</h3>
              </div>
              <p className="text-sm text-gray-600">{type.description}</p>
              <MaterialButton 
                size="sm" 
                className="mt-3 w-full"
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </MaterialButton>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {dateRanges.map(range => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>
      </MaterialCard>

      {/* Reports List */}
      <MaterialCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium text-gray-900">Generated Reports</h2>
          <div className="flex space-x-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Types</option>
              {reportTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredReports.map(report => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getReportIcon(report.type)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{report.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>Generated by {report.generatedBy}</span>
                      <span>•</span>
                      <span>{new Date(report.generatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                  {report.status === 'completed' && (
                    <MaterialButton
                      variant="outlined"
                      size="sm"
                      onClick={() => handleDownloadReport(report)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </MaterialButton>
                  )}
                </div>
              </div>

              {report.status === 'completed' && report.data && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {Object.entries(report.data).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="font-medium text-gray-900">{String(value)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No reports found.</p>
            <p className="text-gray-400">Generate your first report to get started.</p>
          </div>
        )}
      </MaterialCard>
    </div>
  );
};

export default ReportsPage;