const jwt = require('jsonwebtoken');

exports.githubCallback = (req, res) => {
  const token = jwt.sign({ id: req.user.githubId, username: req.user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: 3600000 });
  res.redirect('/profile');
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  req.logout(() => res.redirect('/'));
};
