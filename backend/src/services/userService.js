import pool from '../config/db.js';
import bcrypt from 'bcryptjs';

/**
 * Busca un usuario por su dirección de email.
 * @param {string} email - El email del usuario a buscar.
 * @returns {Promise<Object|null>} El objeto del usuario o null si no se encuentra.
 */
export const findUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
  return rows[0] || null;
};

/**
 * Compara la contraseña proporcionada con el hash almacenado.
 * @param {string} password - La contraseña en texto plano.
 * @param {string} hash - El hash de la contraseña almacenado en la DB.
 * @returns {Promise<boolean>} True si las contraseñas coinciden, false en caso contrario.
 */
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
}; 