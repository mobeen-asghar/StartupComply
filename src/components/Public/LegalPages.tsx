import React from 'react';
import { Shield, FileText, Cookie, Globe } from 'lucide-react';
import MaterialCard from '../UI/MaterialCard';
import PublicLayout from './PublicLayout';

// Privacy Policy Component
export const PrivacyPolicy: React.FC = () => {
  return (
    <PublicLayout>
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-blue-700" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600">Last updated: January 1, 2024</p>
          </div>

          <MaterialCard className="p-8 prose prose-lg max-w-none">
            <h2>Introduction</h2>
            <p>
              StartupComply ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
              explains how we collect, use, disclose, and safeguard your information when you use our compliance 
              management platform.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect the following personal information:</p>
            <ul>
              <li>Name, email address, and contact information</li>
              <li>Company information and job title</li>
              <li>Account credentials and preferences</li>
              <li>Payment and billing information</li>
            </ul>

            <h3>Usage Information</h3>
            <p>We automatically collect certain information about your use of our services:</p>
            <ul>
              <li>Log data and analytics</li>
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Cookies and similar technologies</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Process transactions and send notifications</li>
              <li>Improve our platform and user experience</li>
              <li>Comply with legal obligations</li>
              <li>Communicate with you about our services</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties without 
              your consent, except as described in this policy. We may share information with:
            </p>
            <ul>
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners with your explicit consent</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your information against unauthorized access, 
              alteration, disclosure, or destruction. This includes encryption, secure servers, and regular 
              security audits.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access and update your personal information</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability and correction</li>
            </ul>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at privacy@startupcomply.com 
              or write to us at 123 Innovation Drive, San Francisco, CA 94105.
            </p>
          </MaterialCard>
        </div>
      </div>
    </PublicLayout>
  );
};

// Terms of Service Component
export const TermsOfService: React.FC = () => {
  return (
    <PublicLayout>
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-green-700" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-gray-600">Last updated: January 1, 2024</p>
          </div>

          <MaterialCard className="p-8 prose prose-lg max-w-none">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing and using StartupComply's services, you agree to be bound by these Terms of Service 
              and all applicable laws and regulations. If you do not agree with any of these terms, you are 
              prohibited from using our services.
            </p>

            <h2>Description of Service</h2>
            <p>
              StartupComply provides a cloud-based compliance management platform that helps organizations 
              manage regulatory requirements, track compliance tasks, and maintain audit readiness.
            </p>

            <h2>User Accounts</h2>
            <p>To use our services, you must:</p>
            <ul>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Be responsible for all activities under your account</li>
            </ul>

            <h2>Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use our services for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with or disrupt our services</li>
              <li>Upload malicious code or harmful content</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              All content, features, and functionality of our services are owned by StartupComply and are 
              protected by copyright, trademark, and other intellectual property laws.
            </p>

            <h2>Payment Terms</h2>
            <p>
              Subscription fees are billed in advance on a monthly or annual basis. All fees are non-refundable 
              except as required by law. We reserve the right to change our pricing with 30 days' notice.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              StartupComply shall not be liable for any indirect, incidental, special, consequential, or 
              punitive damages resulting from your use of our services.
            </p>

            <h2>Termination</h2>
            <p>
              We may terminate or suspend your account at any time for violations of these terms. You may 
              cancel your subscription at any time through your account settings.
            </p>

            <h2>Contact Information</h2>
            <p>
              For questions about these Terms of Service, contact us at legal@startupcomply.com or 
              123 Innovation Drive, San Francisco, CA 94105.
            </p>
          </MaterialCard>
        </div>
      </div>
    </PublicLayout>
  );
};

// Cookie Policy Component
export const CookiePolicy: React.FC = () => {
  return (
    <PublicLayout>
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Cookie className="w-8 h-8 text-yellow-700" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
            <p className="text-gray-600">Last updated: January 1, 2024</p>
          </div>

          <MaterialCard className="p-8 prose prose-lg max-w-none">
            <h2>What Are Cookies</h2>
            <p>
              Cookies are small text files that are stored on your device when you visit our website. They help 
              us provide you with a better experience by remembering your preferences and analyzing how you use 
              our services.
            </p>

            <h2>Types of Cookies We Use</h2>
            
            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for our website to function properly. They enable basic features like 
              page navigation, access to secure areas, and authentication.
            </p>

            <h3>Analytics Cookies</h3>
            <p>
              We use analytics cookies to understand how visitors interact with our website. This helps us 
              improve our services and user experience.
            </p>

            <h3>Functional Cookies</h3>
            <p>
              These cookies enable enhanced functionality and personalization, such as remembering your 
              preferences and settings.
            </p>

            <h3>Marketing Cookies</h3>
            <p>
              With your consent, we may use marketing cookies to deliver relevant advertisements and track 
              the effectiveness of our marketing campaigns.
            </p>

            <h2>Managing Cookies</h2>
            <p>
              You can control and manage cookies in several ways:
            </p>
            <ul>
              <li>Browser settings: Most browsers allow you to block or delete cookies</li>
              <li>Cookie preferences: Use our cookie consent tool to manage your preferences</li>
              <li>Opt-out tools: Use industry opt-out tools for advertising cookies</li>
            </ul>

            <h2>Third-Party Cookies</h2>
            <p>
              We may use third-party services that set their own cookies. These include analytics providers, 
              advertising networks, and social media platforms. Please refer to their privacy policies for 
              more information.
            </p>

            <h2>Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. We will notify you of any significant 
              changes by posting the new policy on our website.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact us at privacy@startupcomply.com.
            </p>
          </MaterialCard>
        </div>
      </div>
    </PublicLayout>
  );
};

// GDPR Information Component
export const GDPRInfo: React.FC = () => {
  return (
    <PublicLayout>
      <div className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-purple-700" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">GDPR Compliance</h1>
            <p className="text-gray-600">Your rights under the General Data Protection Regulation</p>
          </div>

          <MaterialCard className="p-8 prose prose-lg max-w-none">
            <h2>Our Commitment to GDPR</h2>
            <p>
              StartupComply is committed to protecting your personal data and respecting your privacy rights 
              under the General Data Protection Regulation (GDPR). This page explains your rights and how 
              we handle your personal data.
            </p>

            <h2>Your Rights Under GDPR</h2>
            
            <h3>Right to Information</h3>
            <p>
              You have the right to know what personal data we collect, how we use it, and who we share it with.
            </p>

            <h3>Right of Access</h3>
            <p>
              You can request a copy of the personal data we hold about you at any time.
            </p>

            <h3>Right to Rectification</h3>
            <p>
              You can ask us to correct any inaccurate or incomplete personal data.
            </p>

            <h3>Right to Erasure</h3>
            <p>
              You can request that we delete your personal data in certain circumstances.
            </p>

            <h3>Right to Restrict Processing</h3>
            <p>
              You can ask us to limit how we use your personal data in certain situations.
            </p>

            <h3>Right to Data Portability</h3>
            <p>
              You can request a copy of your data in a machine-readable format to transfer to another service.
            </p>

            <h3>Right to Object</h3>
            <p>
              You can object to certain types of processing, including direct marketing.
            </p>

            <h2>Legal Basis for Processing</h2>
            <p>We process your personal data based on:</p>
            <ul>
              <li>Contract performance: To provide our services</li>
              <li>Legitimate interests: To improve our services and prevent fraud</li>
              <li>Legal compliance: To meet regulatory requirements</li>
              <li>Consent: For marketing communications and optional features</li>
            </ul>

            <h2>Data Transfers</h2>
            <p>
              When we transfer your data outside the EU, we ensure appropriate safeguards are in place, 
              including adequacy decisions, standard contractual clauses, or certification schemes.
            </p>

            <h2>Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfill the purposes for which 
              it was collected, comply with legal obligations, and resolve disputes.
            </p>

            <h2>Exercising Your Rights</h2>
            <p>
              To exercise any of your GDPR rights, please contact our Data Protection Officer at 
              dpo@startupcomply.com or use the contact form on our website. We will respond to your 
              request within 30 days.
            </p>

            <h2>Complaints</h2>
            <p>
              If you believe we have not handled your personal data properly, you have the right to lodge 
              a complaint with your local data protection authority.
            </p>
          </MaterialCard>
        </div>
      </div>
    </PublicLayout>
  );
};