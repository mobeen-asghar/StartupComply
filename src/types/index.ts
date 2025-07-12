export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  department: string;
  location: string;
  timezone: string;
  phone?: string;
  createdAt: string;
  lastLogin: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  employeeCount: string;
  website: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  primaryContact: string;
  complianceOfficer: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
  assignee?: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  framework: string;
  completedAt?: string;
  completedBy?: string;
}

export interface Checklist {
  id: string;
  title: string;
  description: string;
  category: string;
  framework: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  items: ChecklistItem[];
  createdAt: string;
  updatedAt: string;
}

export interface Template {
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
  content?: string;
  downloadUrl?: string;
}

export interface Activity {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: 'checklist' | 'template' | 'task' | 'system';
  details?: any;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  taskReminders: boolean;
  deadlineAlerts: boolean;
  complianceUpdates: boolean;
  weeklyReports: boolean;
  immediateAlerts: boolean;
  dailyDigest: boolean;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  sessionTimeout: string;
  loginNotifications: boolean;
  dataEncryption: boolean;
  accessLogging: boolean;
  passwordExpiry: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  company: Company | null;
}

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Member';
  department: string;
  jobTitle: string;
  status: 'active' | 'inactive' | 'pending';
  joinedAt: string;
  lastActive: string;
  permissions: string[];
  avatar?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  metadata?: any;
}

export interface Report {
  id: string;
  title: string;
  type: string;
  generatedAt: string;
  generatedBy: string;
  status: 'generating' | 'completed' | 'failed';
  data: any;
  filters: any;
  downloadUrl?: string;
}