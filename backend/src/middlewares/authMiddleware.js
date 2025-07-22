import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const protect = (req, res, next) => {
  let token;


  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];


      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = decoded;

      return next(); 
    } catch (error) {
      console.error('Error de autenticación:', error.message);
      return res.status(401).json({ message: 'No autorizado, token inválido' });
    }
  }

  return res.status(401).json({ message: 'No autorizado, no se encontró token' });
};