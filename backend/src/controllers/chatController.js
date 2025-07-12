import { getGeminiChatbotResponse } from '../services/chatService.js';
import * as productService from '../services/productService.js';

export const chatController = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'El mensaje es requerido.' });
  }

  try {
    const products = await productService.getAllProducts();
    const response = await getGeminiChatbotResponse(message, products);

    res.status(200).json({ reply: response });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor del chat', error: error.message });
  }
}; 