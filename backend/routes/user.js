import express from 'express';
import {
  getUserProfile,
  addToRecentlyPlayed,
  getRecentlyPlayed,
  getSearchHistory,
} from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/profile', isAuthenticated, getUserProfile);
router.post('/recently-played', isAuthenticated, addToRecentlyPlayed);
router.get('/recently-played', isAuthenticated, getRecentlyPlayed);
router.get('/search-history', isAuthenticated, getSearchHistory);

export default router;
