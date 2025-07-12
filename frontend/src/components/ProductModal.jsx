import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProductModal = ({ show, handleClose, handleSubmit, productData }) => {
  const [product, setProduct] = useState({ nombre: '', categoria: '', precio: '', stock: '' });
  const [errors, setErrors] = useState({});

  // Si se pasan datos de un producto (modo edición), se rellena el formulario
  useEffect(() => {
    if (productData) {
      setProduct({
        nombre: productData.nombre || '',
        categoria: productData.categoria || '',
        precio: productData.precio || '',
        stock: productData.stock || ''
      });
    } else {
      // Si no (modo creación), se resetea el formulario
      setProduct({ nombre: '', categoria: '', precio: '', stock: '' });
    }
    // Limpiar errores al abrir/cambiar de producto
    setErrors({});
  }, [productData, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
    // Limpiar el error de un campo cuando el usuario empieza a corregirlo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!product.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    if (!product.categoria.trim()) newErrors.categoria = 'La categoría es obligatoria.';
    
    if (!product.precio) {
      newErrors.precio = 'El precio es obligatorio.';
    } else if (isNaN(product.precio) || Number(product.precio) < 0) {
      newErrors.precio = 'El precio debe ser un número positivo.';
    }
    
    if (!product.stock) {
      newErrors.stock = 'El stock es obligatorio.';
    } else if (!/^\d+$/.test(product.stock) || Number(product.stock) < 0) {
      newErrors.stock = 'El stock debe ser un número entero no negativo.';
    }

    return newErrors;
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    handleSubmit(product);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="h5">{productData ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onFormSubmit} noValidate>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control type="text" name="nombre" value={product.nombre} onChange={handleChange} isInvalid={!!errors.nombre} required />
            <Form.Control.Feedback type="invalid">
              {errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Control type="text" name="categoria" value={product.categoria} onChange={handleChange} isInvalid={!!errors.categoria} required />
            <Form.Control.Feedback type="invalid">
              {errors.categoria}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control type="number" step="0.01" name="precio" value={product.precio} onChange={handleChange} isInvalid={!!errors.precio} required />
            <Form.Control.Feedback type="invalid">
              {errors.precio}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" name="stock" value={product.stock} onChange={handleChange} isInvalid={!!errors.stock} required />
            <Form.Control.Feedback type="invalid">
              {errors.stock}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" className="btn-custom-primary">
            {productData ? 'Guardar Cambios' : 'Crear Producto'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProductModal; 