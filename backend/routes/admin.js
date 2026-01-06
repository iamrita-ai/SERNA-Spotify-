import express from 'express';
import { getDashboardStats, getAllUsers } from '../controllers/adminController.js';
import { isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/stats', isAdmin, getDashboardStats);
router.post('/users', isAdmin, getAllUsers);

export default router;
