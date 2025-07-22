import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Form, Button, Card, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // <-- Añade esta línea

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
    } catch (err) {
      setError('Credenciales inválidas. Por favor, inténtalo de nuevo.');
      console.error('Error de login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <div className="login-logo text-center mb-4">
          <h1 className="h3">Foodboleros</h1>
          <p className="login-subtitle mb-0">Gestor de Inventario</p>
        </div>
        <Card className="card-custom card-login">
          <Card.Body className="p-4 p-md-5">
            <h2 className="text-center mb-4 h4">Iniciar Sesión</h2>
            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group id="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </Form.Group>
              <Form.Group id="password" >
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </Form.Group>
              {error && <p className="text-danger text-center mt-3">{error}</p>}
              <Button disabled={loading} className="w-100 mt-4 btn-custom-primary" type="submit">
                {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Entrar'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;