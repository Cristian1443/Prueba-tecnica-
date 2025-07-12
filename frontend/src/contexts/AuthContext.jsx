import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// El servicio de autenticación que crearemos en el siguiente paso
import { login as loginService } from '../services/authService'; 
import axios from 'axios';

// 1. Crear el Contexto
const AuthContext = createContext(null);

// 2. Crear el Proveedor del Contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Si hay un token, lo configuramos en los headers de axios para todas las peticiones futuras
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Aquí podrías decodificar el token para obtener info del usuario si lo necesitaras
      // Por ahora, asumimos que si hay token, el usuario está "logueado"
      setUser({ token }); 
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const data = await loginService(email, password);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      navigate('/'); // Redirigir al inventario después del login
      toast.success('¡Bienvenido! Sesión iniciada correctamente.');
    } catch (error) {
      console.error('Fallo en el login:', error);
      toast.error('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      // Ya no es necesario re-lanzar el error, el toast lo maneja.
      // throw error; 
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    toast.info('Sesión cerrada. ¡Hasta pronto!');
    navigate('/login'); // Redirigir al login
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Crear un hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
}; 