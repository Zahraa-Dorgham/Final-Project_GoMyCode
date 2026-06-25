import React, { useState } from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';

function EditClass({ classe, coaches, salles, ping, setping }) {
  const [show, setShow] = useState(false);
  const [editedClass, setEditedClass] = useState({ ...classe });

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setEditedClass({ ...classe });
    setShow(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/classe/${classe._id}`, editedClass);
      alert("Session mise à jour");
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

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                value={editedClass.name}
                onChange={(e) => setEditedClass({ ...editedClass, name: e.target.value })} 
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    value={editedClass.date?.substring(0, 10)}
                    onChange={(e) => setEditedClass({ ...editedClass, date: e.target.value })} 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control 
                    type="time" 
                    value={editedClass.time}
                    onChange={(e) => setEditedClass({ ...editedClass, time: e.target.value })} 
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select 
                    value={editedClass.gender}
                    onChange={(e) => setEditedClass({ ...editedClass, gender: e.target.value })}
                  >
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Mixte">Mixte</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={editedClass.prix}
                    onChange={(e) => setEditedClass({ ...editedClass, prix: Number(e.target.value) })} 
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Groups</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={editedClass.nbGroups}
                    onChange={(e) => setEditedClass({ ...editedClass, nbGroups: Number(e.target.value) })} 
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Coach</Form.Label>
                  <Form.Select 
                    value={editedClass.coach?._id || editedClass.coach}
                    onChange={(e) => setEditedClass({ ...editedClass, coach: e.target.value })}
                  >
                    <option value="">Select coach</option>
                    {coaches.map(c => <option key={c._id} value={c._id}>{c.nameCoach}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Gym</Form.Label>
                  <Form.Select 
                    value={editedClass.salleDeSport?._id || editedClass.salleDeSport}
                    onChange={(e) => setEditedClass({ ...editedClass, salleDeSport: e.target.value })}
                  >
                    <option value="">Select gym</option>
                    {salles.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
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

export default EditClass;
