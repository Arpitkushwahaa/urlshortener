import React from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import URLShortener from './components/URLShortener';
import RecentURLs from './components/RecentURLs';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Toaster position="top-center" />
      <Navbar />
      <main>
        <Hero />
        <URLShortener />
        <RecentURLs />
        <Features />
      </main>
      <Footer />
    </div>
  );
}

export default App;