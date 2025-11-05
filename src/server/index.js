const express = require('express');
const cors = require('cors');
const weatherRoutes = require('./routes/weather');
const currencyRoutes = require('./routes/currency');
const quotesRoutes = require('./routes/quotes');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', weatherRoutes);
app.use('/api', currencyRoutes);
app.use('/api', quotesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'InfoHub API is running'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!'
  });
});
app.listen(PORT, () => {
  console.log(`InfoHub API server running on port ${PORT}`);
});