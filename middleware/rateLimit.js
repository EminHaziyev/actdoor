const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 5*60 * 1000, // 5 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true, // Sends rate limit info in headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

module.exports = apiLimiter;
