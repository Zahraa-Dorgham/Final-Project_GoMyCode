import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';

function EditProduct({ product, ping, setping }) {
  const [show, setShow] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setEditedProduct({ ...product });
    setShow(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://final-project-go-my-code.vercel.app/shop/${product._id}`, editedProduct);
      alert("Produit mis à jour avec succès");
      setping(!ping);
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la mise à jour");
    }
  };

  return (
    <>
      <button className="btn-action edit" onClick={handleShow} title="Edit">
        <FaEdit />
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control 
                type="text" 
                value={editedProduct.name}
                onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control 
                type="text" 
                value={editedProduct.image}
                onChange={(e) => setEditedProduct({ ...editedProduct, image: e.target.value })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price (TND)</Form.Label>
              <Form.Control 
                type="number" 
                value={editedProduct.price}
                onChange={(e) => setEditedProduct({ ...editedProduct, price: Number(e.target.value) })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control 
                type="number" 
                value={editedProduct.stock}
                onChange={(e) => setEditedProduct({ ...editedProduct, stock: Number(e.target.value) })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select 
                value={editedProduct.category}
                onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
              >
                <option value="Equipment">Equipment</option>
                <option value="Nutrition">Nutrition</option>
                <option value="Accessories">Accessories</option>
                <option value="clothes">Clothes</option>
                <option value="shoes">Shoes</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProduct;
