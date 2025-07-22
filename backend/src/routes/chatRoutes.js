import express from 'express';
import { chatController } from '../controllers/chatController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { validateChatMessage } from '../validators/validationMiddleware.js';

const router = express.Router();

// Ruta para interactuar con el chatbot
// POST /api/chat
router.post('/', protect, validateChatMessage, chatController);

export default router; 