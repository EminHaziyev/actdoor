const jwt = require('jsonwebtoken');
const User = require('../models/user');

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.githubId, username: user.username }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.githubId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

exports.githubCallback = (req, res) => {
  const token = jwt.sign({ id: req.user.githubId, username: req.user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 });
  res.redirect('/profile');
};

// Route to refresh the access token
exports.refreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!refreshToken) return res.status(401).json({ error: 'Refresh token required' });

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid refresh token' });

    const user = await User.findOne({ githubId: decoded.id });
    if (!user) return res.status(403).json({ error: 'User not found' });

    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  });
};


exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    });

    res.json({ message: 'Logged out successfully' });
  });
};