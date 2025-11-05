import React, { useState } from 'react';
import { TabButton } from './components/TabButton';
import { Weather } from './components/Weather';
import { CurrencyConverter } from './components/CurrencyConverter';
import { QuoteGenerator } from './components/QuoteGenerator';
import { TabType } from './types';
export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('weather');
  return <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">InfoHub</h1>
          <p className="text-gray-600">Your everyday utilities in one place</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg overflow-hidden shadow-md">
            <TabButton active={activeTab === 'weather'} onClick={() => setActiveTab('weather')}>
              Weather
            </TabButton>
            <TabButton active={activeTab === 'currency'} onClick={() => setActiveTab('currency')}>
              Currency
            </TabButton>
            <TabButton active={activeTab === 'quotes'} onClick={() => setActiveTab('quotes')}>
              Quotes
            </TabButton>
          </div>
        </div>

        {/* Active Module */}
        <div className="animate-fadeIn">
          {activeTab === 'weather' && <Weather />}
          {activeTab === 'currency' && <CurrencyConverter />}
          {activeTab === 'quotes' && <QuoteGenerator />}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-600 text-sm">
          <p>Built for ByteXL • Practical Engineering Tools</p>
        </div>
      </div>
    </div>;
}