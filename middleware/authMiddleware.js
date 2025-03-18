const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.ensureAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.redirect('/login');
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.redirect('/login');
    req.user = await User.findOne({ githubId: decoded.id });
    next();
  });
};
