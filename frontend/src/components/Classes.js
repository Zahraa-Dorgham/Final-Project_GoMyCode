import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { getClasses } from '../redux/classeSlice';
import { addReservation } from '../redux/reservationSlice';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import './Classes.css';

const Classes = () => {
  const dispatch = useDispatch();
  const { classes, status } = useSelector((state) => state.classe);
  const { user } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search')?.trim().toLowerCase() || '';

  useEffect(() => {
    dispatch(getClasses());
  }, []);

  const filteredClasses = (classes || []).filter((classe) => {
    if (!searchTerm) return true;

    return [
      classe.name,
      classe.gender,
      classe.coach?.nameCoach,
      classe.salleDeSport?.name,
    ]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(searchTerm));
  });

  const handleReserve = (classe) => {
    if (!user) {
      alert('Veuillez vous connecter pour réserver.');
      return;
    }

    const newRes = {
      user: user._id,
      classe: classe._id,
      phoneUser: user.phone || 'Non renseigné',
      prix: classe.prix,
    };

    dispatch(addReservation(newRes));
    alert('Demande de réservation envoyée !');
  };

  return (
    <div className="classes-page">
      <div className="classes-hero">
        <Container>
          <h1>Our Classes</h1>
          <p>Find the class that suits you and push your limits.</p>
        </Container>
      </div>

      <Container className="my-5">
        <Row>
          {status === 'pending' ? (
            <div className="text-center w-100 py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-3">Fetching best classes for you...</p>
            </div>
          ) : filteredClasses.length > 0 ? (
            filteredClasses.map((classe) => (
              <Col key={classe._id} lg={4} md={6} className="mb-4">
                <Card className="classe-card border-0 shadow-sm h-100">
                  <div className="card-img-wrapper">
                    <Card.Img
                      variant="top"
                      src={classe.img || 'https://images.unsplash.com/photo-1518611012118-296072bb5602'}
                      className="card-img-top"
                    />
                    <div className="gender-badge rounded-pill">
                      {classe.gender}
                    </div>
                    <div className="price-tag">
                      {classe.prix} TND
                    </div>
                  </div>

                  <Card.Body className="p-4 d-flex flex-column">
                    <Card.Title className="fw-bold mb-3 fs-4">{classe.name}</Card.Title>

                    <div className="classe-details-row">
                      <span className="detail-item">
                        <i className="bi bi-calendar-check me-2"></i> 
                        {new Date(classe.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                      </span>
                      <span className="detail-item">
                        <i className="bi bi-clock me-2"></i> 
                        {classe.time}
                      </span>
                    </div>

                    <hr className="my-3 opacity-10" />

                    <div className="coach-info d-flex align-items-center mb-4">
                      <div className="coach-avatar-link">
                        <img
                          src={classe.coach?.img || 'https://www.w3schools.com/howto/img_avatar.png'}
                          alt="coach"
                        />
                      </div>
                      <div className="ms-3">
                        <p className="mb-0 small fw-bold text-dark">{classe.coach?.nameCoach}</p>
                        <p className="mb-0 x-small text-muted">{classe.salleDeSport?.name}</p>
                      </div>
                    </div>

                    <Button
                      className="reserve-btn mt-auto"
                      onClick={() => handleReserve(classe)}
                    >
                      Reserve Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div className="text-center py-5 w-100">
              <i className="bi bi-search fs-1 text-muted mb-3 d-block"></i>
              <h3 className="text-muted">{searchTerm ? 'No sessions match your search' : 'No classes available right now'}</h3>
            </div>
          )}
        </Row>

        {/* New Weekly Schedule Summary Table */}
        <div className="mt-5 pt-5">
          <div className="section-title-wrapper mb-4">
            <h2 className="fw-bold">Weekly Schedule Summary</h2>
            <p className="text-muted">A quick overview of all sessions planned for this week.</p>
          </div>
          <div className="table-responsive bg-white p-4 rounded-4 shadow-sm">
            <table className="table table-hover align-middle mb-0 custom-schedule-table">
              <thead>
                <tr>
                  <th>Session</th>
                  <th>Coach</th>
                  <th>Schedule</th>
                  <th>Location</th>
                  <th>Category</th>
                  <th>Groups</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.map(c => (
                  <tr key={c._id}>
                    <td>
                      <div className="fw-bold">{c.name}</div>
                      <div className="small text-muted">{c.prix} TND</div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <img src={c.coach?.img || 'https://www.w3schools.com/howto/img_avatar.png'} alt="" className="rounded-circle me-2" style={{width: 30, height: 30, objectFit: 'cover'}} />
                        <span className="small">{c.coach?.nameCoach}</span>
                      </div>
                    </td>
                    <td>
                      <div className="small">{new Date(c.date).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit'})}</div>
                      <div className="fw-bold text-primary small">{c.time}</div>
                    </td>
                    <td className="small">{c.salleDeSport?.name}</td>
                    <td><Badge bg="light" text="dark" className="border">{c.gender}</Badge></td>
                    <td className="text-center fw-bold small">
                      {(c.reservations?.length || 0)} / {(c.nbGroups || 10)}
                    </td>
                    <td>
                      {c.reservations?.length >= c.nbGroups ? (
                        <Badge bg="danger" className="rounded-pill px-3">Full</Badge>
                      ) : (
                        <Badge bg="success" className="rounded-pill px-3">Available</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Classes;
