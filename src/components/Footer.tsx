import React from 'react';
import { LinkIcon, Github, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center mb-6 md:mb-0">
            <LinkIcon className="w-6 h-6 text-blue-400 mr-2" />
            <span className="text-xl font-bold text-white">LinkBrief</span>
          </div>
          
          <nav className="flex flex-wrap justify-center space-x-6">
            <a href="#" className="hover:text-blue-400 transition-colors duration-200 mb-2">Home</a>
            <a href="#features" className="hover:text-blue-400 transition-colors duration-200 mb-2">Features</a>
            <a href="#shorten" className="hover:text-blue-400 transition-colors duration-200 mb-2">Shorten URL</a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-200 mb-2">API</a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-200 mb-2">Privacy</a>
            <a href="#" className="hover:text-blue-400 transition-colors duration-200 mb-2">Terms</a>
          </nav>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} LinkBrief. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;