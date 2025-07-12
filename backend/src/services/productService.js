import pool from '../config/db.js';

/**
 * Obtiene todos los productos de la base de datos.
 * @returns {Promise<Array>} Un arreglo de objetos de productos.
 */
export const getAllProducts = async () => {
  const [rows] = await pool.query('SELECT * FROM productos ORDER BY id DESC');
  return rows;
};

/**
 * Obtiene un producto por su ID.
 * @param {number} id - El ID del producto.
 * @returns {Promise<Object|null>} El objeto del producto o null si no se encuentra.
 */
export const getProductById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
  return rows[0] || null;
};

/**
 * Crea un nuevo producto en la base de datos.
 * @param {Object} product - El objeto del producto a crear.
 * @param {string} product.nombre - Nombre del producto.
 * @param {number} product.stock - Stock disponible.
 * @param {number} product.precio - Precio del producto.
 * @param {string} product.categoria - Categoría del producto.
 * @returns {Promise<Object>} El producto recién creado.
 */
export const createProduct = async (product) => {
  const { nombre, stock, precio, categoria } = product;
  const [result] = await pool.query(
    'INSERT INTO productos (nombre, stock, precio, categoria) VALUES (?, ?, ?, ?)',
    [nombre, stock, precio, categoria]
  );
  const newProductId = result.insertId;
  return await getProductById(newProductId);
};

/**
 * Actualiza un producto existente en la base de datos.
 * @param {number} id - El ID del producto a actualizar.
 * @param {Object} product - Los datos del producto a actualizar.
 * @returns {Promise<Object|null>} El producto actualizado o null si no se encuentra.
 */
export const updateProduct = async (id, product) => {
  const { nombre, stock, precio, categoria } = product;
  await pool.query(
    'UPDATE productos SET nombre = ?, stock = ?, precio = ?, categoria = ? WHERE id = ?',
    [nombre, stock, precio, categoria, id]
  );
  return await getProductById(id);
};

/**
 * Elimina un producto de la base de datos.
 * @param {number} id - El ID del producto a eliminar.
 * @returns {Promise<boolean>} True si el producto fue eliminado, false en caso contrario.
 */
export const deleteProduct = async (id) => {
  const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
  return result.affectedRows > 0;
}; 