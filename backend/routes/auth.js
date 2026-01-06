import express from 'express';
import passport from 'passport';

const router = express.Router();

// Google OAuth Login
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth Callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect(process.env.FRONTEND_URL);
  }
);

// Get current user
router.get('/current-user', (req, res) => {
  if (req.user) {
    res.json({ 
      authenticated: true, 
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
      }
    });
  } else {
    res.json({ authenticated: false, user: null });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

export default router;
