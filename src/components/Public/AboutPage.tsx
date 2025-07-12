import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Target, Award, ArrowRight } from 'lucide-react';
import MaterialButton from '../UI/MaterialButton';
import MaterialCard from '../UI/MaterialCard';
import PublicLayout from './PublicLayout';

const AboutPage: React.FC = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-Founder',
      bio: 'Former compliance officer at Fortune 500 companies with 15+ years of regulatory experience.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Co-Founder',
      bio: 'Ex-Google engineer passionate about building tools that simplify complex processes.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Compliance',
      bio: 'Legal expert specializing in data privacy and international regulatory frameworks.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'David Kim',
      role: 'Head of Product',
      bio: 'Product leader focused on creating intuitive experiences for complex compliance workflows.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'We prioritize the security and privacy of your data above all else.',
    },
    {
      icon: Users,
      title: 'Customer Success',
      description: 'Your compliance success is our success. We\'re here to support you every step of the way.',
    },
    {
      icon: Target,
      title: 'Simplicity',
      description: 'We believe compliance should be straightforward, not overwhelming.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from product quality to customer service.',
    },
  ];

  const milestones = [
    { year: '2020', event: 'StartupComply founded by compliance and tech veterans' },
    { year: '2021', event: 'Launched with 50+ compliance templates and frameworks' },
    { year: '2022', event: 'Reached 1,000+ customers and $5M in funding' },
    { year: '2023', event: 'Expanded to serve enterprise clients and international markets' },
    { year: '2024', event: 'Serving 10,000+ companies with 99.8% audit success rate' },
  ];

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              About StartupComply
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              We're on a mission to make regulatory compliance accessible, understandable, 
              and manageable for companies of all sizes.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Compliance shouldn't be a barrier to innovation. We believe that every company, 
                regardless of size or resources, should have access to the tools and guidance 
                needed to meet regulatory requirements confidently.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Founded by compliance professionals and technology experts, StartupComply bridges 
                the gap between complex regulations and practical implementation.
              </p>
              <Link to="/contact">
                <MaterialButton>
                  Get in Touch
                  <ArrowRight className="w-5 h-5 ml-2" />
                </MaterialButton>
              </Link>
            </div>
            <div>
              <MaterialCard className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-700 mb-2">10,000+</div>
                    <div className="text-gray-600">Companies Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">99.8%</div>
                    <div className="text-gray-600">Audit Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
                    <div className="text-gray-600">Compliance Frameworks</div>
                  </div>
                </div>
              </MaterialCard>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <MaterialCard key={index} className="p-6 text-center h-full">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-700" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </MaterialCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Experienced professionals dedicated to your compliance success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <MaterialCard key={index} className="p-6 text-center" hoverable>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-medium text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </MaterialCard>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Key milestones in our mission to simplify compliance.
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-6">
                <div className="flex-shrink-0 w-20 h-20 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold">
                  {milestone.year}
                </div>
                <MaterialCard className="flex-1 p-6">
                  <p className="text-lg text-gray-700">{milestone.event}</p>
                </MaterialCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Join Our Mission?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're looking to simplify your compliance or join our team, 
            we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/signup">
              <MaterialButton size="lg" className="bg-white text-blue-700 hover:bg-gray-50">
                Start Your Journey
              </MaterialButton>
            </Link>
            <Link to="/careers">
              <MaterialButton variant="outlined" size="lg" className="border-white text-white hover:bg-blue-600">
                View Careers
              </MaterialButton>
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default AboutPage;