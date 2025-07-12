import axios from 'axios';

// La URL base de tu API. Debería estar en una variable de entorno en un proyecto real.
const API_URL = 'http://localhost:3001/api/auth';

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