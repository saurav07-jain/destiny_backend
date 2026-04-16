require('dotenv').config();
const app = require('./src/app');

// For local development only — Vercel handles the server itself
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
