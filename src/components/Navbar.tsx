import React from 'react';
import { Link } from '../components/ui/Link';
import { LinkIcon } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <LinkIcon size={24} className="text-blue-600" />
          <h1 className="text-xl font-bold text-blue-600">LinkBrief</h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="#features">Features</Link>
          <Link href="#shorten">Shorten</Link>
          <Link href="#history">History</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;