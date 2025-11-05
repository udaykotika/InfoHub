// Mock API utilities for standalone operation
import { WeatherData, CurrencyData, Quote } from '../types';

// Mock weather data
const mockWeatherData: Record<string, WeatherData> = {
  mumbai: {
    city: 'Mumbai',
    temperature: 32,
    description: 'partly cloudy',
    humidity: 75,
    windSpeed: 15
  },
  delhi: {
    city: 'Delhi',
    temperature: 28,
    description: 'clear sky',
    humidity: 45,
    windSpeed: 12
  },
  bangalore: {
    city: 'Bangalore',
    temperature: 25,
    description: 'light rain',
    humidity: 80,
    windSpeed: 8
  },
  chennai: {
    city: 'Chennai',
    temperature: 34,
    description: 'sunny',
    humidity: 70,
    windSpeed: 18
  },
  kolkata: {
    city: 'Kolkata',
    temperature: 30,
    description: 'cloudy',
    humidity: 85,
    windSpeed: 10
  },
  hyderabad: {
    city: 'Hyderabad',
    temperature: 31,
    description: 'partly cloudy',
    humidity: 60,
    windSpeed: 14
  },
  pune: {
    city: 'Pune',
    temperature: 29,
    description: 'clear sky',
    humidity: 55,
    windSpeed: 11
  },
  ahmedabad: {
    city: 'Ahmedabad',
    temperature: 33,
    description: 'sunny',
    humidity: 50,
    windSpeed: 13
  }
};

// Mock exchange rates
const EXCHANGE_RATES = {
  USD: 0.012,
  // 1 INR = 0.012 USD
  EUR: 0.011 // 1 INR = 0.011 EUR
};

// Mock quotes
const quotes: Quote[] = [{
  text: 'The only way to do great work is to love what you do.',
  author: 'Steve Jobs'
}, {
  text: 'Innovation distinguishes between a leader and a follower.',
  author: 'Steve Jobs'
}, {
  text: "Code is like humor. When you have to explain it, it's bad.",
  author: 'Cory House'
}, {
  text: 'First, solve the problem. Then, write the code.',
  author: 'John Johnson'
}, {
  text: 'Experience is the name everyone gives to their mistakes.',
  author: 'Oscar Wilde'
}, {
  text: 'The best error message is the one that never shows up.',
  author: 'Thomas Fuchs'
}, {
  text: 'Simplicity is the soul of efficiency.',
  author: 'Austin Freeman'
}, {
  text: 'Make it work, make it right, make it fast.',
  author: 'Kent Beck'
}, {
  text: 'Learning never exhausts the mind.',
  author: 'Leonardo da Vinci'
}, {
  text: 'The expert in anything was once a beginner.',
  author: 'Helen Hayes'
}, {
  text: "Don't watch the clock; do what it does. Keep going.",
  author: 'Sam Levenson'
}, {
  text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
  author: 'Winston Churchill'
}, {
  text: 'The only impossible journey is the one you never begin.',
  author: 'Tony Robbins'
}, {
  text: "Believe you can and you're halfway there.",
  author: 'Theodore Roosevelt'
}, {
  text: 'Quality is not an act, it is a habit.',
  author: 'Aristotle'
}];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const mockWeatherApi = async (city: string): Promise<WeatherData> => {
  await delay(500); // Simulate network delay

  const cityLower = city.toLowerCase().trim();
  const weatherData = mockWeatherData[cityLower];
  if (weatherData) {
    return weatherData;
  }

  // Return generic data for unknown cities
  return {
    city: city.charAt(0).toUpperCase() + city.slice(1),
    temperature: Math.floor(Math.random() * 15) + 20,
    description: 'partly cloudy',
    humidity: Math.floor(Math.random() * 30) + 50,
    windSpeed: Math.floor(Math.random() * 15) + 5
  };
};
export const mockCurrencyApi = async (amount: number, to: 'USD' | 'EUR'): Promise<CurrencyData> => {
  await delay(500); // Simulate network delay

  const rate = EXCHANGE_RATES[to];
  const converted = amount * rate;
  return {
    amount,
    from: 'INR',
    to,
    converted: parseFloat(converted.toFixed(2)),
    rate
  };
};
export const mockQuoteApi = async (): Promise<Quote> => {
  await delay(300); // Simulate network delay

  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};