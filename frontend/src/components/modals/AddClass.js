import React, { useState } from 'react';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function AddClass({ coaches, salles, ping, setping }) {
  const [show, setShow] = useState(false);
  const [newClass, setNewClass] = useState({
    name: "",
    date: "",
    time: "",
    gender: "Men",
    prix: 0,
    nbGroups: 1,
    coach: "",
    salleDeSport: "",
    img: ""
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = async () => {
    try {
      await axios.post('https://final-project-go-my-code.vercel.app/classe/add', newClass);
      alert("Session créée");
      setping(!ping);
      handleClose();
      setNewClass({ name: "", date: "", time: "", gender: "Men", prix: 0, nbGroups: 1, coach: "", salleDeSport: "", img: "" });
    } catch (error) {
      console.error(error);
      alert("Erreur");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow} className="d-flex align-items-center gap-2">
        + Schedule Class
      </Button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Schedule New Session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Class Name</Form.Label>
              <Form.Control type="text" placeholder="e.g. Morning Yoga" onChange={(e) => setNewClass({ ...newClass, name: e.target.value })} />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date" onChange={(e) => setNewClass({ ...newClass, date: e.target.value })} />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Time</Form.Label>
                  <Form.Control type="time" onChange={(e) => setNewClass({ ...newClass, time: e.target.value })} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select onChange={(e) => setNewClass({ ...newClass, gender: e.target.value })}>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Mixte">Mixte</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" onChange={(e) => setNewClass({ ...newClass, prix: Number(e.target.value) })} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Groups</Form.Label>
                  <Form.Control type="number" placeholder="1" onChange={(e) => setNewClass({ ...newClass, nbGroups: Number(e.target.value) })} />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Coach</Form.Label>
                  <Form.Select onChange={(e) => setNewClass({ ...newClass, coach: e.target.value })}>
                    <option value="">Select coach</option>
                    {coaches.map(c => <option key={c._id} value={c._id}>{c.nameCoach}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Gym</Form.Label>
                  <Form.Select onChange={(e) => setNewClass({ ...newClass, salleDeSport: e.target.value })}>
                    <option value="">Select gym</option>
                    {salles.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Cover Image URL</Form.Label>
              <Form.Control type="text" placeholder="https://..." onChange={(e) => setNewClass({ ...newClass, img: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary" onClick={handleAdd}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddClass;
