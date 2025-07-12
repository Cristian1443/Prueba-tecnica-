import jwt from 'jsonwebtoken';
import * as userService from '../services/userService.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'El email y la contraseña son requeridos' });
  }

  try {
    // 1. Buscar al usuario por email
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' }); // Usuario no encontrado
    }

    // 2. Comparar la contraseña
    const isPasswordCorrect = await userService.comparePassword(password, user.password_hash);

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Credenciales inválidas' }); // Contraseña incorrecta
    }

    // 3. Generar el JWT
    const payload = {
      id: user.id,
      email: user.email
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1h' // El token expira en 1 hora
    });

    // 4. Enviar el token al cliente
    res.status(200).json({
      message: 'Login exitoso',
      token: token
    });

  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor durante el login', error: error.message });
  }
}; 