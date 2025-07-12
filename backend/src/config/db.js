import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// TODO: Es una buena práctica mover toda esta configuración a variables de entorno.
// Lee las variables del archivo .env que deberías crear en la raíz de /backend.
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'foodboleros_db',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Crea el pool de conexiones a la base de datos
const pool = mysql.createPool(dbConfig);

// Función para probar la conexión
export const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión a la base de datos establecida correctamente.');
    connection.release();
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
    // Termina el proceso si no se puede conectar a la DB.
    // Esto es útil en el arranque para asegurar que la DB esté disponible.
    process.exit(1);
  }
};

export default pool; 