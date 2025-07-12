import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ProductList = ({ products, onEdit, onDelete }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-5 fade-in">
        <div className="mb-4">
          <svg width="64" height="64" fill="currentColor" className="text-muted mb-3" viewBox="0 0 16 16">
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
          </svg>
        </div>
        <h4 className="text-muted mb-2">No hay productos en el inventario</h4>
        <p className="text-muted">Comienza agregando tu primer producto</p>
      </div>
    );
  }

  return (
    <>
      {/* Tabla para escritorio */}
      <div className="d-none d-md-block">
        <Table striped bordered hover responsive className="responsive-table slide-up">
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <td data-label="#">{product.id}</td>
                <td data-label="Nombre" className="fw-semibold">{product.nombre}</td>
                <td data-label="Categoría">
                  <span className="badge bg-secondary">{product.categoria}</span>
                </td>
                <td data-label="Precio" className="fw-bold text-success">
                  ${parseFloat(product.precio).toFixed(2)}
                </td>
                <td data-label="Stock">
                  <span className={`badge ${product.stock < 20 ? 'bg-warning text-dark' : 'bg-success'}`}>
                    {product.stock}
                  </span>
                </td>
                <td data-label="Acciones" className="actions-cell">
                  <Button 
                    size="sm" 
                    className="btn-custom-secondary me-2 mb-1 scale-hover" 
                    onClick={() => onEdit(product)}
                  >
                    ✏️ Editar
                  </Button>
                  <Button 
                    size="sm" 
                    className="btn-custom-danger mb-1 scale-hover" 
                    onClick={() => onDelete(product.id)}
                  >
                    🗑️ Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Cards para móviles */}
      <div className="d-md-none">
        {products.map((product, index) => (
          <div key={product.id} className="product-card mb-3 fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold">{product.nombre}</span>
              <span className="badge bg-secondary">{product.categoria}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-success fw-bold">${parseFloat(product.precio).toFixed(2)}</span>
              <span className={`badge ${product.stock < 20 ? 'bg-warning text-dark' : 'bg-success'}`}>{product.stock} en stock</span>
            </div>
            <div className="d-flex gap-2 mt-2">
              <Button size="sm" className="btn-custom-secondary flex-fill" onClick={() => onEdit(product)}>
                ✏️ Editar
              </Button>
              <Button size="sm" className="btn-custom-danger flex-fill" onClick={() => onDelete(product.id)}>
                🗑️ Eliminar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;