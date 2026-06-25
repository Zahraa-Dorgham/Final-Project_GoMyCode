import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserReservations } from '../redux/reservationSlice';
import { getCoaches } from '../redux/coachSlice';
import { userCurrent } from '../redux/userSlice';
import { Alert, Badge, Button, Container, Form, Modal } from 'react-bootstrap';
import {
  FaBolt,
  FaCalendarAlt,
  FaCalendarCheck,
  FaCheckCircle,
  FaClock,
  FaDumbbell,
  FaEnvelope,
  FaFireAlt,
  FaMapMarkerAlt,
  FaMedal,
  FaPhoneAlt,
  FaPlus,
  FaRegEdit,
  FaRunning,
  FaShieldAlt,
  FaStar,
  FaTimesCircle,
  FaUserCheck,
  FaWallet,
} from 'react-icons/fa';
import './Profil.css';

const statusLabels = {
  reserved: 'Reserved',
  canceled: 'Canceled',
};

const coachingStatusLabels = {
  pending: 'Pending',
  accepted: 'Accepted',
  rejected: 'Declined',
};

const statusIcons = {
  reserved: <FaCheckCircle />,
  canceled: <FaTimesCircle style={{color: '#e53e3e'}} />,
};

const coachingStatusIcons = {
  pending: <FaClock />,
  accepted: <FaCheckCircle />,
  rejected: <FaTimesCircle />,
};

const getInitials = (name = '') =>
  name
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'FC';

const formatDate = (date) => {
  if (!date) return 'Date to be confirmed';
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(parsedDate);
};

const normalizeStatus = (status = 'reserved') =>
  status.toLowerCase().replace(/\s+/g, '-').replace(/_/g, '-');

const getReservationDateValue = (reservation) => {
  const date = reservation.classe?.date || reservation.dateReservation;
  const time = reservation.classe?.time || '00:00';
  const parsed = new Date(`${date}T${time}`);

  if (Number.isNaN(parsed.getTime())) {
    return new Date(date).getTime() || 0;
  }

  return parsed.getTime();
};

const Profil = () => {
  const { user, status: userStatus } = useSelector((state) => state.user);
  const { userReservations } = useSelector((state) => state.reservation);
  const { coaches } = useSelector((state) => state.coach);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCoachingModal, setShowCoachingModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullname: '',
    email: '',
    phone: '',
    age: '',
    weight: '',
    gender: '',
  });
  const [coachingForm, setCoachingForm] = useState({
    coach: '',
    phoneUser: '',
    objectif: '',
    preferenceHoraire: '',
    message: '',
  });
  const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
  const [coachingMessage, setCoachingMessage] = useState({ type: '', text: '' });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSendingCoaching, setIsSendingCoaching] = useState(false);
  const [coachingRequests, setCoachingRequests] = useState([]);
  const [isLoadingCoaching, setIsLoadingCoaching] = useState(false);

  const loadUserCoachingRequests = useCallback(async (userId) => {
    if (!userId) return;

    setIsLoadingCoaching(true);

    try {
      const response = await axios.get(`http://localhost:5000/suivi/user/${userId}`);
      setCoachingRequests(response.data.suivis || []);
    } catch (error) {
      setCoachingRequests([]);
    } finally {
      setIsLoadingCoaching(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      const hasToken = Boolean(localStorage.getItem('token'));

      if (!hasToken || userStatus === 'fail') {
        navigate('/login');
      }

      return;
    }

    // Redirect admins to admin dashboard
    if (user.role === 'admin') {
      navigate('/admin');
      return;
    }

    dispatch(getUserReservations(user._id));
    dispatch(getCoaches());
    loadUserCoachingRequests(user._id);
  }, [user, userStatus, navigate, dispatch, loadUserCoachingRequests]);

  useEffect(() => {
    if (!user) return;

    setProfileForm({
      fullname: user.fullname || '',
      email: user.email || '',
      phone: user.phone || '',
      age: user.age || '',
      weight: user.weight || '',
      gender: user.gender || '',
    });

    setCoachingForm((current) => ({
      ...current,
      phoneUser: user.phone || '',
    }));
  }, [user]);

  const reservations = useMemo(() => userReservations || [], [userReservations]);

  const profileStats = useMemo(() => {
    const reserved = reservations.filter((res) => res.status === 'reserved').length;
    const canceled = reservations.filter((res) => res.status === 'canceled').length;
    const totalSpent = reservations.reduce((total, res) => {
      // Only count spent money for active reservations
      if (res.status === 'reserved') {
        return total + Number(res.prix || res.classe?.prix || 0);
      }
      return total;
    }, 0);
    const upcoming = [...reservations]
      .filter((res) => res.status === 'reserved')
      .sort((a, b) => getReservationDateValue(a) - getReservationDateValue(b))[0];

    return { confirmed: reserved, canceled, totalSpent, upcoming };
  }, [reservations]);

  if (!user) return null;

  const role = user.role || 'member';
  const phone = user.phone || 'Not provided';
  const memberSince = user.createdAt ? formatDate(user.createdAt) : 'New member';
  const progress = reservations.length ? Math.round((profileStats.confirmed / reservations.length) * 100) : 0;
  const goalProgress = Math.min((profileStats.confirmed / 8) * 100, 100);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfileForm((current) => ({ ...current, [name]: value }));
  };

  const handleCoachingChange = (event) => {
    const { name, value } = event.target;
    setCoachingForm((current) => ({ ...current, [name]: value }));
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setIsSavingProfile(true);
    setProfileMessage({ type: '', text: '' });

    try {
      await axios.put(`http://localhost:5000/auth/${user._id}`, profileForm);
      await dispatch(userCurrent()).unwrap();
      setProfileMessage({ type: 'success', text: 'Profile updated successfully.' });
      setTimeout(() => setShowEditModal(false), 650);
    } catch (error) {
      setProfileMessage({ type: 'danger', text: 'Unable to update your profile right now.' });
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleCoachingSubmit = async (event) => {
    event.preventDefault();
    setIsSendingCoaching(true);
    setCoachingMessage({ type: '', text: '' });

    try {
      await axios.post('http://localhost:5000/suivi/add', {
        ...coachingForm,
        user: user._id,
      });
      await loadUserCoachingRequests(user._id);

      setCoachingMessage({ type: 'success', text: 'Coaching request sent successfully.' });
      setCoachingForm({
        coach: '',
        phoneUser: user.phone || '',
        objectif: '',
        preferenceHoraire: '',
        message: '',
      });
      setTimeout(() => setShowCoachingModal(false), 750);
    } catch (error) {
      setCoachingMessage({ type: 'danger', text: 'Unable to send the request. Please select a coach and try again.' });
    } finally {
      setIsSendingCoaching(false);
    }
  };

  return (
    <main className="profile-page">
      <Container fluid className="profile-shell">
        <header className="profile-heading">
          <div>
            <span className="profile-eyebrow">FitConnect Member Area</span>
            <h1>My Profile</h1>
            <p>Manage your account details, class bookings, and personal coaching requests.</p>
          </div>
          <div className="profile-heading-actions">
            <Button className="profile-light-btn" onClick={() => navigate('/classes')}>
              <FaCalendarCheck />
              Book a Class
            </Button>
            <Button className="profile-primary-btn" onClick={() => setShowCoachingModal(true)}>
              <FaPlus />
              Coaching Request
            </Button>
          </div>
        </header>

        <section className="profile-layout">
          <aside className="profile-left-panel">
            <div className="profile-identity-card">
              <div className="profile-gradient-top">
                <div className="profile-avatar">{getInitials(user.fullname)}</div>
              </div>

              <div className="profile-identity-body">
                <h2>{user.fullname}</h2>
                <Badge className="profile-premium-badge">
                  <FaStar />
                  Premium Member
                </Badge>

                <div className="profile-contact-list">
                  <div className="profile-contact-item">
                    <FaEnvelope />
                    <span>{user.email}</span>
                  </div>
                  <div className="profile-contact-item">
                    <FaPhoneAlt />
                    <span>{phone}</span>
                  </div>
                </div>

                <Button className="profile-edit-btn" type="button" onClick={() => setShowEditModal(true)}>
                  <FaRegEdit />
                  Edit Profile
                </Button>
              </div>
            </div>

            <div className="profile-mini-card profile-member-card">
              <div className="profile-mini-icon">
                <FaShieldAlt />
              </div>
              <div>
                <small>Membership</small>
                <strong>{role}</strong>
                <span>Since {memberSince}</span>
              </div>
            </div>

            <div className="profile-goal-card">
              <div className="profile-goal-header">
                <div>
                  <small>Monthly Goal</small>
                  <strong>{profileStats.confirmed}/8 sessions</strong>
                </div>
                <FaFireAlt />
              </div>
              <div className="profile-progress-track">
                <span style={{ width: `${goalProgress}%` }} />
              </div>
              <p>{Math.max(8 - profileStats.confirmed, 0)} session(s) left to unlock your Momentum badge.</p>
            </div>
          </aside>

          <section className="profile-content">
            <div className="profile-stats-grid">
              <div className="profile-stat-card">
                <span><FaCalendarCheck /></span>
                <div>
                  <strong>{reservations.length}</strong>
                  <small>Total Bookings</small>
                </div>
              </div>
              <div className="profile-stat-card">
                <span><FaCheckCircle /></span>
                <div>
                  <strong>{profileStats.confirmed}</strong>
                  <small>Active Reserved</small>
                </div>
              </div>
              <div className="profile-stat-card">
                <span><FaTimesCircle style={{color: '#e53e3e'}} /></span>
                <div>
                  <strong>{profileStats.canceled}</strong>
                  <small>Cancellations</small>
                </div>
              </div>
              <div className="profile-stat-card">
                <span><FaWallet /></span>
                <div>
                  <strong>{profileStats.totalSpent}</strong>
                  <small>TND invested</small>
                </div>
              </div>
            </div>

            <section className="profile-panel profile-reservations-panel">
              <div className="profile-panel-header">
                <div>
                  <h2>My Bookings</h2>
                  <p>{reservations.length} class{reservations.length > 1 ? 'es' : ''} booked</p>
                </div>
                <div className="profile-progress-chip">
                  <FaBolt />
                  {progress}% confirmed
                </div>
              </div>

              <div className="profile-reservation-grid">
                {reservations.length > 0 ? (
                  reservations.map((res, index) => {
                    const status = res.status || 'en_attente';
                    const statusClass = normalizeStatus(status);
                    const className = res.classe?.name || 'Fitness class';
                    const coachName = res.classe?.coach?.nameCoach || res.classe?.coach?.fullname || 'Coach FitConnect';
                    const gymName = res.classe?.salleDeSport?.name || 'Gym to be confirmed';
                    const price = res.prix || res.classe?.prix || 0;

                    const canCancel = (() => {
                      if (res.status === 'canceled') return false;
                      if (!res.classe?.date || !res.classe?.time) return false;
                      const cDate = new Date(res.classe.date);
                      const [h, m] = res.classe.time.split(':');
                      cDate.setHours(parseInt(h), parseInt(m), 0);
                      return (cDate - new Date()) / (1000 * 60 * 60) >= 48;
                    })();

                    const handleCancel = async (resId) => {
                      if (window.confirm('Are you sure you want to cancel this reservation?')) {
                        try {
                          await axios.delete(`http://localhost:5000/reservation/cancel/${resId}`);
                          dispatch(getUserReservations(user._id));
                          alert('Reservation cancelled successfully.');
                        } catch (err) {
                          alert(err.response?.data?.msg || 'Error cancelling reservation');
                        }
                      }
                    };

                    return (
                      <article className="profile-reservation-card" key={res._id || `${className}-${index}`}>
                        <div className="profile-reservation-glow" />
                        <div className="profile-reservation-top">
                          <div>
                            <h3>{className}</h3>
                            <p>with {coachName}</p>
                          </div>
                          <Badge className={`profile-status profile-status-${statusClass}`}>
                            {statusIcons[status] || <FaClock />}
                            {statusLabels[status] || status}
                          </Badge>
                        </div>

                        <div className="profile-reservation-info">
                          <span>
                            <FaCalendarAlt />
                            {formatDate(res.classe?.date)}
                          </span>
                          <span>
                            <FaClock />
                            {res.classe?.time || 'Time to be confirmed'}
                          </span>
                          <span>
                            <FaMapMarkerAlt />
                            {gymName}
                          </span>
                        </div>

                        <div className="profile-reservation-footer">
                          <strong>{price} TND</strong>
                          <div style={{display: 'flex', gap: 10}}>
                            {canCancel && (
                              <button type="button" className="cancel-pill-btn" onClick={() => handleCancel(res._id)}>
                                Cancel
                              </button>
                            )}
                            <button type="button" onClick={() => navigate('/classes')}>
                              Explore
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })
                ) : (
                  <div className="profile-empty-state">
                    <div className="profile-empty-icon">
                      <FaCalendarCheck />
                    </div>
                    <h3>No bookings yet</h3>
                    <p>Choose a class and start building your training schedule.</p>
                    <Button className="profile-primary-btn" onClick={() => navigate('/classes')}>
                      Browse Classes
                    </Button>
                  </div>
                )}
              </div>
            </section>

            <section className="profile-bottom-grid">
              <div className="profile-panel profile-coach-panel">
                <div className="profile-panel-header compact">
                  <div>
                    <h2>Personal Coaching</h2>
                    <p>Request one-to-one guidance from a coach.</p>
                  </div>
                  <Button className="profile-primary-btn" onClick={() => setShowCoachingModal(true)}>
                    <FaPlus />
                    New Request
                  </Button>
                </div>

                {isLoadingCoaching ? (
                  <div className="profile-coach-empty">
                    <div className="profile-coach-orbit">
                      <FaUserCheck />
                    </div>
                    <p>Loading your requests...</p>
                  </div>
                ) : coachingRequests.length > 0 ? (
                  <div className="profile-suivi-list">
                    {coachingRequests.map((request) => {
                      const status = request.status || 'pending';

                      return (
                        <article className="profile-suivi-card" key={request._id}>
                          <div className="profile-suivi-icon">
                            <FaUserCheck />
                          </div>
                          <div className="profile-suivi-content">
                            <div className="profile-suivi-top">
                              <div>
                                <h3>{request.coach?.nameCoach || 'Coach to be confirmed'}</h3>
                                <p>{request.objectif || 'Personal goal'}</p>
                              </div>
                              <Badge className={`profile-status profile-suivi-status-${status}`}>
                                {coachingStatusIcons[status] || <FaClock />}
                                {coachingStatusLabels[status] || status}
                              </Badge>
                            </div>
                            <div className="profile-suivi-meta">
                              <span>
                                <FaPhoneAlt />
                                {request.phoneUser}
                              </span>
                              <span>
                                <FaClock />
                                {request.preferenceHoraire || 'Schedule to define'}
                              </span>
                            </div>
                            {request.message && <p className="profile-suivi-message">{request.message}</p>}
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="profile-coach-empty">
                    <div className="profile-coach-orbit">
                      <FaUserCheck />
                    </div>
                    <p>No coaching requests yet. Start your first request when you are ready.</p>
                  </div>
                )}
              </div>

              <div className="profile-panel profile-next-panel">
                <div className="profile-panel-header compact">
                  <div>
                    <h2>Next Step</h2>
                    <p>Your immediate training focus.</p>
                  </div>
                  <FaRunning className="profile-running-icon" />
                </div>

                {profileStats.upcoming ? (
                  <div className="profile-next-class">
                    <span><FaMedal /></span>
                    <div>
                      <strong>{profileStats.upcoming.classe?.name || 'Fitness class'}</strong>
                      <small>
                        {formatDate(profileStats.upcoming.classe?.date)} at {profileStats.upcoming.classe?.time || 'to be confirmed'}
                      </small>
                    </div>
                  </div>
                ) : (
                  <div className="profile-next-class">
                    <span><FaDumbbell /></span>
                    <div>
                      <strong>Open Plan</strong>
                      <small>Book a session to activate your next goal.</small>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </section>
        </section>
      </Container>

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        dialogClassName="profile-modal-dialog"
        contentClassName="profile-modal-content"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleProfileSubmit}>
          <Modal.Body>
            {profileMessage.text && <Alert variant={profileMessage.type}>{profileMessage.text}</Alert>}
            <div className="profile-modal-grid">
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control name="fullname" value={profileForm.fullname} onChange={handleProfileChange} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={profileForm.email} onChange={handleProfileChange} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control name="phone" value={profileForm.phone} onChange={handleProfileChange} placeholder="+212..." />
              </Form.Group>
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <Form.Select name="gender" value={profileForm.gender} onChange={handleProfileChange}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control type="number" min="1" name="age" value={profileForm.age} onChange={handleProfileChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Weight</Form.Label>
                <Form.Control type="number" min="1" name="weight" value={profileForm.weight} onChange={handleProfileChange} />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="profile-light-btn" type="button" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button className="profile-primary-btn" type="submit" disabled={isSavingProfile}>
              {isSavingProfile ? 'Saving...' : 'Save Changes'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal
        show={showCoachingModal}
        onHide={() => setShowCoachingModal(false)}
        centered
        dialogClassName="profile-modal-dialog"
        contentClassName="profile-modal-content"
      >
        <Modal.Header closeButton>
          <Modal.Title>Request Personal Coaching</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCoachingSubmit}>
          <Modal.Body>
            {coachingMessage.text && <Alert variant={coachingMessage.type}>{coachingMessage.text}</Alert>}
            <div className="profile-modal-grid single">
              <Form.Group>
                <Form.Label>Preferred Coach</Form.Label>
                <Form.Select name="coach" value={coachingForm.coach} onChange={handleCoachingChange} required>
                  <option value="">Select a coach</option>
                  {(coaches || []).map((coach) => (
                    <option value={coach._id} key={coach._id}>
                      {coach.nameCoach} - {coach.specialite}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone</Form.Label>
                <Form.Control name="phoneUser" value={coachingForm.phoneUser} onChange={handleCoachingChange} required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Goal</Form.Label>
                <Form.Select name="objectif" value={coachingForm.objectif} onChange={handleCoachingChange}>
                  <option value="">Select a goal</option>
                  <option value="Weight loss">Weight loss</option>
                  <option value="Muscle gain">Muscle gain</option>
                  <option value="Endurance">Endurance</option>
                  <option value="General fitness">General fitness</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Preferred Schedule</Form.Label>
                <Form.Control
                  name="preferenceHoraire"
                  value={coachingForm.preferenceHoraire}
                  onChange={handleCoachingChange}
                  placeholder="Example: evenings, weekends..."
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="message"
                  value={coachingForm.message}
                  onChange={handleCoachingChange}
                  placeholder="Briefly describe what you need..."
                />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="profile-light-btn" type="button" onClick={() => setShowCoachingModal(false)}>
              Cancel
            </Button>
            <Button className="profile-primary-btn" type="submit" disabled={isSendingCoaching}>
              {isSendingCoaching ? 'Sending...' : 'Send Request'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </main>
  );
};

export default Profil;
