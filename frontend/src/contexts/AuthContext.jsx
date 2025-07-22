import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login as loginService } from '../services/authService';
import axios from 'axios';


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  const verifyAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
 
        setUser({ loggedIn: true }); // Versión simplificada: asumimos que si hay token, está logueado
      } catch (error) {
        console.error("Token inválido, limpiando...", error);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    verifyAuth();
  }, [verifyAuth]);

  const login = async (email, password) => {
    try {
      const { token } = await loginService(email, password);
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser({ loggedIn: true }); // Actualiza el estado del usuario
      navigate('/');
      toast.success('¡Bienvenido! Sesión iniciada correctamente.');
    } catch (error) {
      console.error('Fallo en el login:', error);
      toast.error('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      throw error; // Es buena idea re-lanzar el error por si el componente que llama necesita reaccionar
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    toast.info('Sesión cerrada. ¡Hasta pronto!');
    navigate('/login');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user, // Derivado del estado 'user'
  };

  // 3. No renderizar la app hasta que la verificación termine
  return (
    <AuthContext.Provider value={value}>
      {loading ? <p>Cargando...</p> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};