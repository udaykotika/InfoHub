const express = require('express');
const router = express.Router();

// Mock exchange rates - replace with real API call
const MOCK_RATES = {
  USD: 0.012,
  // 1 INR = 0.012 USD
  EUR: 0.011 // 1 INR = 0.011 EUR
};
router.get('/currency', async (req, res) => {
  try {
    const {
      amount,
      to
    } = req.query;

    // Input validation
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({
        error: 'Valid amount is required'
      });
    }
    if (!to || !['USD', 'EUR'].includes(to.toUpperCase())) {
      return res.status(400).json({
        error: 'Target currency must be USD or EUR'
      });
    }
    const targetCurrency = to.toUpperCase();
    const rate = MOCK_RATES[targetCurrency];
    const converted = numAmount * rate;
    res.json({
      amount: numAmount,
      from: 'INR',
      to: targetCurrency,
      converted: parseFloat(converted.toFixed(2)),
      rate: rate
    });

    /*
    // Real API implementation example (using exchangerate-api.com):
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/INR`
    );
    
    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch exchange rates' });
    }
    
    const data = await response.json();
    const rate = data.rates[targetCurrency];
    const converted = numAmount * rate;
    
    res.json({
      amount: numAmount,
      from: 'INR',
      to: targetCurrency,
      converted: parseFloat(converted.toFixed(2)),
      rate: rate
    });
    */
  } catch (error) {
    console.error('Currency API error:', error);
    res.status(500).json({
      error: 'Failed to convert currency'
    });
  }
});
module.exports = router;