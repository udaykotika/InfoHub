# InfoHub - Practical Utilities in One Place

A full-stack web application built for ByteXL that combines three everyday utilities: Weather Information, Currency Conversion, and Motivational Quotes.

## Features

### 🌤️ Weather Module
- Search weather by city name
- Displays temperature, conditions, humidity, and wind speed
- Clean, visual weather cards
- Error handling for invalid cities

### 💱 Currency Converter
- Convert INR to USD or EUR
- Real-time exchange rates
- Input validation
- Clear conversion display with rates

### 💡 Quote Generator
- Random motivational quotes
- Refresh button for new quotes
- Curated collection of inspiring messages
- Auto-loads on first visit

## Tech Stack

**Frontend:**
- React with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Tab-based navigation (no page reloads)

**Backend:**
- Node.js + Express
- RESTful API design
- CORS enabled
- Error handling middleware

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Install frontend dependencies:**
```bash
npm install
```

2. **Install backend dependencies:**
```bash
cd server
npm install
```

### Running the Application

1. **Start the backend server:**
```bash
cd server
npm start
# Server runs on http://localhost:3001
```

2. **Start the frontend (in a new terminal):**
```bash
npm start
# Frontend runs on http://localhost:3000
```

The frontend will proxy API requests to the backend server.

## API Endpoints

### Weather
```
GET /api/weather?city={cityName}
Response: { city, temperature, description, humidity, windSpeed }
```

### Currency Conversion
```
GET /api/currency?amount={amount}&to={USD|EUR}
Response: { amount, from, to, converted, rate }
```

### Motivational Quote
```
GET /api/quote
Response: { text, author }
```

## Project Structure

```
infohub/
├── src/
│   ├── components/
│   │   ├── Weather.tsx
│   │   ├── CurrencyConverter.tsx
│   │   ├── QuoteGenerator.tsx
│   │   └── TabButton.tsx
│   ├── types.ts
│   ├── App.tsx
│   └── index.tsx
├── server/
│   ├── routes/
│   │   ├── weather.js
│   │   ├── currency.js
│   │   └── quotes.js
│   ├── index.js
│   └── package.json
└── README.md
```

## Upgrading to Real APIs

The current implementation uses mock data. To integrate real APIs:

### Weather (OpenWeatherMap)
1. Sign up at https://openweathermap.org/api
2. Get your API key
3. Uncomment the real API code in `server/routes/weather.js`
4. Add your API key to environment variables

### Currency (ExchangeRate-API)
1. Sign up at https://www.exchangerate-api.com/
2. Uncomment the real API code in `server/routes/currency.js`
3. Update the API endpoint with your key

### Quotes (Quotable)
1. No API key needed
2. Uncomment the real API code in `server/routes/quotes.js`

## Features Implemented

✅ Tab-based navigation without page reloads  
✅ Loading states for all API calls  
✅ Error handling with user-friendly messages  
✅ Input validation on frontend and backend  
✅ Responsive design  
✅ Clean, professional UI  
✅ Graceful error handling  
✅ Mock data for easy testing  

## Future Enhancements

- User preferences (save favorite cities, default currency)
- Weather forecasts (5-day)
- More currency pairs
- Quote categories/filtering
- Dark mode
- Unit tests

## Built For

ByteXL - Making engineering learning practical and connected

---

**Note:** This is a demonstration project showcasing full-stack development skills, including frontend design, backend API development, error handling, and user experience design.
