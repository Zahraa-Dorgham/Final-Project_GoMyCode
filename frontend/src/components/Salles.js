import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSalles } from '../redux/salleSlice';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import './Salles.css';

const Salles = () => {
  const dispatch = useDispatch();
  const { salles, status } = useSelector((state) => state.salle);

  useEffect(() => {
    dispatch(getSalles());
  }, [dispatch]);

  return (
    <div className="salles-page">
      <div className="salles-hero">
        <Container>
          <h1>Nos Salles de Sport</h1>
          <p>Découvrez nos installations modernes et connectées pour vos entraînements.</p>
        </Container>
      </div>

      <Container className="my-5">
        <Row>
          {status === 'pending' ? (
            <h3>Chargement...</h3>
          ) : salles && salles.length > 0 ? (
            salles.map((salle) => (
              <Col key={salle._id} md={4} className="mb-4">
                <Card className="salle-card h-100 border-0 shadow">
                  <div className="card-img-wrapper">
                    <Card.Img variant="top" src={salle.img || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48'} alt={salle.name} />
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold">{salle.name}</Card.Title>
                    <Card.Text className="text-muted">
                      <i className="bi bi-geo-alt-fill me-2"></i>{salle.localisation}
                    </Card.Text>
                    <Card.Text>{salle.description}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <span className="text-primary fw-bold">{salle.phone}</span>
                      <Button variant="outline-dark" className="rounded-pill px-4">Voir Détails</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <h3>Aucune salle disponible</h3>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Salles;
