import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

function AddSalle({ ping, setping }) {
  const [show, setShow] = useState(false);
  const [newSalle, setNewSalle] = useState({
    name: "",
    localisation: "",
    email: "",
    phone: "",
    img: ""
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = async () => {
    try {
      await axios.post('https://final-project-go-my-code.vercel.app/salle/add', newSalle);
      alert("Salle ajoutée");
      setping(!ping);
      handleClose();
      setNewSalle({ name: "", localisation: "", email: "", phone: "", img: "" });
    } catch (error) {
      console.error(error);
      alert("Erreur");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="d-flex align-items-center gap-2">
        + Add Gym
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Gym</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Gym Name</Form.Label>
              <Form.Control type="text" placeholder="Name" onChange={(e) => setNewSalle({ ...newSalle, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="City, Street" onChange={(e) => setNewSalle({ ...newSalle, localisation: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="contact@gym.com" onChange={(e) => setNewSalle({ ...newSalle, email: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" placeholder="Phone" onChange={(e) => setNewSalle({ ...newSalle, phone: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Logo URL</Form.Label>
              <Form.Control type="text" placeholder="https://..." onChange={(e) => setNewSalle({ ...newSalle, img: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleAdd}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddSalle;
