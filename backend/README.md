# Foodboleros Inventario - Backend

Esta carpeta contiene el backend de la aplicación Foodboleros Inventario, construido con Node.js, Express y MySQL.

## 🚀 Requisitos Previos

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- Un servidor de [MySQL](https://www.mysql.com/) corriendo localmente o en la nube.
- Un cliente de base de datos como [MySQL Workbench](https://www.mysql.com/products/workbench/) o [DBeaver](https://dbeaver.io/) para ejecutar el script inicial.

## ⚙️ Instalación

1.  **Navegar a la carpeta del backend:**
    ```bash
    cd backend
    ```

2.  **Instalar dependencias:**
    Usa `npm` para instalar todos los paquetes necesarios.
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env` en la raíz de la carpeta `/backend`. Puedes copiar el archivo `.env.example` como plantilla.
    ```bash
    # Ejemplo de contenido para .env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña_de_mysql
    DB_NAME=foodboleros_db
    DB_PORT=3306
    JWT_SECRET=una_clave_secreta_muy_larga_y_dificil
    PORT=3001
    ```

4.  **Configurar la Base de Datos:**
    - Asegúrate de que tu servidor MySQL esté en funcionamiento.
    - Usando tu cliente de base de datos preferido, conéctate a tu servidor MySQL.
    - Ejecuta el script SQL que se encuentra en `db/init.sql`. Esto creará la base de datos `foodboleros_db`, las tablas `usuarios` y `productos`, e insertará datos de prueba.

## ▶️ Uso

Una vez completada la instalación, puedes iniciar el servidor.

- **Modo de Desarrollo (con recarga automática):**
  ```bash
  npm run dev
  ```
  El servidor se iniciará en `http://localhost:3001` y se reiniciará automáticamente si haces cambios en el código.

- **Modo de Producción:**
  ```bash
  npm start
  ```

## Endpoints de la API

La API se sirve bajo el prefijo `/api`.

- `POST /api/auth/login`: Login de usuario. Devuelve un JWT.
- `GET /api/productos`: Obtiene todos los productos (Pública).
- `POST /api/productos`: Crea un producto (Protegida).
- `GET /api/productos/:id`: Obtiene un producto por ID (Pública).
- `PUT /api/productos/:id`: Actualiza un producto (Protegida).
- `DELETE /api/productos/:id`: Elimina un producto (Protegida).
- `POST /api/chat`: Envía un mensaje al chatbot de ventas (Protegida). 

# Configuración de variables de entorno para seguridad

Agrega en tu archivo .env del backend:

FRONTEND_URL=http://localhost:5173
NODE_ENV=production # o development según el entorno

# Explicación
- FRONTEND_URL: Solo este origen podrá hacer peticiones al backend (CORS seguro).
- NODE_ENV: Si es 'production', los mensajes de error detallados no se mostrarán al usuario. 