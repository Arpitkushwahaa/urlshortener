import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import { LinkIcon, Copy, Check, Loader2 } from 'lucide-react';
import { shortenUrl } from '../services/urlService';

const URLShortener: React.FC = () => {
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShortUrl('');
    
    if (!url) {
      setError('Please enter a URL to shorten');
      return;
    }

    try {
      setIsLoading(true);
      const result = await shortenUrl(url, customCode);
      setShortUrl(result.shortUrl);
      toast.success('URL shortened successfully!');
    } catch (err: any) {
      setError(err.message || 'Failed to shorten URL');
      toast.error(err.message || 'Failed to shorten URL');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    setCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="shorten" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <LinkIcon className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Shorten Your URL</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                Enter your long URL
              </label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very/long/url/that/needs/shortening"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="customCode" className="block text-sm font-medium text-gray-700 mb-1">
                Custom short code (optional)
              </label>
              <input
                type="text"
                id="customCode"
                value={customCode}
                onChange={(e) => setCustomCode(e.target.value)}
                placeholder="my-custom-link"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {error && (
              <div className="text-red-500 text-sm py-2">{error}</div>
            )}
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Shortening...
                </span>
              ) : (
                'Shorten URL'
              )}
            </button>
          </form>
          
          {shortUrl && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="mb-2 sm:mb-0">
                  <p className="text-sm text-gray-500 mb-1">Your shortened URL</p>
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-medium hover:underline break-all"
                  >
                    {shortUrl}
                  </a>
                </div>
                <CopyToClipboard text={shortUrl} onCopy={handleCopy}>
                  <button
                    className={`mt-2 sm:mt-0 px-4 py-2 rounded-md flex items-center transition-colors ${
                      copied 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </>
                    )}
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default URLShortener;