const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.ensureAuthenticated = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ error: 'Token expired, please refresh' });
      }
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = await User.findOne({ githubId: decoded.id });
    if (!req.user) return res.status(401).json({ error: 'User not found' });

    next();
  });
};
