import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/chat`;

/**
 * Envía un mensaje al chatbot de la API y obtiene una respuesta.
 * @param {string} message - El mensaje del usuario.
 * @returns {Promise<Object>} La respuesta de la API, que contiene el 'reply' del bot.
 */
export const sendMessage = async (message) => {
  const response = await axios.post(API_URL, { message });
  return response.data;
}; 