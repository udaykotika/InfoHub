import React, { useState, Component } from 'react';
import { CloudIcon, WindIcon, DropletIcon } from 'lucide-react';
import { WeatherData } from '../types';
import { mockWeatherApi } from '../utils/mockApi';
export function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // Try real API first, fallback to mock data
      try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        if (response.ok) {
          const data = await response.json();
          setWeather(data);
          setLoading(false);
          return;
        }
      } catch (apiError) {
        // API not available, use mock data
      }
      // Use mock data
      const data = await mockWeatherApi(city);
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };
  return <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Weather Information
        </h2>

        <div className="flex gap-2 mb-6">
          <input type="text" value={city} onChange={e => setCity(e.target.value)} onKeyPress={handleKeyPress} placeholder="Enter city name..." className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button onClick={fetchWeather} disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
            {loading ? 'Loading...' : 'Search'}
          </button>
        </div>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>}

        {weather && !loading && <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
            <div className="text-center mb-4">
              <h3 className="text-3xl font-bold text-gray-800">
                {weather.city}
              </h3>
              <p className="text-5xl font-bold text-blue-600 my-4">
                {weather.temperature}°C
              </p>
              <p className="text-xl text-gray-700 capitalize">
                {weather.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-2 bg-white rounded-lg p-3">
                <DropletIcon className="text-blue-500" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Humidity</p>
                  <p className="text-lg font-semibold">{weather.humidity}%</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white rounded-lg p-3">
                <WindIcon className="text-blue-500" size={24} />
                <div>
                  <p className="text-sm text-gray-600">Wind Speed</p>
                  <p className="text-lg font-semibold">
                    {weather.windSpeed} km/h
                  </p>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </div>;
}