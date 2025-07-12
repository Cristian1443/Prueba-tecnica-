import express from 'express';
import { loginController } from '../controllers/authController.js';
import { validateLogin } from '../validators/validationMiddleware.js';

const router = express.Router();

// Ruta para el login de usuarios
// Se añade el middleware de validación
router.post('/login', validateLogin, loginController);

export default router; 