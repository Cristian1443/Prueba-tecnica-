# Foodboleros Inventario

> **Solución profesional para la gestión de inventario en restaurantes**

---

## 📝 Descripción Ejecutiva
Foodboleros Inventario es una plataforma full-stack desarrollada para digitalizar y optimizar la gestión de inventario en restaurantes. Ofrece una experiencia de usuario moderna, segura y adaptable a cualquier dispositivo, integrando automatización, IA y las mejores prácticas de la industria.

---

## 🛠️ Tecnologías Principales

| Capa        | Tecnología                        |
|-------------|-----------------------------------|
| Frontend    | React, Vite, Bootstrap, Toastify  |
| Backend     | Node.js, Express, JWT, Gemini AI  |
| Base de datos | MySQL                           |
| Testing     | Jest, Supertest                   |
| Otros       | CSS3 (custom theme), Docker-ready |

---

## 🏗️ Arquitectura General

```
┌─────────────┐      REST API      ┌──────────────┐      SQL      ┌──────────────┐
│  Frontend   │ <───────────────> │   Backend    │ <───────────> │   MySQL DB   │
│ (React/Vite)│                   │ (Node/Express)│              │              │
└─────────────┘                   └──────────────┘              └──────────────┘
      │
      │  Chatbot IA (Gemini)
      ▼
┌──────────────┐
│ Google Gemini│
└──────────────┘
```

---

## 🚀 Instalación y Despliegue

### 1. Clonar el repositorio
```bash
git clone <URL-del-repo>
cd foodboleros-inventario
```

### 2. Backend
```bash
cd backend
npm install
# Configura tu .env (ver .env.example)
npm run dev
```
- Corre en `http://localhost:3001`
- Requiere MySQL (ver `init.sql`)

### 3. Frontend
```bash
cd ../frontend
npm install
npm run dev
```
- Corre en `http://localhost:5173`

### 4. Pruebas automáticas (backend)
```bash
cd backend
npm test
```

---

## 📱 Experiencia Mobile-First
- **Escritorio:** Tabla tradicional, acciones rápidas.
- **Móvil:** Tarjetas apiladas, botones grandes y accesibles, sin scroll horizontal.

---

## ✨ Experiencia de Usuario (UI/UX)
- **Tema premium:** Negro y dorado, inspirado en la marca.
- **Animaciones:** Fade-in, slide-up, shimmer en loading.
- **Notificaciones:** Toasts para feedback inmediato.
- **Accesibilidad:** Contraste alto, focus visible, botones grandes.
- **Iconografía:** Gorro de chef en el header, iconos en acciones.

---

## 🔒 Seguridad y Buenas Prácticas
- Autenticación JWT y protección de rutas.
- Validación de formularios en frontend y backend.
- Rate limiting y sanitización de entradas.
- Código modular y fácil de mantener.

---

## 🤖 Chatbot Inteligente
- Integración con Google Gemini para consultas inteligentes sobre el inventario.
- Respuestas contextuales y recomendaciones automáticas.

> **Nota importante:**
> El chatbot depende de la disponibilidad de la API de Google Gemini. Si ves mensajes como "El asistente está temporalmente saturado" o "problemas para conectarme con mi cerebro de IA", es porque el modelo de Gemini está sobrecargado o la clave de API no es válida. Puedes cambiar entre los modelos `gemini-1.5-flash` y `gemini-pro` en el código (`chatService.js`) según disponibilidad. Consulta el README para más detalles.

---

## 👤 Acceso de prueba
- **Usuario:** [proporcionar solo en entorno seguro]
- **Contraseña:** [proporcionar solo en entorno seguro]

---


## 🏆 ¿Por qué elegir Foodboleros Inventario?
- **Enfoque profesional:** Cumple estándares de la industria.
- **Escalable:** Fácil de adaptar a nuevas necesidades.
- **UX de alto nivel:** Pensado para usuarios reales, en dispositivos reales.
- **Automatización e IA:** Chatbot integrado para soporte y recomendaciones.
- **Documentación clara:** Fácil de instalar, probar y mantener.

---

## 👨‍💻 Autor y contacto
**Desarrollador:** Cristian Reyes
**Email:** [cr59828@gmail.com]
**LinkedIn:** [https://www.linkedin.com/in/cristian-johan-reyes-gutierrez-751bb22b0/]

---
