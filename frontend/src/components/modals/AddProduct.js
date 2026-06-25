import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import axios from 'axios';

function AddProduct({ ping, setping }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const [newproduct, setnewproduct] = useState({
    name: "",
    image: "",
    price: 0,
    category: "Equipment",
    stock: 0
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:5000/shop/add', newproduct);
      alert("Produit enregistré avec succès");
      setping(!ping);
      handleClose();
      setnewproduct({
        name: "",
        image: "",
        price: 0,
        category: "Equipment",
        stock: 0
      });
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="d-flex align-items-center gap-2">
        + Add Product
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter product name" 
                onChange={(e) => setnewproduct({ ...newproduct, name: e.target.value })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter image URL" 
                onChange={(e) => setnewproduct({ ...newproduct, image: e.target.value })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price (TND)</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="0.00" 
                onChange={(e) => setnewproduct({ ...newproduct, price: Number(e.target.value) })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="0" 
                onChange={(e) => setnewproduct({ ...newproduct, stock: Number(e.target.value) })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select onChange={(e) => setnewproduct({ ...newproduct, category: e.target.value })}>
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
          <Button variant="primary" onClick={handleAdd}>
            Save Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProduct;
