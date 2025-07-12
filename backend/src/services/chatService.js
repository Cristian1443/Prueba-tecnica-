import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Genera una respuesta de chatbot utilizando la API de Google Gemini.
 * @param {string} userMessage - El mensaje del usuario.
 * @param {Array<Object>} products - El inventario de productos para dar contexto a la IA.
 * @returns {Promise<string>} La respuesta generada por Gemini.
 */
export const getGeminiChatbotResponse = async (userMessage, products) => {
  if (!process.env.GEMINI_API_KEY) {
    return '⚠️ El chatbot IA no está disponible porque falta la API Key de Gemini. Consulta el README para configurarla.';
  }

  const productContext = products.map(p => 
    `- ${p.nombre}: Precio $${parseFloat(p.precio).toFixed(2)}, Stock: ${p.stock}, Categoría: ${p.categoria}`
  ).join('\n');

  const prompt = `
    Eres "Foodbot", un asistente de ventas virtual para el restaurante "Foodboleros". Eres amable, eficiente y te ciñes estrictamente a la información que se te proporciona.

    **Contexto de productos disponibles:**
    ${productContext}

    **Tarea:**
    Responde a la pregunta del cliente de forma breve y directa usando únicamente la información del contexto de productos.
    - Si te preguntan por un producto o categoría que no está en la lista, responde amablemente que no lo tienes disponible.
    - Si te preguntan por algo no relacionado con comida o el restaurante, responde que solo puedes ayudar con el menú.
    - Si te piden una recomendación entre productos, recomienda el que tenga más stock. Si tienen el mismo stock, puedes elegir uno al azar o sugerir el más popular.
    - No inventes información.

    **Pregunta del cliente:** "${userMessage}"

    **Tu respuesta:**
  `;

  // Función auxiliar para intentar con un modelo
  const tryModel = async (modelName) => {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  };

  try {
    // 1. Intentar con gemini-pro
    try {
      return await tryModel('gemini-pro');
    } catch (error) {
      if (error.message && error.message.includes('overloaded')) {
        // 2. Si está saturado, intentar con gemini-1.5-flash
        try {
          return await tryModel('gemini-1.5-flash');
        } catch (error2) {
          if (error2.message && error2.message.includes('overloaded')) {
            return '🤖 El asistente IA está temporalmente saturado por alta demanda de Google. Intenta de nuevo en unos minutos.';
          }
          if (error2.message && error2.message.includes('API Key')) {
            return '⚠️ La clave de API de Gemini no es válida o está mal configurada. Consulta el README.';
          }
          // Fallback simulado
          return simulateChatbot(userMessage, products);
        }
      }
      if (error.message && error.message.includes('API Key')) {
        return '⚠️ La clave de API de Gemini no es válida o está mal configurada. Consulta el README.';
      }
      // Fallback simulado
      return simulateChatbot(userMessage, products);
    }
  } catch (error) {
    console.error('Error inesperado en el chatbot IA:', error);
    // Fallback simulado
    return simulateChatbot(userMessage, products);
  }
};

// Fallback simulado para la demo
function simulateChatbot(userMessage, products) {
  const lower = userMessage.toLowerCase();

  // Sinónimos para recomendaciones
  const recomendacionKeys = ['recomienda', 'sugerencia', 'mejor', 'elige', 'cuál prefieres', 'cuál es mejor'];
  const precioKeys = ['precio', 'cuánto cuesta', 'vale', 'cuánto sale'];

  // Comparación entre productos: "pizza o pan?"
  if (lower.includes(' o ')) {
    const opciones = lower.split(' o ').map(s => s.replace(/[^a-záéíóúüñ ]/gi, '').trim());
    const encontrados = opciones.map(op => products.find(p => op && p.nombre.toLowerCase().includes(op))).filter(Boolean);
    if (encontrados.length === 2) {
      const [a, b] = encontrados;
      const recomendado = a.stock >= b.stock ? a : b;
      return `Entre ${a.nombre} y ${b.nombre}, te recomiendo ${recomendado.nombre} porque tiene más stock (${recomendado.stock} unidades). Precios: ${a.nombre} $${parseFloat(a.precio).toFixed(2)}, ${b.nombre} $${parseFloat(b.precio).toFixed(2)}.`;
    }
  }

  // Pregunta por precio de un producto
  if (precioKeys.some(key => lower.includes(key))) {
    const prod = products.find(p => lower.includes(p.nombre.toLowerCase()));
    if (prod) {
      return `El precio de ${prod.nombre} es $${parseFloat(prod.precio).toFixed(2)}. Tenemos ${prod.stock} en stock.`;
    }
  }

  // Pregunta por recomendación
  if (recomendacionKeys.some(key => lower.includes(key))) {
    const maxStock = Math.max(...products.map(p => p.stock));
    const recomendados = products.filter(p => p.stock === maxStock);
    return `Te recomiendo ${recomendados[0].nombre}, es el producto con más stock (${recomendados[0].stock}) y cuesta $${parseFloat(recomendados[0].precio).toFixed(2)}.`;
  }

  // Buscar producto mencionado
  const prod = products.find(p => lower.includes(p.nombre.toLowerCase()));
  if (prod) {
    return `Tenemos ${prod.stock} unidades de ${prod.nombre} en stock. El precio es $${parseFloat(prod.precio).toFixed(2)}. ¿Te gustaría agregar alguna a tu pedido?`;
  }
  // Buscar por categoría
  const cat = products.find(p => lower.includes(p.categoria.toLowerCase()));
  if (cat) {
    return `En la categoría ${cat.categoria} tenemos: ${products.filter(p => p.categoria === cat.categoria).map(p => p.nombre).join(', ')}.`;
  }
  // Pregunta genérica
  return '¡Estoy aquí para ayudarte con el inventario! Pregúntame por cualquier producto, precio, recomendación o comparación.';
} 