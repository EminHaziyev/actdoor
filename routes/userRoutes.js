const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const logout = require('../controllers/authController').logout;
const app = express();
const router = express.Router();

router.get('/profile', authMiddleware.ensureAuthenticated, (req, res) => {
  res.render('profile', { name: req.user.username, uniqueKey: req.user.uniqueKey, displayName: req.user.displayName });
});

router.get('/login', (req, res) => res.render('login'));
router.get('/', (req, res) => res.render('index'));
router.post("/resetkey", authMiddleware.ensureAuthenticated, (req, res) => {
  const user = req.user;
  user.uniqueKey = Math.random().toString(36).substring(2, 25);
  user.save()
    .then(() => res.redirect('/profile'))
    .catch(err => res.status(400).json({ message: 'Error resetting key' }));
}); 
app.get("/logout" , (req, res) => {
  logout(req,res)
});
module.exports = router;

