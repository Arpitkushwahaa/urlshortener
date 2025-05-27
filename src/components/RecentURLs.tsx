import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import { Copy, Check, Clock, ExternalLink, BarChart } from 'lucide-react';
import { getRecentUrls } from '../services/urlService';
import { UrlType } from '../types';

const RecentURLs: React.FC = () => {
  const [urls, setUrls] = useState<UrlType[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const urlData = await getRecentUrls();
        setUrls(urlData);
      } catch (error) {
        console.error('Error fetching URLs:', error);
        toast.error('Failed to load recent URLs');
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  const handleCopy = (id: string) => {
    setCopiedId(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const truncateUrl = (url: string, maxLength = 50) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + '...';
  };

  return (
    <section id="history" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Clock className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Recent URLs</h2>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading recent URLs...</p>
            </div>
          ) : urls.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <p className="text-gray-600">No URLs have been shortened yet.</p>
              <a 
                href="#shorten" 
                className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Shorten Your First URL
              </a>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Original URL
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Short URL
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Clicks
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {urls.map((url) => (
                      <tr key={url.shortCode} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a 
                            href={url.originalUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-900 hover:text-blue-600 font-medium flex items-center"
                          >
                            <span className="truncate max-w-xs inline-block" title={url.originalUrl}>
                              {truncateUrl(url.originalUrl)}
                            </span>
                            <ExternalLink className="w-4 h-4 ml-2 inline-flex shrink-0" />
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a 
                            href={url.shortUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline font-medium"
                          >
                            {url.shortUrl.replace(/^https?:\/\//, '')}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(url.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center text-gray-900">
                            <BarChart className="w-4 h-4 mr-1 text-blue-600" />
                            {url.clicks}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <CopyToClipboard text={url.shortUrl} onCopy={() => handleCopy(url.shortCode)}>
                            <button
                              className={`px-3 py-1 rounded-md flex items-center text-sm transition-colors ${
                                copiedId === url.shortCode
                                  ? 'bg-green-100 text-green-600'
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                              }`}
                            >
                              {copiedId === url.shortCode ? (
                                <>
                                  <Check className="w-3 h-3 mr-1" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 mr-1" />
                                  Copy
                                </>
                              )}
                            </button>
                          </CopyToClipboard>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentURLs;