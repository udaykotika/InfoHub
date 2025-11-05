import React, { useState } from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { CurrencyData } from '../types';
import { mockCurrencyApi } from '../utils/mockApi';
export function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [targetCurrency, setTargetCurrency] = useState<'USD' | 'EUR'>('USD');
  const [result, setResult] = useState<CurrencyData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const convertCurrency = async () => {
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // Try real API first, fallback to mock data
      try {
        const response = await fetch(`/api/currency?amount=${numAmount}&to=${targetCurrency}`);
        if (response.ok) {
          const data = await response.json();
          setResult(data);
          setLoading(false);
          return;
        }
      } catch (apiError) {
        // API not available, use mock data
      }
      // Use mock data
      const data = await mockCurrencyApi(numAmount, targetCurrency);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to convert currency');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      convertCurrency();
    }
  };
  return <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Currency Converter
        </h2>
        <p className="text-gray-600 mb-6">
          Convert Indian Rupees (INR) to USD or EUR
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount in INR
            </label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} onKeyPress={handleKeyPress} placeholder="Enter amount..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Convert to
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="USD" checked={targetCurrency === 'USD'} onChange={e => setTargetCurrency(e.target.value as 'USD' | 'EUR')} className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">USD ($)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" value="EUR" checked={targetCurrency === 'EUR'} onChange={e => setTargetCurrency(e.target.value as 'USD' | 'EUR')} className="w-4 h-4 text-green-600" />
                <span className="text-gray-700">EUR (€)</span>
              </label>
            </div>
          </div>

          <button onClick={convertCurrency} disabled={loading} className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium">
            {loading ? 'Converting...' : 'Convert'}
          </button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>}

        {result && !loading && <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <p className="text-sm text-gray-600 mb-1">From</p>
                <p className="text-2xl font-bold text-gray-800">
                  ₹{result.amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">INR</p>
              </div>

              <ArrowRightIcon className="text-green-600 mx-4" size={32} />

              <div className="text-center flex-1">
                <p className="text-sm text-gray-600 mb-1">To</p>
                <p className="text-2xl font-bold text-green-600">
                  {result.to === 'USD' ? '$' : '€'}
                  {result.converted.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">{result.to}</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-green-200 text-center">
              <p className="text-sm text-gray-600">
                Exchange Rate: 1 INR = {result.to === 'USD' ? '$' : '€'}
                {result.rate.toFixed(4)}
              </p>
            </div>
          </div>}
      </div>
    </div>;
}