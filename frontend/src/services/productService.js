import axios from 'axios';

const API_URL = 'http://localhost:3001/api/productos';

/**
 * Obtiene todos los productos de la API.
 * El token JWT se añade automáticamente a los headers gracias a la configuración en AuthContext.
 */
export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

/**
 * Crea un nuevo producto en la API.
 * @param {Object} productData - Los datos del producto a crear.
 * @returns {Promise<Object>} El producto recién creado.
 */
export const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

/**
 * Actualiza un producto existente en la API.
 * @param {number} id - El ID del producto a actualizar.
 * @param {Object} productData - Los nuevos datos del producto.
 * @returns {Promise<Object>} El producto actualizado.
 */
export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/${id}`, productData);
  return response.data;
};

/**
 * Elimina un producto de la API.
 * @param {number} id - El ID del producto a eliminar.
 * @returns {Promise<void>}
 */
export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};

// Aquí añadiremos la función para eliminar productos más adelante. 