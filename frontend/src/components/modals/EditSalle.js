import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';

function EditSalle({ salle, ping, setping }) {
  const [show, setShow] = useState(false);
  const [editedSalle, setEditedSalle] = useState({ ...salle });

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setEditedSalle({ ...salle });
    setShow(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`https://final-project-go-my-code.vercel.app/salle/${salle._id}`, editedSalle);
      alert("Salle mise à jour");
      setping(!ping);
      handleClose();
    } catch (error) {
      console.error(error);
      alert("Erreur");
    }
  };

  return (
    <>
      <button className="btn-action edit" onClick={handleShow} title="Edit">
        <FaEdit />
      </button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Gym</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                value={editedSalle.name}
                onChange={(e) => setEditedSalle({ ...editedSalle, name: e.target.value })} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control 
                type="text" 
                value={editedSalle.localisation}
                onChange={(e) => setEditedSalle({ ...editedSalle, localisation: e.target.value })} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                value={editedSalle.email}
                onChange={(e) => setEditedSalle({ ...editedSalle, email: e.target.value })} 
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control 
                type="text" 
                value={editedSalle.phone}
                onChange={(e) => setEditedSalle({ ...editedSalle, phone: e.target.value })} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditSalle;
