import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClasses } from '../redux/classeSlice';
import { addReservation } from '../redux/reservationSlice';
import { Card, Button, Container, Row, Col, Badge } from 'react-bootstrap';
import './Classes.css';

const Classes = () => {
  const dispatch = useDispatch();
  const { classes, status } = useSelector((state) => state.classe);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getClasses());
  }, [dispatch]);

  const handleReserve = (classe) => {
    if (!user) {
      alert("Veuillez vous connecter pour réserver.");
      return;
    }
    const newRes = {
      user: user._id,
      classe: classe._id,
      phoneUser: user.phone || "Non renseigné",
      prix: classe.prix
    };
    dispatch(addReservation(newRes));
    alert("Demande de réservation envoyée !");
  };

  return (
    <div className="classes-page">
      <div className="classes-hero">
        <Container>
          <h1>Nos Classes</h1>
          <p>Trouvez le cours qui vous correspond et dépassez vos limites.</p>
        </Container>
      </div>

      <Container className="my-5">
        <Row>
          {status === 'pending' ? (
            <h3>Chargement...</h3>
          ) : classes && classes.length > 0 ? (
            classes.map((classe) => (
              <Col key={classe._id} lg={4} md={6} className="mb-4">
                <Card className="classe-card border-0 shadow-sm h-100">
                  <div className="position-relative">
                    <Card.Img variant="top" src={classe.img || 'https://images.unsplash.com/photo-1518611012118-296072bb5602'} />
                    <Badge bg="dark" className="position-absolute top-0 start-0 m-3 rounded-pill px-3 py-2">
                       {classe.gender}
                    </Badge>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Card.Title className="fw-bold mb-0">{classe.name}</Card.Title>
                      <h5 className="text-success fw-bold">{classe.prix} TND</h5>
                    </div>
                    <Card.Text className="text-muted small mb-3">
                      <i className="bi bi-clock me-1"></i> {classe.date} | {classe.time}
                    </Card.Text>
                    <hr />
                    <div className="coach-info d-flex align-items-center mb-3">
                      <img src={classe.coach?.img || 'https://www.w3schools.com/howto/img_avatar.png'} alt="coach" className="rounded-circle me-2" width="35" height="35" />
                      <div>
                        <p className="mb-0 small fw-bold">{classe.coach?.nameCoach}</p>
                        <p className="mb-0 x-small text-muted">{classe.salleDeSport?.name}</p>
                      </div>
                    </div>
                    <Button 
                      variant="dark" 
                      className="mt-auto rounded-pill py-2 fw-bold" 
                      onClick={() => handleReserve(classe)}
                    >
                      Réserver Maintenant
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <h3>Aucune classe disponible</h3>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Classes;
