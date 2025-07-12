import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import LandingPage from './components/Public/LandingPage';
import AboutPage from './components/Public/AboutPage';
import PricingPage from './components/Public/PricingPage';
import ContactPage from './components/Public/ContactPage';
import { PrivacyPolicy, TermsOfService, CookiePolicy, GDPRInfo } from './components/Public/LegalPages';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import Checklists from './components/Checklists/Checklists';
import ChecklistDetail from './components/Checklists/ChecklistDetail';
import Templates from './components/Templates/Templates';
import Settings from './components/Settings/Settings';
import TeamManagement from './components/Team/TeamManagement';
import ReportsPage from './components/Reports/ReportsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-roboto">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/gdpr" element={<GDPRInfo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/checklists" element={
              <ProtectedRoute>
                <Layout>
                  <Checklists />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/checklists/:id" element={
              <ProtectedRoute>
                <Layout>
                  <ChecklistDetail />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/templates" element={
              <ProtectedRoute>
                <Layout>
                  <Templates />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/team" element={
              <ProtectedRoute>
                <Layout>
                  <TeamManagement />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute>
                <Layout>
                  <ReportsPage />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Layout>
                  <Settings />
                </Layout>
              </ProtectedRoute>
            } />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;