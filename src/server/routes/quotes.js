const express = require('express');
const router = express.Router();

// Collection of motivational quotes
const quotes = [{
  text: "The only way to do great work is to love what you do.",
  author: "Steve Jobs"
}, {
  text: "Innovation distinguishes between a leader and a follower.",
  author: "Steve Jobs"
}, {
  text: "Code is like humor. When you have to explain it, it's bad.",
  author: "Cory House"
}, {
  text: "First, solve the problem. Then, write the code.",
  author: "John Johnson"
}, {
  text: "Experience is the name everyone gives to their mistakes.",
  author: "Oscar Wilde"
}, {
  text: "The best error message is the one that never shows up.",
  author: "Thomas Fuchs"
}, {
  text: "Simplicity is the soul of efficiency.",
  author: "Austin Freeman"
}, {
  text: "Make it work, make it right, make it fast.",
  author: "Kent Beck"
}, {
  text: "Learning never exhausts the mind.",
  author: "Leonardo da Vinci"
}, {
  text: "The expert in anything was once a beginner.",
  author: "Helen Hayes"
}, {
  text: "Don't watch the clock; do what it does. Keep going.",
  author: "Sam Levenson"
}, {
  text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  author: "Winston Churchill"
}, {
  text: "The only impossible journey is the one you never begin.",
  author: "Tony Robbins"
}, {
  text: "Believe you can and you're halfway there.",
  author: "Theodore Roosevelt"
}, {
  text: "Quality is not an act, it is a habit.",
  author: "Aristotle"
}];
router.get('/quote', (req, res) => {
  try {
    // Return a random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    res.json(quote);

    /*
    // Real API implementation example (using quotable.io):
    const response = await fetch('https://api.quotable.io/random?tags=technology,inspirational');
    
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    
    const data = await response.json();
    res.json({
      text: data.content,
      author: data.author
    });
    */
  } catch (error) {
    console.error('Quote API error:', error);
    res.status(500).json({
      error: 'Failed to fetch quote'
    });
  }
});
module.exports = router;