import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, Star, ArrowRight } from 'lucide-react';
import MaterialButton from '../UI/MaterialButton';
import MaterialCard from '../UI/MaterialCard';
import PublicLayout from './PublicLayout';

const PricingPage: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small teams getting started with compliance',
      monthlyPrice: 49,
      annualPrice: 39,
      features: [
        'Up to 5 team members',
        'Basic compliance checklists',
        '50+ document templates',
        'Email support',
        'Basic reporting',
        'GDPR & CCPA frameworks',
      ],
      limitations: [
        'Limited integrations',
        'No custom frameworks',
        'No priority support',
      ],
      popular: false,
      cta: 'Start Free Trial',
    },
    {
      name: 'Professional',
      description: 'Ideal for growing companies with complex compliance needs',
      monthlyPrice: 149,
      annualPrice: 119,
      features: [
        'Up to 25 team members',
        'Advanced compliance automation',
        '200+ document templates',
        'Priority support',
        'Advanced analytics',
        'All compliance frameworks',
        'Custom checklists',
        'API access',
        'SSO integration',
      ],
      limitations: [
        'Limited custom branding',
      ],
      popular: true,
      cta: 'Start Free Trial',
    },
    {
      name: 'Enterprise',
      description: 'For large organizations requiring maximum flexibility',
      monthlyPrice: 399,
      annualPrice: 319,
      features: [
        'Unlimited team members',
        'White-label solution',
        'Custom integrations',
        'Dedicated account manager',
        'Custom compliance frameworks',
        'Advanced security features',
        'On-premise deployment',
        'Custom training',
        'SLA guarantee',
      ],
      limitations: [],
      popular: false,
      cta: 'Contact Sales',
    },
  ];

  const faqs = [
    {
      question: 'What compliance frameworks do you support?',
      answer: 'We support 50+ frameworks including GDPR, CCPA, SOC 2, ISO 27001, HIPAA, PCI DSS, and many more. Our library is constantly expanding based on customer needs.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time. There are no long-term contracts or cancellation fees.',
    },
    {
      question: 'Do you offer a free trial?',
      answer: 'Yes, we offer a 14-day free trial for all plans. No credit card required to get started.',
    },
    {
      question: 'What kind of support do you provide?',
      answer: 'We provide email support for all plans, with priority support for Professional and Enterprise customers. Enterprise customers also get a dedicated account manager.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use enterprise-grade security measures including encryption at rest and in transit, regular security audits, and SOC 2 Type II compliance.',
    },
    {
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades take effect at the next billing cycle.',
    },
  ];

  const getPrice = (plan: typeof plans[0]) => {
    return isAnnual ? plan.annualPrice : plan.monthlyPrice;
  };

  const getSavings = (plan: typeof plans[0]) => {
    const monthlyCost = plan.monthlyPrice * 12;
    const annualCost = plan.annualPrice * 12;
    return Math.round(((monthlyCost - annualCost) / monthlyCost) * 100);
  };

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Choose the plan that fits your compliance needs. All plans include our core features 
            with no hidden fees or surprise charges.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-lg ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isAnnual ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isAnnual ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-lg ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Save up to 20%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <MaterialCard 
                key={index} 
                className={`p-8 relative ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}
                hoverable
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">${getPrice(plan)}</span>
                    <span className="text-gray-500">/month</span>
                  </div>
                  
                  {isAnnual && (
                    <p className="text-sm text-green-600 font-medium">
                      Save {getSavings(plan)}% with annual billing
                    </p>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, limitationIndex) => (
                    <div key={limitationIndex} className="flex items-center">
                      <X className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  {plan.cta === 'Contact Sales' ? (
                    <Link to="/contact">
                      <MaterialButton 
                        className={`w-full ${plan.popular ? '' : 'variant-outlined'}`}
                        variant={plan.popular ? 'filled' : 'outlined'}
                      >
                        {plan.cta}
                      </MaterialButton>
                    </Link>
                  ) : (
                    <Link to="/signup">
                      <MaterialButton 
                        className={`w-full ${plan.popular ? '' : 'variant-outlined'}`}
                        variant={plan.popular ? 'filled' : 'outlined'}
                      >
                        {plan.cta}
                      </MaterialButton>
                    </Link>
                  )}
                </div>
              </MaterialCard>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Compare All Features
            </h2>
            <p className="text-xl text-gray-600">
              See exactly what's included in each plan.
            </p>
          </div>

          <MaterialCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Starter</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Professional</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Team Members</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Up to 5</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Up to 25</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Document Templates</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">50+</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">200+</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-600">All + Custom</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">API Access</td>
                    <td className="px-6 py-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">SSO Integration</td>
                    <td className="px-6 py-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Priority Support</td>
                    <td className="px-6 py-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Dedicated Account Manager</td>
                    <td className="px-6 py-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </MaterialCard>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <MaterialCard key={index} className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </MaterialCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies who trust StartupComply for their compliance needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/signup">
              <MaterialButton size="lg" className="bg-white text-blue-700 hover:bg-gray-50">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </MaterialButton>
            </Link>
            <Link to="/contact">
              <MaterialButton variant="outlined" size="lg" className="border-white text-white hover:bg-blue-600">
                Contact Sales
              </MaterialButton>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default PricingPage;