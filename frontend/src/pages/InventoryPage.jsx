import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import ProductList from '../components/ProductList';
import ProductModal from '../components/ProductModal';
import ConfirmModal from '../components/ConfirmModal';
import ChatWidget from '../components/ChatWidget';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../services/productService';

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Estado para el modal de borrado
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingProductId, setDeletingProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        toast.error('No se pudieron cargar los productos. Inténtalo de nuevo más tarde.');
        console.error(err);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleShowAddModal = () => {
    setEditingProduct(null);
    setShowModal(true);
  };
  
  const handleShowEditModal = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleShowDeleteModal = (id) => {
    setDeletingProductId(id);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeletingProductId(null);
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(deletingProductId);
      setProducts(products.filter(p => p.id !== deletingProductId));
      toast.success('Producto eliminado correctamente.');
      handleCloseDeleteModal();
    } catch (err) {
      console.error('Error al eliminar el producto:', err);
      toast.error('No se pudo eliminar el producto.');
      handleCloseDeleteModal();
    }
  };

  const handleFormSubmit = async (productData) => {
    try {
      if (editingProduct) {
        // Lógica de Actualización
        const updatedProduct = await updateProduct(editingProduct.id, productData);
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        toast.success(`Producto "${updatedProduct.nombre}" actualizado.`);
      } else {
        // Lógica de Creación
        const newProduct = await createProduct(productData);
        setProducts(prevProducts => [newProduct, ...prevProducts]);
        toast.success(`Producto "${newProduct.nombre}" añadido con éxito.`);
      }
      handleCloseModal();
    } catch (err) {
      console.error('Error al guardar el producto:', err);
      toast.error('No se pudo guardar el producto. Revisa los campos.');
    }
  };

  const renderContent = () => {
    if (loading) {
      return <LoadingSkeleton type="table" rows={6} />;
    }

    return <ProductList products={products} onEdit={handleShowEditModal} onDelete={handleShowDeleteModal} />;
  }

  return (
    <>
      <Header />
      <Container className="mt-4 fade-in">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 inventory-header">
          <h1 className="mb-3 mb-md-0 h2">Inventario de Productos</h1>
          <Button className="btn-custom-primary scale-hover glow-hover" onClick={handleShowAddModal}>
            Agregar Producto
          </Button>
        </div>
        <div className="inventory-table">
          {renderContent()}
        </div>
      </Container>
      
      <ProductModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSubmit={handleFormSubmit}
        productData={editingProduct}
      />
      
      <ConfirmModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        body="¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer."
      />
      
      <ChatWidget />
    </>
  );
};

export default InventoryPage; 