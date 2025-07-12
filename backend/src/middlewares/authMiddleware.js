import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = (req, res, next) => {
  let token;

  // El token se envía en la cabecera 'Authorization' con el formato 'Bearer TOKEN'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Extraer el token de la cabecera
      token = req.headers.authorization.split(' ')[1];

      // 2. Verificar el token
      const decoded = jwt.verify(token, JWT_SECRET);

      // 3. Añadir el payload del usuario decodificado al objeto request
      // (sin la contraseña) para que esté disponible en las rutas protegidas
      req.user = decoded; 

      next(); // El token es válido, continuar a la siguiente función/middleware
    } catch (error) {
      console.error('Error de autenticación:', error.message);
      res.status(401).json({ message: 'No autorizado, token inválido' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'No autorizado, no se encontró token' });
  }
}; 