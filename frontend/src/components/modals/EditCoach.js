import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';

function EditCoach({ coach, salles, ping, setping }) {
  const [show, setShow] = useState(false);
  const [editedCoach, setEditedCoach] = useState({ ...coach });

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setEditedCoach({ ...coach });
    setShow(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/coach/${coach._id}`, editedCoach);
      alert("Coach mis à jour");
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
          <Modal.Title>Edit Coach</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                value={editedCoach.nameCoach}
                onChange={(e) => setEditedCoach({ ...editedCoach, nameCoach: e.target.value })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Speciality</Form.Label>
              <Form.Control 
                type="text" 
                value={editedCoach.specialite}
                onChange={(e) => setEditedCoach({ ...editedCoach, specialite: e.target.value })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control 
                type="text" 
                value={editedCoach.phone}
                onChange={(e) => setEditedCoach({ ...editedCoach, phone: e.target.value })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Photo URL</Form.Label>
              <Form.Control 
                type="text" 
                value={editedCoach.img}
                onChange={(e) => setEditedCoach({ ...editedCoach, img: e.target.value })} 
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gym</Form.Label>
              <Form.Select 
                value={editedCoach.salleDeSport?._id || editedCoach.salleDeSport}
                onChange={(e) => setEditedCoach({ ...editedCoach, salleDeSport: e.target.value })}
              >
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
          <Button variant="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditCoach;
