import express from 'express';
import { searchSongs, getSuggestions, getVideoDetails } from '../controllers/youtubeController.js';
import { isAuthenticated } from '../middleware/auth.js';
import { searchLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.get('/search', isAuthenticated, searchLimiter, searchSongs);
router.get('/suggestions', isAuthenticated, getSuggestions);
router.get('/video/:videoId', isAuthenticated, getVideoDetails);

export default router;
