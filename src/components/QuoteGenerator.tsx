import React, { useEffect, useState } from 'react';
import { RefreshCwIcon, QuoteIcon } from 'lucide-react';
import { Quote } from '../types';
import { mockQuoteApi } from '../utils/mockApi';
export function QuoteGenerator() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fetchQuote = async () => {
    setLoading(true);
    setError('');
    try {
      // Try real API first, fallback to mock data
      try {
        const response = await fetch('/api/quote');
        if (response.ok) {
          const data = await response.json();
          setQuote(data);
          setLoading(false);
          return;
        }
      } catch (apiError) {
        // API not available, use mock data
      }
      // Use mock data
      const data = await mockQuoteApi();
      setQuote(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quote');
      setQuote(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchQuote();
  }, []);
  return <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Motivational Quote
          </h2>
          <button onClick={fetchQuote} disabled={loading} className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors disabled:text-gray-400" title="Get new quote">
            <RefreshCwIcon size={24} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p>{error}</p>
            <button onClick={fetchQuote} className="mt-2 text-sm underline hover:no-underline">
              Try again
            </button>
          </div>}

        {quote && !loading && <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8 relative">
            <QuoteIcon className="absolute top-4 left-4 text-purple-300" size={32} />

            <div className="pl-8">
              <p className="text-xl text-gray-800 leading-relaxed mb-4 italic">
                "{quote.text}"
              </p>
              <p className="text-right text-gray-700 font-medium">
                — {quote.author}
              </p>
            </div>
          </div>}

        {loading && <div className="bg-gray-50 rounded-lg p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Loading inspiration...</p>
          </div>}
      </div>
    </div>;
}