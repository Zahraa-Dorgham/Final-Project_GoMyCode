import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoaches } from '../redux/coachSlice';
import { Badge, Card, Col, Container, Row } from 'react-bootstrap';
import { FaDumbbell, FaMapMarkerAlt, FaPhoneAlt, FaUserTie } from 'react-icons/fa';
import './Coach.css';

const defaultCoachImage = 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=80';

const genderFilters = [
  { value: 'all', label: 'Tous' },
  { value: 'male', label: 'Men' },
  { value: 'female', label: 'Women' },
];

const normalizeCoachGender = (coach) => {
  const gender = (coach.gender || coach.genre || coach.sexe || coach.sex || '').toLowerCase().trim();

  if (['male', 'men', 'man', 'homme', 'masculin'].includes(gender)) {
    return 'male';
  }

  if (['female', 'women', 'woman', 'femme', 'feminin', 'féminin'].includes(gender)) {
    return 'female';
  }

  return '';
};

const Coach = () => {
  const dispatch = useDispatch();
  const { coaches, status } = useSelector((state) => state.coach);
  const [genderFilter, setGenderFilter] = useState('all');
  const hasCoaches = coaches && coaches.length > 0;
  const filteredCoaches = hasCoaches
    ? coaches.filter((coach) => genderFilter === 'all' || normalizeCoachGender(coach) === genderFilter)
    : [];
  const hasFilteredCoaches = filteredCoaches.length > 0;
  const showEmptyState = status === 'success' && !hasCoaches;
  const showFilterEmptyState = status === 'success' && hasCoaches && !hasFilteredCoaches;

  useEffect(() => {
    if (status !== 'success') {
      dispatch(getCoaches());
    }
  }, []);

  return (
    <main className="coaches-page">
      <section className="coaches-hero">
        <Container>
          <span className="coaches-kicker">Team Fit Club</span>
          <h1>Our Coaches</h1>
        </Container>
      </section>

      <Container className="coaches-content">
        {hasCoaches ? (
          <>
            <div className="coach-filter-bar" aria-label="Filtrer les coaches par genre">
              {genderFilters.map((filter) => (
                <button
                  key={filter.value}
                  type="button"
                  className={`coach-filter-btn${genderFilter === filter.value ? ' active' : ''}`}
                  onClick={() => setGenderFilter(filter.value)}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {hasFilteredCoaches ? (
              <Row className="g-4">
                {filteredCoaches.map((coach) => (
                  <Col key={coach._id} lg={4} md={6} className="coach-col">
                    <Card className="coach-card">
                      <div className="coach-image-wrapper">
                        <Card.Img
                          src={coach.img?.trim() || defaultCoachImage}
                          alt={coach.nameCoach}
                          className="coach-image"
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.src = defaultCoachImage;
                          }}
                        />
                        <Badge className="coach-speciality">
                          <FaDumbbell />
                          {coach.specialite}
                        </Badge>
                      </div>

                      <Card.Body className="coach-card-body">
                        <h2>{coach.nameCoach}</h2>
                        <p className="coach-description">
                          {coach.description || 'Coach professionnel prêt à vous accompagner dans votre progression.'}
                        </p>

                        <div className="coach-meta-list">
                          <div className="coach-meta-item">
                            <span><FaMapMarkerAlt /></span>
                            <div>
                              <small>Salle</small>
                              <strong>{coach.salleDeSport?.name || 'Salle non renseignée'}</strong>
                            </div>
                          </div>
                          <div className="coach-meta-item">
                            <span><FaPhoneAlt /></span>
                            <div>
                              <small>Phone</small>
                              <strong>{coach.phone}</strong>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : showFilterEmptyState ? (
              <div className="coaches-state">
                <FaUserTie />
                <h3>No coaches found</h3>
              </div>
            ) : null}
          </>
        ) : showEmptyState ? (
          <div className="coaches-state">
            <FaUserTie />
            <h3>No coaches available</h3>
            <p>Add coaches to the database to display them here.</p>
          </div>
        ) : null}
      </Container>
    </main>
  );
};

export default Coach;
