import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

function AddCoach({ salles, ping, setping }) {
  const [show, setShow] = useState(false);
  const [newCoach, setNewCoach] = useState({
    nameCoach: "",
    specialite: "",
    phone: "",
    img: "",
    salleDeSport: ""
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = async () => {
    try {
      await axios.post('https://final-project-go-my-code.vercel.app/coach/add', newCoach);
      alert("Coach ajouté avec succès");
      setping(!ping);
      handleClose();
      setNewCoach({ nameCoach: "", specialite: "", phone: "", img: "", salleDeSport: "" });
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="d-flex align-items-center gap-2">
        + Add Coach
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Coach</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Coach name" 
                onChange={(e) => setNewCoach({ ...newCoach, nameCoach: e.target.value })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Speciality</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="e.g. Crossfit, Yoga" 
                onChange={(e) => setNewCoach({ ...newCoach, specialite: e.target.value })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Phone number" 
                onChange={(e) => setNewCoach({ ...newCoach, phone: e.target.value })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Image URL" 
                onChange={(e) => setNewCoach({ ...newCoach, img: e.target.value })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Assigned Gym</Form.Label>
              <Form.Select onChange={(e) => setNewCoach({ ...newCoach, salleDeSport: e.target.value })}>
                <option value="">Select a gym</option>
                {salles.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Save Coach
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddCoach;
