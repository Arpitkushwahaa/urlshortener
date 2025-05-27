import React from 'react';
import { Link2, BarChart2, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: <Link2 className="w-8 h-8 text-blue-600" />,
    title: 'Simple URL Shortening',
    description: 'Convert long, unwieldy URLs into short, memorable links in seconds. Perfect for sharing on social media, emails, or anywhere character count matters.'
  },
  {
    icon: <BarChart2 className="w-8 h-8 text-blue-600" />,
    title: 'Click Tracking',
    description: 'Monitor the performance of your shortened links with real-time analytics. Track clicks and understand your audience better.'
  },
  {
    icon: <Shield className="w-8 h-8 text-blue-600" />,
    title: 'Secure & Reliable',
    description: 'All links are stored securely in our MongoDB Atlas database, ensuring high availability and performance for your shortened URLs.'
  },
  {
    icon: <Zap className="w-8 h-8 text-blue-600" />,
    title: 'Custom Short Codes',
    description: 'Create memorable URLs with your own custom short codes, making your links more recognizable and on-brand.'
  }
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose LinkBrief?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our URL shortener provides everything you need to create and manage short links efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
            >
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;