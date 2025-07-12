import { User, Company, Checklist, Template, Activity, NotificationSettings, SecuritySettings } from '../types';

class StorageService {
  private getFromStorage<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return defaultValue;
    }
  }

  private setToStorage<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
    }
  }

  // User management
  getUsers(): User[] {
    return this.getFromStorage('users', []);
  }

  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    this.setToStorage('users', users);
    this.setToStorage('currentUser', user);
  }

  updateUser(user: User): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      users[index] = user;
      this.setToStorage('users', users);
    }
    this.setToStorage('currentUser', user);
  }

  getUser(): User | null {
    return this.getFromStorage('currentUser', null);
  }

  // Company management
  getCompany(): Company | null {
    return this.getFromStorage('company', null);
  }

  updateCompany(company: Company): void {
    this.setToStorage('company', company);
  }

  // Checklist management
  getChecklists(): Checklist[] {
    return this.getFromStorage('checklists', this.getDefaultChecklists());
  }

  addChecklist(checklist: Checklist): void {
    const checklists = this.getChecklists();
    checklists.push(checklist);
    this.setToStorage('checklists', checklists);
  }

  updateChecklist(checklist: Checklist): void {
    const checklists = this.getChecklists();
    const index = checklists.findIndex(c => c.id === checklist.id);
    if (index !== -1) {
      checklists[index] = { ...checklist, updatedAt: new Date().toISOString() };
      this.setToStorage('checklists', checklists);
    }
  }

  deleteChecklist(id: string): void {
    const checklists = this.getChecklists();
    const filtered = checklists.filter(c => c.id !== id);
    this.setToStorage('checklists', filtered);
  }

  // Template management
  getTemplates(): Template[] {
    return this.getFromStorage('templates', this.getDefaultTemplates());
  }

  updateTemplateDownloads(id: string): void {
    const templates = this.getTemplates();
    const template = templates.find(t => t.id === id);
    if (template) {
      template.downloads += 1;
      this.setToStorage('templates', templates);
    }
  }

  // Activity management
  getActivities(): Activity[] {
    return this.getFromStorage('activities', []);
  }

  addActivity(activity: Activity): void {
    const activities = this.getActivities();
    activities.unshift(activity); // Add to beginning
    // Keep only last 100 activities
    if (activities.length > 100) {
      activities.splice(100);
    }
    this.setToStorage('activities', activities);
  }

  // Settings management
  getNotificationSettings(): NotificationSettings {
    return this.getFromStorage('notificationSettings', {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      taskReminders: true,
      deadlineAlerts: true,
      complianceUpdates: true,
      weeklyReports: true,
      immediateAlerts: true,
      dailyDigest: false,
    });
  }

  updateNotificationSettings(settings: NotificationSettings): void {
    this.setToStorage('notificationSettings', settings);
  }

  getSecuritySettings(): SecuritySettings {
    return this.getFromStorage('securitySettings', {
      twoFactorEnabled: true,
      sessionTimeout: '30',
      loginNotifications: true,
      dataEncryption: true,
      accessLogging: true,
      passwordExpiry: '90',
    });
  }

  updateSecuritySettings(settings: SecuritySettings): void {
    this.setToStorage('securitySettings', settings);
  }

  // Default data
  private getDefaultChecklists(): Checklist[] {
    return [
      {
        id: '1',
        title: 'GDPR Compliance Checklist',
        description: 'Complete guide to GDPR compliance requirements',
        category: 'Privacy',
        framework: 'GDPR',
        priority: 'high',
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: [
          {
            id: '1-1',
            title: 'Conduct Data Audit',
            description: 'Map all personal data processing activities',
            completed: true,
            priority: 'high',
            category: 'Privacy',
            framework: 'GDPR',
            completedAt: new Date(Date.now() - 86400000).toISOString(),
            completedBy: 'Legal Team',
          },
          {
            id: '1-2',
            title: 'Update Privacy Policy',
            description: 'Ensure privacy policy meets GDPR requirements',
            completed: true,
            priority: 'high',
            category: 'Privacy',
            framework: 'GDPR',
            completedAt: new Date(Date.now() - 172800000).toISOString(),
            completedBy: 'Legal Team',
          },
          {
            id: '1-3',
            title: 'Implement Data Subject Rights',
            description: 'Set up processes for data subject requests',
            completed: false,
            dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            priority: 'high',
            category: 'Privacy',
            framework: 'GDPR',
            assignee: 'IT Team',
          },
          {
            id: '1-4',
            title: 'Data Protection Impact Assessment',
            description: 'Conduct DPIA for high-risk processing',
            completed: false,
            dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            priority: 'medium',
            category: 'Privacy',
            framework: 'GDPR',
            assignee: 'Legal Team',
          },
          {
            id: '1-5',
            title: 'Staff Training',
            description: 'Train staff on GDPR requirements',
            completed: false,
            dueDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            priority: 'medium',
            category: 'Privacy',
            framework: 'GDPR',
            assignee: 'HR Team',
          },
        ],
      },
      {
        id: '2',
        title: 'SOC 2 Type II Preparation',
        description: 'Security controls and audit preparation',
        category: 'Security',
        framework: 'SOC 2',
        priority: 'medium',
        dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: [
          {
            id: '2-1',
            title: 'Security Policy Documentation',
            description: 'Document all security policies and procedures',
            completed: false,
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            priority: 'high',
            category: 'Security',
            framework: 'SOC 2',
            assignee: 'IT Security',
          },
          {
            id: '2-2',
            title: 'Access Control Review',
            description: 'Review and document access controls',
            completed: false,
            dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            priority: 'high',
            category: 'Security',
            framework: 'SOC 2',
            assignee: 'IT Security',
          },
        ],
      },
      {
        id: '3',
        title: 'ISO 27001 Implementation',
        description: 'Information Security Management System implementation',
        category: 'Security',
        framework: 'ISO 27001',
        priority: 'medium',
        dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: [
          {
            id: '3-1',
            title: 'Risk Assessment',
            description: 'Conduct comprehensive information security risk assessment',
            completed: false,
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            priority: 'high',
            category: 'Security',
            framework: 'ISO 27001',
            assignee: 'Security Team',
          },
          {
            id: '3-2',
            title: 'Security Controls Implementation',
            description: 'Implement required security controls from Annex A',
            completed: false,
            dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            priority: 'high',
            category: 'Security',
            framework: 'ISO 27001',
            assignee: 'IT Team',
          },
        ],
      },
      {
        id: '4',
        title: 'HIPAA Compliance Assessment',
        description: 'Healthcare data protection compliance review',
        category: 'Healthcare',
        framework: 'HIPAA',
        priority: 'high',
        dueDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: [
          {
            id: '4-1',
            title: 'PHI Inventory',
            description: 'Identify and catalog all Protected Health Information',
            completed: false,
            dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            priority: 'high',
            category: 'Healthcare',
            framework: 'HIPAA',
            assignee: 'Compliance Team',
          },
          {
            id: '4-2',
            title: 'Business Associate Agreements',
            description: 'Review and update all BAAs with vendors',
            completed: false,
            dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            priority: 'medium',
            category: 'Healthcare',
            framework: 'HIPAA',
            assignee: 'Legal Team',
          },
        ],
      },
    ];
  }

  // Team management
  getTeamMembers(): TeamMember[] {
    return this.getFromStorage('teamMembers', this.getDefaultTeamMembers());
  }

  addTeamMember(member: TeamMember): void {
    const members = this.getTeamMembers();
    members.push(member);
    this.setToStorage('teamMembers', members);
  }

  updateTeamMember(member: TeamMember): void {
    const members = this.getTeamMembers();
    const index = members.findIndex(m => m.id === member.id);
    if (index !== -1) {
      members[index] = member;
      this.setToStorage('teamMembers', members);
    }
  }

  deleteTeamMember(id: string): void {
    const members = this.getTeamMembers();
    const filtered = members.filter(m => m.id !== id);
    this.setToStorage('teamMembers', filtered);
  }

  // Notifications management
  getNotifications(): Notification[] {
    return this.getFromStorage('notifications', this.getDefaultNotifications());
  }

  addNotification(notification: Notification): void {
    const notifications = this.getNotifications();
    notifications.unshift(notification);
    // Keep only last 50 notifications
    if (notifications.length > 50) {
      notifications.splice(50);
    }
    this.setToStorage('notifications', notifications);
  }

  markNotificationAsRead(id: string): void {
    const notifications = this.getNotifications();
    const notification = notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      this.setToStorage('notifications', notifications);
    }
  }

  markAllNotificationsAsRead(): void {
    const notifications = this.getNotifications();
    notifications.forEach(n => n.read = true);
    this.setToStorage('notifications', notifications);
  }

  deleteNotification(id: string): void {
    const notifications = this.getNotifications();
    const filtered = notifications.filter(n => n.id !== id);
    this.setToStorage('notifications', filtered);
  }

  // Reports management
  getReports(): Report[] {
    return this.getFromStorage('reports', this.getDefaultReports());
  }

  generateReport(type: string, filters: any): Report {
    const report: Report = {
      id: Date.now().toString(),
      title: `${type} Report`,
      type,
      generatedAt: new Date().toISOString(),
      generatedBy: 'Current User',
      status: 'completed',
      data: this.generateReportData(type, filters),
      filters,
    };

    const reports = this.getReports();
    reports.unshift(report);
    this.setToStorage('reports', reports);
    
    return report;
  }

  private generateReportData(type: string, filters: any): any {
    const checklists = this.getChecklists();
    const activities = this.getActivities();
    
    switch (type) {
      case 'compliance':
        return {
          totalChecklists: checklists.length,
          completedChecklists: checklists.filter(c => 
            c.items.every(item => item.completed)
          ).length,
          overdueTasks: checklists.reduce((sum, c) => 
            sum + c.items.filter(item => 
              !item.completed && item.dueDate && new Date(item.dueDate) < new Date()
            ).length, 0
          ),
          complianceScore: Math.round(
            (checklists.reduce((sum, c) => 
              sum + c.items.filter(item => item.completed).length, 0
            ) / checklists.reduce((sum, c) => sum + c.items.length, 0)) * 100
          ),
        };
      case 'activity':
        return {
          totalActivities: activities.length,
          recentActivities: activities.slice(0, 10),
          activityByType: activities.reduce((acc, activity) => {
            acc[activity.type] = (acc[activity.type] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
        };
      default:
        return {};
    }
  }
  private getDefaultTemplates(): Template[] {
    return [
      {
        id: 1,
        title: 'Privacy Policy Template',
        description: 'GDPR-compliant privacy policy template for websites',
        category: 'Privacy',
        framework: 'GDPR',
        format: 'DOC',
        size: '45 KB',
        downloads: 2340,
        rating: 4.8,
        lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      },
      {
        id: 2,
        title: 'Data Processing Agreement',
        description: 'Standard DPA template for third-party processors',
        category: 'Privacy',
        framework: 'GDPR',
        format: 'PDF',
        size: '120 KB',
        downloads: 1890,
        rating: 4.9,
        lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      },
      {
        id: 3,
        title: 'SOC 2 Audit Checklist',
        description: 'Comprehensive checklist for SOC 2 Type II audits',
        category: 'Security',
        framework: 'SOC 2',
        format: 'XLSX',
        size: '250 KB',
        downloads: 1560,
        rating: 4.7,
        lastUpdated: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      },
      {
        id: 4,
        title: 'Risk Assessment Template',
        description: 'ISO 27001 compliant risk assessment framework',
        category: 'Security',
        framework: 'ISO 27001',
        format: 'DOC',
        size: '180 KB',
        downloads: 2100,
        rating: 4.6,
        lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      },
      {
        id: 5,
        title: 'Incident Response Plan',
        description: 'Comprehensive incident response and recovery plan',
        category: 'Security',
        framework: 'Multiple',
        format: 'PDF',
        size: '320 KB',
        downloads: 1750,
        rating: 4.8,
        lastUpdated: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      },
      {
        id: 6,
        title: 'HIPAA Risk Analysis',
        description: 'Healthcare risk analysis template for HIPAA compliance',
        category: 'Healthcare',
        framework: 'HIPAA',
        format: 'XLSX',
        size: '200 KB',
        downloads: 980,
        rating: 4.9,
        lastUpdated: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      },
      {
        id: 7,
        title: 'Employee Handbook Template',
        description: 'Comprehensive employee handbook with compliance sections',
        category: 'HR',
        framework: 'Multiple',
        format: 'DOC',
        size: '450 KB',
        downloads: 1200,
        rating: 4.5,
        lastUpdated: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      },
      {
        id: 8,
        title: 'Vendor Assessment Questionnaire',
        description: 'Security and compliance assessment for third-party vendors',
        category: 'Security',
        framework: 'Multiple',
        format: 'XLSX',
        size: '85 KB',
        downloads: 890,
        rating: 4.7,
        lastUpdated: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      },
    ];
  }

  private getDefaultTeamMembers(): TeamMember[] {
    return [
      {
        id: '1',
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@startupcomply.com',
        role: 'Admin',
        department: 'Legal',
        jobTitle: 'Compliance Officer',
        status: 'active',
        joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        lastActive: new Date().toISOString(),
        permissions: ['read', 'write', 'admin'],
      },
      {
        id: '2',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@startupcomply.com',
        role: 'Manager',
        department: 'IT',
        jobTitle: 'IT Security Manager',
        status: 'active',
        joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        permissions: ['read', 'write'],
      },
      {
        id: '3',
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael.chen@startupcomply.com',
        role: 'Member',
        department: 'HR',
        jobTitle: 'HR Specialist',
        status: 'active',
        joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        permissions: ['read'],
      },
    ];
  }

  private getDefaultNotifications(): Notification[] {
    return [
      {
        id: '1',
        title: 'GDPR Task Due Soon',
        message: 'Data Protection Impact Assessment is due in 3 days',
        type: 'warning',
        read: false,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        actionUrl: '/checklists/1',
      },
      {
        id: '2',
        title: 'New Template Available',
        message: 'CCPA Compliance Template has been added to the library',
        type: 'info',
        read: false,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        actionUrl: '/templates',
      },
      {
        id: '3',
        title: 'Task Completed',
        message: 'Privacy Policy Update has been marked as complete',
        type: 'success',
        read: true,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        actionUrl: '/checklists/1',
      },
    ];
  }

  private getDefaultReports(): Report[] {
    return [
      {
        id: '1',
        title: 'Monthly Compliance Report',
        type: 'compliance',
        generatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        generatedBy: 'Demo User',
        status: 'completed',
        data: {
          totalChecklists: 4,
          completedChecklists: 0,
          overdueTasks: 0,
          complianceScore: 25,
        },
        filters: { dateRange: 'last30days' },
      },
    ];
  }
}

export const storageService = new StorageService();