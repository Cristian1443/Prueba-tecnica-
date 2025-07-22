import axios from 'axios';

// La URL base ahora se toma de las variables de entorno
const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

/**
 * Llama al endpoint de login de la API.
 * @param {string} email - El email del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<Object>} La respuesta de la API (incluyendo el token).
 */
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
};