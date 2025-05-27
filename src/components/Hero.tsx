import React from 'react';
import { LinkIcon } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <LinkIcon size={40} className="text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Transform Your Links,{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Simplify Sharing
          </span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Create shortened URLs that are easy to share and track with our powerful URL shortener.
          Perfect for social media, email campaigns, or anywhere you need concise links.
        </p>
        <a 
          href="#shorten" 
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-200"
        >
          Shorten URL Now
        </a>
      </div>
    </section>
  );
};

export default Hero;