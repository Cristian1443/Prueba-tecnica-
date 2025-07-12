import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { logout } = useAuth();

  return (
    <Navbar expand="lg" className="navbar-custom slide-up">
      <Container>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <div className="brand-icon me-2">
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0a3 3 0 0 0-3 3v1.5a1.5 1.5 0 0 0-1.5 1.5v7a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5V3a3 3 0 0 0-3-3zM6 3a2 2 0 1 1 4 0v1.5H6V3zm-.5 2.5h5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5V6a.5.5 0 0 1 .5-.5z"/>
              <path d="M7 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </div>
          <span className="brand-text">Foodboleros Inventario</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <div className="d-flex align-items-center">
            <span className="me-3 navbar-subtitle d-none d-md-inline">
              Sistema de Gestión
            </span>
            <Button 
              variant="outline-light" 
              onClick={logout}
              className="scale-hover d-flex align-items-center"
            >
              <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
              </svg>
              Cerrar Sesión
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header; 