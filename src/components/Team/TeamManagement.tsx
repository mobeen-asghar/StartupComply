import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Mail, Phone, Calendar, Shield } from 'lucide-react';
import { storageService } from '../../services/storageService';
import { TeamMember } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import MaterialCard from '../UI/MaterialCard';
import MaterialButton from '../UI/MaterialButton';

const TeamManagement: React.FC = () => {
  const { user } = useAuth();
  const [teamMembers, setTeamMembers] = useState(() => storageService.getTeamMembers());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteData, setInviteData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: 'Member',
    department: 'Legal',
    jobTitle: '',
  });

  const roles = ['All', 'Admin', 'Manager', 'Member'];
  const departments = ['All', 'Legal', 'IT', 'HR', 'Finance', 'Operations'];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = 
      member.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || member.role === selectedRole;
    const matchesDepartment = selectedDepartment === 'All' || member.department === selectedDepartment;
    
    return matchesSearch && matchesRole && matchesDepartment;
  });

  const handleInviteMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      firstName: inviteData.firstName,
      lastName: inviteData.lastName,
      email: inviteData.email,
      role: inviteData.role as 'Admin' | 'Manager' | 'Member',
      department: inviteData.department,
      jobTitle: inviteData.jobTitle,
      status: 'pending',
      joinedAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      permissions: inviteData.role === 'Admin' ? ['read', 'write', 'admin'] : 
                   inviteData.role === 'Manager' ? ['read', 'write'] : ['read'],
    };

    storageService.addTeamMember(newMember);
    setTeamMembers(storageService.getTeamMembers());

    // Add activity
    storageService.addActivity({
      id: Date.now().toString(),
      action: `Invited ${newMember.firstName} ${newMember.lastName} to the team`,
      user: `${user?.firstName} ${user?.lastName}`,
      timestamp: new Date().toISOString(),
      type: 'system',
    });

    // Reset form and close modal
    setInviteData({
      email: '',
      firstName: '',
      lastName: '',
      role: 'Member',
      department: 'Legal',
      jobTitle: '',
    });
    setShowInviteModal(false);
  };

  const handleRemoveMember = (memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (member && confirm(`Are you sure you want to remove ${member.firstName} ${member.lastName} from the team?`)) {
      storageService.deleteTeamMember(memberId);
      setTeamMembers(storageService.getTeamMembers());

      // Add activity
      storageService.addActivity({
        id: Date.now().toString(),
        action: `Removed ${member.firstName} ${member.lastName} from the team`,
        user: `${user?.firstName} ${user?.lastName}`,
        timestamp: new Date().toISOString(),
        type: 'system',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Admin': return <Shield className="w-4 h-4 text-red-600" />;
      case 'Manager': return <Shield className="w-4 h-4 text-blue-600" />;
      default: return <Shield className="w-4 h-4 text-gray-600" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-2">Team Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage team members and their permissions.</p>
        </div>
        <MaterialButton onClick={() => setShowInviteModal(true)} className="touch-target">
          <Plus className="w-4 h-4 mr-2" />
          Invite Member
        </MaterialButton>
      </div>

      {/* Filters */}
      <MaterialCard className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full touch-target"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-target"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role} Role</option>
              ))}
            </select>

            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 touch-target"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept} Department</option>
              ))}
            </select>

            <MaterialButton variant="outlined" className="w-full touch-target">
              <Filter className="w-4 h-4 mr-2" />
              Clear Filters
            </MaterialButton>
          </div>
        </div>
      </MaterialCard>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map(member => (
          <MaterialCard key={member.id} className="p-6" hoverable>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-medium">
                    {member.firstName[0]}{member.lastName[0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {member.firstName} {member.lastName}
                  </h3>
                  <p className="text-sm text-gray-600">{member.jobTitle}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getRoleIcon(member.role)}
                <button className="p-1 hover:bg-gray-100 rounded">
                  <MoreVertical className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                  {member.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Role:</span>
                <span className="text-sm font-medium text-gray-900">{member.role}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Department:</span>
                <span className="text-sm font-medium text-gray-900">{member.department}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                <span className="truncate">{member.email}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Last active: {getTimeAgo(member.lastActive)}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
              <MaterialButton variant="outlined" size="sm" className="flex-1">
                Edit
              </MaterialButton>
              <MaterialButton 
                variant="outlined" 
                size="sm" 
                className="flex-1 text-red-600 border-red-300 hover:bg-red-50"
                onClick={() => handleRemoveMember(member.id)}
              >
                Remove
              </MaterialButton>
            </div>
          </MaterialCard>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <MaterialCard className="p-12 text-center">
          <p className="text-gray-500 text-lg">No team members found matching your criteria.</p>
          <MaterialButton className="mt-4" onClick={() => setShowInviteModal(true)}>
            Invite First Member
          </MaterialButton>
        </MaterialCard>
      )}

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <MaterialCard className="w-full max-w-md p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Invite Team Member</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={inviteData.firstName}
                    onChange={(e) => setInviteData({...inviteData, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={inviteData.lastName}
                    onChange={(e) => setInviteData({...inviteData, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={inviteData.email}
                  onChange={(e) => setInviteData({...inviteData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                <input
                  type="text"
                  value={inviteData.jobTitle}
                  onChange={(e) => setInviteData({...inviteData, jobTitle: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    value={inviteData.role}
                    onChange={(e) => setInviteData({...inviteData, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Member">Member</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={inviteData.department}
                    onChange={(e) => setInviteData({...inviteData, department: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Legal">Legal</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <MaterialButton 
                variant="outlined" 
                className="flex-1"
                onClick={() => setShowInviteModal(false)}
              >
                Cancel
              </MaterialButton>
              <MaterialButton 
                className="flex-1"
                onClick={handleInviteMember}
                disabled={!inviteData.email || !inviteData.firstName || !inviteData.lastName}
              >
                Send Invite
              </MaterialButton>
            </div>
          </MaterialCard>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;