import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserReservations } from '../redux/reservationSlice';
import { Container, Row, Col, Card, ListGroup, Badge, Button } from 'react-bootstrap';
import './Profil.css';

const Profil = () => {
  const { user } = useSelector((state) => state.user);
  const { userReservations } = useSelector((state) => state.reservation);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getUserReservations(user._id));
    }
  }, [user, navigate, dispatch]);

  if (!user) return null;

  return (
    <div className="profile-page">
      <Container className="py-5 mt-5">
        <Row>
          <Col md={4}>
            <Card className="profile-info-card border-0 shadow-sm text-center p-4 rounded-4">
              <div className="avatar-wrapper mx-auto mb-3">
                <img src={`https://ui-avatars.com/api/?name=${user.fullname}&background=random`} alt="avatar" className="rounded-circle shadow" />
              </div>
              <h3 className="fw-bold">{user.fullname}</h3>
              <Badge bg="primary" className="mb-3 px-3 py-2 rounded-pill text-uppercase">
                {user.role}
              </Badge>
              <div className="text-start mt-4">
                <p className="mb-2"><strong>Email:</strong> {user.email}</p>
                <p className="mb-2"><strong>Téléphone:</strong> {user.phone}</p>
              </div>
              <Button variant="outline-dark" className="mt-4 rounded-pill w-100">Modifier Profil</Button>
            </Card>
          </Col>

          <Col md={8}>
            {user.role === 'admin' || user.role === 'coach' ? (
              <>
                <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                  <Card.Header className="bg-dark text-white py-3">
                    <h4 className="mb-0 fw-bold">Gestion des Réservations (Vue {user.role})</h4>
                  </Card.Header>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="py-3 text-center text-muted">
                      Accès aux données globales activé.
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </>
            ) : null}

            <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
              <Card.Header className="bg-white py-3">
                <h4 className="mb-0 fw-bold">Mes Réservations</h4>
              </Card.Header>
              <ListGroup variant="flush">
                {userReservations && userReservations.length > 0 ? (
                  userReservations.map((res) => (
                    <ListGroup.Item key={res._id} className="py-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1 fw-bold">{res.classe?.name}</h6>
                          <p className="mb-0 text-muted small">{res.classe?.date} à {res.classe?.time}</p>
                          <p className="mb-0 x-small">Salle: {res.classe?.salleDeSport?.name}</p>
                        </div>
                        <div className="text-end">
                          <p className="mb-1 fw-bold text-success">{res.prix} TND</p>
                          <Badge bg={res.status === 'valide' ? 'success' : res.status === 'refuse' ? 'danger' : 'warning'}>
                            {res.status}
                          </Badge>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item className="py-5 text-center text-muted">
                    Vous n'avez pas encore de réservations.
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profil;