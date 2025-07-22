import { body, validationResult } from 'express-validator';

// Middleware para manejar los errores de validación
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Reglas de validación para el registro de productos
export const validateProduct = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio.')
    .isString().withMessage('El nombre debe ser texto.')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.'),
  
  body('stock')
    .notEmpty().withMessage('El stock es obligatorio.')
    .isInt({ min: 0 }).withMessage('El stock debe ser un número entero no negativo.'),

  body('precio')
    .notEmpty().withMessage('El precio es obligatorio.')
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número no negativo.'),

  body('categoria')
    .trim()
    .notEmpty().withMessage('La categoría es obligatoria.')
    .isString().withMessage('La categoría debe ser texto.'),
  
  handleValidationErrors
];

// Reglas de validación para el login
export const validateLogin = [
  body('email')
    .isEmail().withMessage('Debe proporcionar un email válido.')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),
  
  handleValidationErrors
]; 

// Reglas de validación para el mensaje del chat
export const validateChatMessage = [
  body('message')
    .trim()
    .notEmpty().withMessage('El mensaje es obligatorio.')
    .isString().withMessage('El mensaje debe ser texto.')
    .isLength({ min: 1, max: 500 }).withMessage('El mensaje debe tener entre 1 y 500 caracteres.'),
  handleValidationErrors
]; 