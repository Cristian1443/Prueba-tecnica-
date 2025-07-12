import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { testConnection } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

// Cargar variables de entorno
dotenv.config();

// Inicializar la app de Express
const app = express();

// Probar la conexión a la base de datos al iniciar
testConnection();

// Middlewares
app.use(cors());
app.use(express.json());

// Rate Limiter para el login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Limita cada IP a 10 intentos de login por ventana de 15 minutos
  message: 'Demasiados intentos de login desde esta IP, por favor intente de nuevo después de 15 minutos',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rutas de la aplicación
app.get('/', (req, res) => {
  res.send('🎉 ¡API de Foodboleros Inventario funcionando!');
});

// Aplicar el rate limiter solo a la ruta de autenticación
app.use('/api/auth', loginLimiter, authRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/chat', chatRoutes);


// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
}); 