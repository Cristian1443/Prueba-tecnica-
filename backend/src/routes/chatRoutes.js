import express from 'express';
import { chatController } from '../controllers/chatController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Ruta para interactuar con el chatbot
// POST /api/chat
router.post('/', protect, chatController);

export default router; 