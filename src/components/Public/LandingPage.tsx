import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, Users, FileText, ArrowRight, Star, Play } from 'lucide-react';
import MaterialButton from '../UI/MaterialButton';
import MaterialCard from '../UI/MaterialCard';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Comprehensive Compliance',
      description: 'Stay compliant with GDPR, SOC 2, ISO 27001, HIPAA, and more regulatory frameworks.',
    },
    {
      icon: CheckCircle,
      title: 'Smart Checklists',
      description: 'Interactive checklists that guide you through complex compliance requirements step by step.',
    },
    {
      icon: FileText,
      title: 'Document Templates',
      description: 'Access hundreds of pre-built templates for policies, procedures, and compliance documents.',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Assign tasks, track progress, and collaborate with your team on compliance initiatives.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Compliance Officer',
      company: 'TechStart Inc.',
      content: 'StartupComply reduced our GDPR compliance time from months to weeks. The templates are incredibly comprehensive.',
      rating: 5,
    },
    {
      name: 'Michael Rodriguez',
      role: 'CTO',
      company: 'DataFlow Solutions',
      content: 'The SOC 2 preparation checklist was a game-changer. We passed our audit on the first try.',
      rating: 5,
    },
    {
      name: 'Emily Johnson',
      role: 'Legal Counsel',
      company: 'HealthTech Pro',
      content: 'Finally, a compliance platform that understands the needs of growing companies. Highly recommended.',
      rating: 5,
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Companies Trust Us' },
    { value: '99.8%', label: 'Audit Success Rate' },
    { value: '50+', label: 'Compliance Frameworks' },
    { value: '24/7', label: 'Expert Support' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 safe-area-top">
        <div className="container-responsive">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-700" />
              <span className="text-lg sm:text-xl font-medium text-gray-900">StartupComply</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link to="/pricing" className="text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              <Link to="/login">
                <MaterialButton variant="outlined" size="sm">Sign In</MaterialButton>
              </Link>
              <Link to="/signup">
                <MaterialButton size="sm">Get Started</MaterialButton>
              </Link>
            </div>

            {/* Mobile menu */}
            <div className="md:hidden flex items-center space-x-2">
              <Link to="/login">
                <MaterialButton variant="outlined" size="sm" className="text-xs px-3 py-2">
                  Sign In
                </MaterialButton>
              </Link>
              <Link to="/signup">
                <MaterialButton size="sm" className="text-xs px-3 py-2">
                  Start Free
                </MaterialButton>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 sm:py-16 lg:py-20">
        <div className="container-responsive">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                Compliance Made
                <span className="text-blue-700"> Simple</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
                Streamline your regulatory compliance with automated checklists, expert templates, 
                and intelligent guidance. Built for startups and growing companies.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link to="/signup">
                  <MaterialButton size="lg" className="w-full sm:w-auto touch-target">
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </MaterialButton>
                </Link>
                <MaterialButton variant="outlined" size="lg" className="w-full sm:w-auto touch-target">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </MaterialButton>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-4">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              <MaterialCard className="p-4 sm:p-6 lg:p-8 transform rotate-1 lg:rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <span className="text-base sm:text-lg font-medium">GDPR Compliance</span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs sm:text-sm">95% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full w-[95%]"></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                    <div>✅ Privacy Policy Updated</div>
                    <div>✅ Data Audit Complete</div>
                    <div>✅ Staff Training Done</div>
                    <div>🔄 Final Review Pending</div>
                  </div>
                </div>
              </MaterialCard>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container-responsive">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-700 mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-sm sm:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Compliance
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              From initial assessment to ongoing monitoring, we provide the tools and guidance 
              to keep your company compliant and audit-ready.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <MaterialCard key={index} className="p-4 sm:p-6 text-center h-full" hoverable>
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-700" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
                </MaterialCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Compliance Teams Worldwide
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              See what our customers say about their compliance journey with StartupComply.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <MaterialCard key={index} className="p-4 sm:p-6" hoverable>
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-600 mb-6">"{testimonial.content}"</p>
                <div>
                  <div className="text-sm sm:text-base font-medium text-gray-900">{testimonial.name}</div>
                  <div className="text-xs sm:text-sm text-gray-500">{testimonial.role}</div>
                  <div className="text-xs sm:text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </MaterialCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-blue-700">
        <div className="container-responsive text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Simplify Your Compliance?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Join thousands of companies who trust StartupComply to keep them compliant and audit-ready.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link to="/signup">
              <MaterialButton size="lg" className="bg-white text-blue-700 hover:bg-gray-50 w-full sm:w-auto touch-target">
                Start Your Free Trial
              </MaterialButton>
            </Link>
            <Link to="/contact">
              <MaterialButton variant="outlined" size="lg" className="border-white text-white hover:bg-blue-600 w-full sm:w-auto touch-target">
                Talk to Sales
              </MaterialButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 safe-area-bottom">
        <div className="container-responsive">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
                <span className="text-lg sm:text-xl font-medium">StartupComply</span>
              </div>
              <p className="text-sm sm:text-base text-gray-400">
                Making compliance simple for startups and growing companies worldwide.
              </p>
            </div>
            
            <div>
              <h3 className="text-sm sm:text-base font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/features" className="hover:text-white">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/integrations" className="hover:text-white">Integrations</Link></li>
                <li><Link to="/security" className="hover:text-white">Security</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm sm:text-base font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-white">About</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm sm:text-base font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/cookies" className="hover:text-white">Cookie Policy</Link></li>
                <li><Link to="/gdpr" className="hover:text-white">GDPR</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 StartupComply. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;