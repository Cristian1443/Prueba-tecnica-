import jwt from 'jsonwebtoken';
import * as userService from '../services/userService.js';
import { check, validationResult } from 'express-validator';


const { JWT_SECRET } = process.env;

export const validateLogin = [
  check('email').isEmail().withMessage('Email inválido').normalizeEmail(),
  check('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
];

export const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'El email y la contraseña son requeridos' });
  }

  try {
    const user = await userService.findUserByEmail(email);


    const isPasswordCorrect = user
      ? await userService.comparePassword(password, user.password_hash)
      : false;


    if (!user || !isPasswordCorrect) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }


    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    return res.json({
      message: 'Login exitoso',
      token,
    });
  } catch (error) {
    console.error('Error en el servidor durante el login:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};