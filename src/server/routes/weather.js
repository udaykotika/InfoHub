const express = require('express');
const router = express.Router();

// Mock weather data - replace with real API call to OpenWeatherMap
const mockWeatherData = {
  'mumbai': {
    temp: 32,
    desc: 'partly cloudy',
    humidity: 75,
    wind: 15
  },
  'delhi': {
    temp: 28,
    desc: 'clear sky',
    humidity: 45,
    wind: 12
  },
  'bangalore': {
    temp: 25,
    desc: 'light rain',
    humidity: 80,
    wind: 8
  },
  'chennai': {
    temp: 34,
    desc: 'sunny',
    humidity: 70,
    wind: 18
  },
  'kolkata': {
    temp: 30,
    desc: 'cloudy',
    humidity: 85,
    wind: 10
  }
};
router.get('/weather', async (req, res) => {
  try {
    const {
      city
    } = req.query;

    // Input validation
    if (!city || typeof city !== 'string' || city.trim().length === 0) {
      return res.status(400).json({
        error: 'City name is required'
      });
    }
    const cityLower = city.toLowerCase().trim();

    // Mock data lookup
    const weatherData = mockWeatherData[cityLower];
    if (!weatherData) {
      // For demo purposes, return generic data for unknown cities
      return res.json({
        city: city.charAt(0).toUpperCase() + city.slice(1),
        temperature: Math.floor(Math.random() * 15) + 20,
        description: 'partly cloudy',
        humidity: Math.floor(Math.random() * 30) + 50,
        windSpeed: Math.floor(Math.random() * 15) + 5
      });
    }
    res.json({
      city: city.charAt(0).toUpperCase() + city.slice(1),
      temperature: weatherData.temp,
      description: weatherData.desc,
      humidity: weatherData.humidity,
      windSpeed: weatherData.wind
    });

    /* 
    // Real API implementation example (requires OpenWeatherMap API key):
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      return res.status(404).json({ error: 'City not found' });
    }
    
    const data = await response.json();
    res.json({
      city: data.name,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6) // Convert m/s to km/h
    });
    */
  } catch (error) {
    console.error('Weather API error:', error);
    res.status(500).json({
      error: 'Failed to fetch weather data'
    });
  }
});
module.exports = router;