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
  }, []);

  return (
    <div className="salles-page">
      <div className="salles-hero">
        <Container>
          <h1>Our Facilities</h1>
          <p>Discover our modern and connected facilities for your workouts.</p>
        </Container>
      </div>

      <Container className="my-5">
        <Row>
          {status === 'pending' ? (
            <h3>Loading...</h3>
          ) : salles && salles.length > 0 ? (
            salles.map((salle) => (
              <Col key={salle._id} md={4} className="mb-4">
                <Card className="salle-card h-100 border-0 shadow">
                  <div className="card-img-wrapper">
                    <Card.Img variant="top" src={salle.img || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48'} alt={salle.name} />
                  </div>
                  <Card.Body className="d-flex flex-column text-center">
                    <Card.Title className="fw-bold">{salle.name}</Card.Title>
                    <div className="location-info justify-content-center">
                      <i className="bi bi-geo-alt-fill"></i>
                      <span>{salle.localisation}</span>
                    </div>
                    <Card.Text className="salle-description">
                      {salle.description}
                    </Card.Text>
                    <div className="d-flex justify-content-center mt-auto">
                      <div className="phone-tag">
                        <i className="bi bi-telephone-fill"></i>
                        <span>{salle.phone}</span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <h3>No facilities available</h3>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Salles;
