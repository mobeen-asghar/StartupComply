import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Company, AuthState } from '../types';
import { storageService } from '../services/storageService';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Partial<User>, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  updateCompany: (companyData: Partial<Company>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    company: null,
  });

  useEffect(() => {
    // Check for existing session on app load
    const savedUser = storageService.getUser();
    const savedCompany = storageService.getCompany();
    
    if (savedUser) {
      setAuthState({
        isAuthenticated: true,
        user: savedUser,
        company: savedCompany,
      });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      const users = storageService.getUsers();
      const user = users.find(u => u.email === email);
      
      if (!user) {
        return false;
      }

      // In a real app, you'd verify the password hash
      const savedPassword = localStorage.getItem(`password_${user.id}`);
      if (savedPassword !== password) {
        return false;
      }

      // Update last login
      const updatedUser = { ...user, lastLogin: new Date().toISOString() };
      storageService.updateUser(updatedUser);

      const company = storageService.getCompany();

      setAuthState({
        isAuthenticated: true,
        user: updatedUser,
        company,
      });

      // Add login activity
      storageService.addActivity({
        id: Date.now().toString(),
        action: 'User logged in',
        user: `${updatedUser.firstName} ${updatedUser.lastName}`,
        timestamp: new Date().toISOString(),
        type: 'system',
      });

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (userData: Partial<User>, password: string): Promise<boolean> => {
    try {
      const users = storageService.getUsers();
      
      // Check if user already exists
      if (users.some(u => u.email === userData.email)) {
        return false;
      }

      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email!,
        firstName: userData.firstName!,
        lastName: userData.lastName!,
        jobTitle: userData.jobTitle || 'Compliance Officer',
        department: userData.department || 'Legal',
        location: userData.location || '',
        timezone: userData.timezone || 'America/Los_Angeles',
        phone: userData.phone || '',
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
      };

      // Save user and password
      storageService.addUser(newUser);
      localStorage.setItem(`password_${newUser.id}`, password);

      // Create default company if none exists
      let company = storageService.getCompany();
      if (!company) {
        company = {
          id: Date.now().toString(),
          name: 'My Company',
          industry: 'Technology',
          employeeCount: '1-10',
          website: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'United States',
          primaryContact: `${newUser.firstName} ${newUser.lastName}`,
          complianceOfficer: `${newUser.firstName} ${newUser.lastName}`,
        };
        storageService.updateCompany(company);
      }

      setAuthState({
        isAuthenticated: true,
        user: newUser,
        company,
      });

      // Add signup activity
      storageService.addActivity({
        id: Date.now().toString(),
        action: 'New user registered',
        user: `${newUser.firstName} ${newUser.lastName}`,
        timestamp: new Date().toISOString(),
        type: 'system',
      });

      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    if (authState.user) {
      storageService.addActivity({
        id: Date.now().toString(),
        action: 'User logged out',
        user: `${authState.user.firstName} ${authState.user.lastName}`,
        timestamp: new Date().toISOString(),
        type: 'system',
      });
    }

    setAuthState({
      isAuthenticated: false,
      user: null,
      company: null,
    });
    
    // Clear session data but keep user data for future logins
    localStorage.removeItem('currentUser');
  };

  const updateUser = (userData: Partial<User>) => {
    if (authState.user) {
      const updatedUser = { ...authState.user, ...userData };
      storageService.updateUser(updatedUser);
      setAuthState(prev => ({ ...prev, user: updatedUser }));
    }
  };

  const updateCompany = (companyData: Partial<Company>) => {
    const updatedCompany = authState.company 
      ? { ...authState.company, ...companyData }
      : { id: Date.now().toString(), ...companyData } as Company;
    
    storageService.updateCompany(updatedCompany);
    setAuthState(prev => ({ ...prev, company: updatedCompany }));
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        updateUser,
        updateCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};