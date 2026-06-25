import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/userSlice';
import {
  FaUsers,
  FaDumbbell,
  FaChalkboardTeacher,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaHome,
  FaBuilding,
  FaBoxOpen,
  FaCheckCircle,
  FaSignOutAlt,
  FaSearch,
  FaBell,
  FaArrowRight,
  FaTruck,
  FaShoppingBag,
  FaClock,
} from 'react-icons/fa';
import './Admin.css';
import AddProduct from './modals/AddProduct';
import EditProduct from './modals/EditProduct';
import AddCoach from './modals/AddCoach';
import EditCoach from './modals/EditCoach';
import AddClass from './modals/AddClass';
import EditClass from './modals/EditClass';
import AddSalle from './modals/AddSalle';
import EditSalle from './modals/EditSalle';

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [users, setUsers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [products, setProducts] = useState([]);
  const [salles, setSalles] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ping, setPing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchAllData();
  }, [ping]);

  useEffect(() => {
    if (successMsg) {
      const timer = setTimeout(() => setSuccessMsg(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMsg]);

  const fetchAllData = async () => {
    try {
      const [usersRes, classesRes, coachesRes, productsRes, sallesRes, reservationsRes, ordersRes] = await Promise.all([
        axios.get('http://localhost:5000/auth/').catch(() => ({ data: { users: [] } })),
        axios.get('http://localhost:5000/classe/all').catch(() => ({ data: { classes: [] } })),
        axios.get('http://localhost:5000/coach/all').catch(() => ({ data: { coaches: [] } })),
        axios.get('http://localhost:5000/shop/all').catch(() => ({ data: { products: [] } })),
        axios.get('http://localhost:5000/salle/all').catch(() => ({ data: { salles: [] } })),
        axios.get('http://localhost:5000/reservation/all').catch(() => ({ data: { reservations: [] } })),
        axios.get('http://localhost:5000/order/all').catch(() => ({ data: { orders: [] } })),
      ]);

      setUsers(usersRes.data.users || []);
      setClasses(classesRes.data.classes || []);
      setCoaches(coachesRes.data.coaches || []);
      setProducts(productsRes.data.products || []);
      setSalles(sallesRes.data.salles || []);
      setReservations(reservationsRes.data.reservations || []);
      setOrders(ordersRes.data.orders || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Order Operations
  const handleConfirmOrder = async (id) => {
    try {
      await axios.put(`http://localhost:5000/order/confirm/${id}`);
      setSuccessMsg('Order confirmed!');
      setPing(!ping);
    } catch (error) { console.error(error); }
  };

  const handleDeliverOrder = async (id) => {
    try {
      await axios.put(`http://localhost:5000/order/deliver/${id}`);
      setSuccessMsg('Order marked as In Delivery!');
      setPing(!ping);
    } catch (error) { console.error(error); }
  };

  const handleMarkDelivered = async (id) => {
    try {
      await axios.put(`http://localhost:5000/order/delivered/${id}`);
      setSuccessMsg('Order marked as Delivered!');
      setPing(!ping);
    } catch (error) { console.error(error); }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Delete this order?')) {
      try {
        await axios.delete(`http://localhost:5000/order/${id}`);
        setSuccessMsg('Order deleted.');
        fetchAllData();
      } catch (error) { console.error(error); }
    }
  };

  // Handlers for deleting are kept here for simplicity
  const handleDeleteCoach = async (id) => {
    if (window.confirm('Are you sure you want to delete this coach?')) {
      try {
        await axios.delete(`http://localhost:5000/coach/${id}`);
        setSuccessMsg('Coach deleted.');
        setPing(!ping);
      } catch (error) { console.error(error); }
    }
  };

  const handleDeleteClass = async (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      try {
        await axios.delete(`http://localhost:5000/classe/${id}`);
        setSuccessMsg('Class deleted.');
        setPing(!ping);
      } catch (error) { console.error(error); }
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/shop/${id}`);
        setSuccessMsg('Product deleted.');
        setPing(!ping);
      } catch (error) { console.error(error); }
    }
  };

  const handleDeleteSalle = async (id) => {
    if (window.confirm('Delete this gym?')) {
      try {
        await axios.delete(`http://localhost:5000/salle/${id}`);
        setSuccessMsg('Gym deleted.');
        setPing(!ping);
      } catch (error) { console.error(error); }
    }
  };

  // User Operations
  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:5000/auth/${id}`);
        setSuccessMsg('User deleted successfully!');
        fetchAllData();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const renderDashboard = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-home">
            <div className="dashboard-header">
              <h1>Overview</h1>
              <p>Real-time network activity</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-info">
                  <h4>Active Gyms</h4>
                  <h2>{salles.length}</h2>
                  <div className="stat-trend trend-up">+1 this month</div>
                </div>
                <div className="stat-icon-wrapper active-gyms-bg">
                  <FaBuilding />
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-info">
                  <h4>Total Members</h4>
                  <h2>{users.length}</h2>
                  <div className="stat-trend trend-up">{(users.length / 10).toFixed(1)}% growth</div>
                </div>
                <div className="stat-icon-wrapper total-members-bg">
                  <FaUsers />
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-info">
                  <h4>Total Reservations</h4>
                  <h2>{reservations.length}</h2>
                  <div className="stat-trend trend-up">real-time</div>
                </div>
                <div className="stat-icon-wrapper pending-orders-bg">
                  <FaCheckCircle />
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-info">
                  <h4>Upcoming Classes</h4>
                  <h2>{classes.length}</h2>
                  <div className="stat-trend trend-up">this week</div>
                </div>
                <div className="stat-icon-wrapper upcoming-classes-bg">
                  <FaDumbbell />
                </div>
              </div>
            </div>

            <div className="charts-row">
              {(() => {
                // Compute last 6 months labels
                const last6Months = Array.from({ length: 6 }, (_, i) => {
                  const d = new Date();
                  d.setMonth(d.getMonth() - (5 - i));
                  return { label: d.toLocaleString('en-US', { month: 'short' }), month: d.getMonth(), year: d.getFullYear() };
                });

                // Revenue per month (from reservations.prix)
                const revenueData = last6Months.map(({ month, year }) =>
                  reservations
                    .filter(r => {
                      const d = new Date(r.dateReservation);
                      return d.getMonth() === month && d.getFullYear() === year;
                    })
                    .reduce((sum, r) => sum + (r.prix || 0), 0)
                );

                // Members acquired per month (from users.createdAt)
                const memberData = last6Months.map(({ month, year }) =>
                  users.filter(u => {
                    const d = new Date(u.createdAt);
                    return d.getMonth() === month && d.getFullYear() === year;
                  }).length
                );

                const maxRevenue = Math.max(...revenueData, 1);
                const maxMembers = Math.max(...memberData, 1);
                const W = 400, H = 140, pad = 10;
                const stepX = (W - pad * 2) / (last6Months.length - 1);

                const revenuePoints = revenueData.map((v, i) => ({
                  x: pad + i * stepX,
                  y: H - pad - ((v / maxRevenue) * (H - pad * 2))
                }));
                const pathD = revenuePoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
                const areaD = pathD + ` L${revenuePoints[revenuePoints.length - 1].x},${H} L${revenuePoints[0].x},${H} Z`;

                return (
                  <>
                    <div className="chart-box">
                      <div className="chart-box-header">
                        <h3>Monthly Revenue</h3>
                        <strong style={{ color: '#6b46c1' }}>{revenueData.reduce((a, b) => a + b, 0)} TND</strong>
                      </div>
                      <div className="simulated-chart" style={{ padding: '8px 4px 0' }}>
                        <svg viewBox={`0 0 ${W} ${H + 20}`} style={{ width: '100%', height: '100%' }}>
                          <defs>
                            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#6b46c1" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#6b46c1" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path d={areaD} fill="url(#revGrad)" />
                          <path d={pathD} fill="none" stroke="#6b46c1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          {revenuePoints.map((p, i) => (
                            <g key={i}>
                              <circle cx={p.x} cy={p.y} r="4" fill="#6b46c1" />
                              <text x={p.x} y={H + 15} textAnchor="middle" fontSize="11" fill="#a0aec0">{last6Months[i].label}</text>
                              <text x={p.x} y={p.y - 8} textAnchor="middle" fontSize="10" fill="#6b46c1" fontWeight="700">
                                {revenueData[i] > 0 ? revenueData[i] : ''}
                              </text>
                            </g>
                          ))}
                        </svg>
                      </div>
                    </div>

                    <div className="chart-box">
                      <div className="chart-box-header">
                        <h3>Member Acquisition</h3>
                        <strong style={{ color: '#319795' }}>+{memberData.reduce((a, b) => a + b, 0)} total</strong>
                      </div>
                      <div className="simulated-chart" style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', padding: '8px 8px 0' }}>
                        <svg viewBox={`0 0 ${W} ${H + 20}`} style={{ width: '100%', height: '100%' }}>
                          {memberData.map((v, i) => {
                            const barW = (W - pad * 2) / last6Months.length - 6;
                            const barH = Math.max(4, (v / maxMembers) * (H - pad * 2));
                            const bx = pad + i * ((W - pad * 2) / last6Months.length);
                            return (
                              <g key={i}>
                                <rect
                                  x={bx} y={H - pad - barH}
                                  width={barW} height={barH}
                                  rx="4"
                                  fill={v > 0 ? '#319795' : '#e2e8f0'}
                                  opacity="0.85"
                                />
                                <text x={bx + barW / 2} y={H + 15} textAnchor="middle" fontSize="11" fill="#a0aec0">{last6Months[i].label}</text>
                                <text x={bx + barW / 2} y={H - pad - barH - 5} textAnchor="middle" fontSize="10" fill="#319795" fontWeight="700">
                                  {v > 0 ? v : ''}
                                </text>
                              </g>
                            );
                          })}
                        </svg>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>

            <div className="bottom-lists">
              <div className="list-box">
                <div className="list-box-header">
                  <h3>Recent Reservations</h3>
                  <FaArrowRight onClick={() => setActiveTab('orders')} style={{ color: '#a0aec0', cursor: 'pointer' }} />
                </div>
                <div className="list-items">
                  {reservations.slice(0, 4).map(res => (
                    <div key={res._id} className="list-item">
                      <div className="item-info">
                        <div className="item-avatar">{res.user?.fullname?.substring(0, 2).toUpperCase() || '??'}</div>
                        <div className="item-details">
                          <h5>{res.user?.fullname || 'Unknown User'}</h5>
                          <p>{res.classe?.name || 'Class session'}</p>
                        </div>
                      </div>
                      <div className="item-price">
                        <strong>{res.prix} TND</strong>
                        <span className={`item-status ${res.status === 'valide' ? 'status-green' : 'status-orange'}`}>
                          {res.status === 'en_attente' ? 'Pending' : res.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {reservations.length === 0 && <p style={{fontSize: 12, color: '#a0aec0'}}>No recent reservations.</p>}
                </div>
              </div>

              <div className="list-box">
                <div className="list-box-header">
                  <h3>New Members</h3>
                  <button className="btn-secondary" onClick={() => setActiveTab('users')} style={{ padding: '4px 10px', fontSmoothing: 'antialiased', fontSize: '11px', background: '#f7fafc', border: '1px solid #edf2f7', borderRadius: '6px' }}>View all</button>
                </div>
                <div className="list-items">
                  {users.slice(-4).reverse().map(u => (
                    <div key={u._id} className="list-item">
                      <div className="item-info">
                        <div className="item-avatar" style={{ background: '#f3f0ff', color: '#6b46c1' }}>{u.fullname?.substring(0, 2).toUpperCase() || 'US'}</div>
                        <div className="item-details">
                          <h5>{u.fullname}</h5>
                          <p>{u.email}</p>
                        </div>
                      </div>
                      <span className="item-status" style={{ background: '#f3f0ff', color: '#6b46c1' }}>Member</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'coaches':
        return (
          <div className="dashboard-home">
            <div className="section-header">
              <h2>Manage Coaches</h2>
              <AddCoach salles={salles} ping={ping} setping={setPing} />
            </div>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Name</th>
                    <th>Speciality</th>
                    <th>Phone</th>
                    <th>Gym</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coaches.map((coach) => (
                    <tr key={coach._id}>
                      <td>{coach.img ? <img src={coach.img} className="coach-table-img" alt="" style={{width: 40, height: 40, borderRadius: '50%', objectFit: 'cover'}} /> : <div className="placeholder-img">No Img</div>}</td>
                      <td>{coach.nameCoach}</td>
                      <td>{coach.specialite}</td>
                      <td>{coach.phone}</td>
                      <td>{coach.salleDeSport?.name || 'N/A'}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <EditCoach coach={coach} salles={salles} ping={ping} setping={setPing} />
                          <button className="btn-action delete" onClick={() => handleDeleteCoach(coach._id)}><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="dashboard-home">
            <div className="section-header">
              <h2>Users</h2>
              <span className="total-count">{users.length} Total</span>
            </div>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td>{u.fullname}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <button className="btn-action delete" onClick={() => handleDeleteUser(u._id)}><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'salles':
        return (
          <div className="dashboard-home">
            <div className="section-header">
              <h2>Manage Gyms</h2>
              <AddSalle ping={ping} setping={setPing} />
            </div>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Logo</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {salles.map(s => (
                    <tr key={s._id}>
                      <td>{s.img ? <img src={s.img} className="gym-table-img" alt="" style={{width: 40, height: 40, borderRadius: '50%', objectFit: 'cover'}} /> : <div className="placeholder-img">No Logo</div>}</td>
                      <td>{s.name}</td>
                      <td>{s.localisation}</td>
                      <td>{s.email}</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <EditSalle salle={s} ping={ping} setping={setPing} />
                          <button className="btn-action delete" onClick={() => handleDeleteSalle(s._id)}><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="dashboard-home">
            <div className="section-header">
              <h2>Shop Management</h2>
              <AddProduct ping={ping} setping={setPing} />
            </div>
            <div className="admin-products-grid">
              {products.map(p => {
                const imgSrc = p.image || (Array.isArray(p.images) && p.images[0]) || null;
                return (
                  <div key={p._id} className="admin-product-card">
                    <div className="admin-product-img-wrapper">
                      {imgSrc ? (
                        <img src={imgSrc} alt={p.name} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                      ) : null}
                      <div className="admin-product-placeholder" style={imgSrc ? {display: 'none'} : {}}>
                        <FaShoppingBag style={{fontSize: 28, color: '#cbd5e0'}} />
                        <span>No Image</span>
                      </div>
                      <span className="admin-product-stock-badge" style={{background: p.stock > 0 ? '#f0fff4' : '#fff5f5', color: p.stock > 0 ? '#276749' : '#c53030'}}>
                        {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                      </span>
                    </div>
                    <div className="admin-product-info">
                      <span className="admin-product-category">{p.category || 'General'}</span>
                      <h5>{p.name}</h5>
                      <p className="admin-product-price">{p.price} TND</p>
                      <div className="admin-product-actions">
                        <EditProduct product={p} ping={ping} setping={setPing} />
                        <button className="btn-action delete" onClick={() => handleDeleteProduct(p._id)} title="Delete"><FaTrash /></button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'classes':
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return (
          <div className="dashboard-home">
            <div className="section-header">
              <h2>Scheduled Classes</h2>
              <AddClass coaches={coaches} salles={salles} ping={ping} setping={setPing} />
            </div>
            
            <div className="weekly-schedule-container">
              <div className="schedule-header">
                <h3>Weekly Timetable</h3>
                <p>Sessions mapped by specific dates</p>
              </div>
              
              <div className="schedule-grid">
                {days.map(day => {
                  const dayClasses = classes.filter(c => {
                    const classDay = new Date(c.date).toLocaleDateString('en-US', { weekday: 'long' });
                    return classDay === day;
                  });
                  return (
                    <div key={day} className="schedule-day-column">
                      <div className="day-name">{day}</div>
                      <div className="day-classes-list">
                        {dayClasses.length > 0 ? (
                          dayClasses.map(c => (
                            <div key={c._id} className="schedule-item-card">
                              {c.img && (
                                <div className="class-card-img-wrapper">
                                  <img src={c.img} alt={c.name} />
                                </div>
                              )}
                              <div className="time-badge"><FaClock style={{marginRight: 6}} /> {c.time}</div>
                              <div className="class-info">
                                <h5>{c.name}</h5>
                                <p><FaChalkboardTeacher /> {c.coach?.nameCoach || 'Guest Coach'}</p>
                              </div>
                              <div className="gym-tag"><FaBuilding style={{marginRight: 4}} /> {c.salleDeSport?.name}</div>
                              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12}}>
                                <div className="date-text">{new Date(c.date).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</div>
                                <EditClass classe={c} coaches={coaches} salles={salles} ping={ping} setping={setPing} />
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="no-classes">No sessions</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="table-container" style={{marginTop: 40}}>
              <h3>Search & Detail List</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Class Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Groups</th>
                    <th>Coach</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {classes.map((cls) => (
                    <tr key={cls._id}>
                      <td>{cls.img ? <img src={cls.img} alt="" style={{width: 40, height: 40, borderRadius: '8px', objectFit: 'cover'}} /> : 'N/A'}</td>
                      <td>{cls.name}</td>
                      <td><span className="day-pill">{new Date(cls.date).toLocaleDateString()}</span></td>
                      <td>{cls.time}</td>
                      <td><span className="groups-pill">{cls.reservations?.length || 0} / {cls.nbGroups || 10}</span></td>
                      <td>{cls.coach?.nameCoach}</td>
                      <td>{cls.gender}</td>
                      <td>{cls.prix} TND</td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <EditClass classe={cls} coaches={coaches} salles={salles} ping={ping} setping={setPing} />
                          <button className="btn-action delete" onClick={() => handleDeleteClass(cls._id)} title="Delete Class"><FaTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'orders': {
        const statusConfig = {
          pending:     { label: 'Pending',     color: '#dd6b20', bg: '#fffaf0' },
          confirmed:   { label: 'Confirmed',   color: '#2b6cb0', bg: '#ebf8ff' },
          in_delivery: { label: 'In Delivery', color: '#6b46c1', bg: '#faf5ff' },
          delivered:   { label: 'Delivered',   color: '#276749', bg: '#f0fff4' },
        };
        return (
          <div className="dashboard-home">
            <div className="section-header">
              <h2><FaShoppingBag style={{marginRight: 10}} />Orders Management</h2>
              <span className="total-count">{orders.length} Total</span>
            </div>

            <div style={{display:'flex', gap: 16, marginBottom: 30, flexWrap:'wrap'}}>
              {Object.entries(statusConfig).map(([key, cfg]) => (
                <div key={key} style={{background: cfg.bg, border: `1px solid ${cfg.color}30`, padding: '12px 20px', borderRadius: 14, flex: 1, minWidth: 140, textAlign: 'center'}}>
                  <div style={{fontSize: 22, fontWeight: 800, color: cfg.color}}>{orders.filter(o => o.status === key).length}</div>
                  <div style={{fontSize: 12, color: cfg.color, fontWeight: 600}}>{cfg.label}</div>
                </div>
              ))}
            </div>

            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((ord, idx) => {
                    const cfg = statusConfig[ord.status] || statusConfig.pending;
                    return (
                      <tr key={ord._id}>
                        <td style={{fontSize: 12, color: '#a0aec0'}}>#{String(idx + 1).padStart(4, '0')}</td>
                        <td>
                          <div style={{display:'flex', alignItems:'center', gap: 10}}>
                            <div style={{background:'#f3f0ff', color:'#6b46c1', width:36, height:36, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13}}>
                              {ord.user?.fullname?.substring(0,2).toUpperCase() || '??'}
                            </div>
                            <div>
                              <div style={{fontWeight:700, fontSize:14}}>{ord.user?.fullname || 'Unknown'}</div>
                              <div style={{fontSize:12, color:'#718096'}}>{ord.user?.email}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{fontSize:13}}>
                            {ord.items?.map((item, i) => (
                              <div key={i} style={{display:'flex', alignItems:'center', gap:6, marginBottom:3}}>
                                {item.image && <img src={item.image} alt="" style={{width:28, height:28, borderRadius:6, objectFit:'cover'}} />}
                                <span>{item.name}</span>
                                <span style={{color:'#a0aec0'}}>x{item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td><strong style={{color:'#6b46c1'}}>{ord.total?.toFixed(2)} TND</strong></td>
                        <td style={{fontSize:12, color:'#718096'}}>{new Date(ord.createdAt).toLocaleDateString()}</td>
                        <td>
                          <span style={{background: cfg.bg, color: cfg.color, padding:'4px 12px', borderRadius:20, fontSize:12, fontWeight:700}}>
                            {cfg.label}
                          </span>
                        </td>
                        <td>
                          <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
                            {ord.status === 'pending' && (
                              <button style={{background:'#ebf8ff', color:'#2b6cb0', border:'1px solid #bee3f8', borderRadius:8, padding:'5px 10px', cursor:'pointer', fontSize:12, fontWeight:700, display:'flex', alignItems:'center', gap:4}} onClick={() => handleConfirmOrder(ord._id)}>
                                <FaCheckCircle /> Confirm
                              </button>
                            )}
                            {ord.status === 'confirmed' && (
                              <button style={{background:'#faf5ff', color:'#6b46c1', border:'1px solid #e9d8fd', borderRadius:8, padding:'5px 10px', cursor:'pointer', fontSize:12, fontWeight:700, display:'flex', alignItems:'center', gap:4}} onClick={() => handleDeliverOrder(ord._id)}>
                                <FaTruck /> Ship
                              </button>
                            )}
                            {ord.status === 'in_delivery' && (
                              <button style={{background:'#f0fff4', color:'#276749', border:'1px solid #c6f6d5', borderRadius:8, padding:'5px 10px', cursor:'pointer', fontSize:12, fontWeight:700, display:'flex', alignItems:'center', gap:4}} onClick={() => handleMarkDelivered(ord._id)}>
                                <FaCheckCircle /> Delivered
                              </button>
                            )}
                            <button className="btn-action delete" onClick={() => handleDeleteOrder(ord._id)}><FaTrash /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {orders.length === 0 && (
                    <tr><td colSpan="7" style={{textAlign:'center', padding:40, color:'#a0aec0'}}>No orders placed yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      }

      default:
        return <div className="dashboard-home"><h2>Section coming soon...</h2></div>;
    }
  };

  return (
    <div className="admin-container">
      {successMsg && <div className="success-message">{successMsg}</div>}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h3>PulseHub <span>Admin Console</span></h3>
        </div>

        <nav className="sidebar-nav">
          <button className={`sidebar-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <FaHome /> <span>Overview</span>
          </button>
          <button className={`sidebar-link ${activeTab === 'salles' ? 'active' : ''}`} onClick={() => setActiveTab('salles')}>
            <FaBuilding /> <span>Gyms</span>
          </button>
          <button className={`sidebar-link ${activeTab === 'coaches' ? 'active' : ''}`} onClick={() => setActiveTab('coaches')}>
            <FaChalkboardTeacher /> <span>Coaches</span>
          </button>
          <button className={`sidebar-link ${activeTab === 'classes' ? 'active' : ''}`} onClick={() => setActiveTab('classes')}>
            <FaDumbbell /> <span>Classes</span>
          </button>
          <button className={`sidebar-link ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            <FaUsers /> <span>Users</span>
          </button>
          <button className={`sidebar-link ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>
            <FaBoxOpen /> <span>Products</span>
          </button>
          <button className={`sidebar-link ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            <FaCheckCircle /> <span>Orders</span>
          </button>
        </nav>

        <div className="sidebar-footer" style={{padding: 20}}>
          <button className="sidebar-link" onClick={handleLogout} style={{width: '100%', color: '#e53e3e'}}>
            <FaSignOutAlt /> <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="top-bar">
          <div className="search-wrapper">
            <FaSearch />
            <input type="text" placeholder="Search..." />
          </div>
          <div className="top-bar-right">
            <button className="notif-btn"><FaBell /></button>
            <div className="user-badge">{user?.fullname?.substring(0, 2).toUpperCase() || 'AD'}</div>
          </div>
        </header>

        <div className="content-area">
          {renderDashboard()}
        </div>
      </main>
    </div>
  );
};

export default Admin;;
