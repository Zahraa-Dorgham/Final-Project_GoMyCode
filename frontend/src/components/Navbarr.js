import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaFacebookF, FaInstagram, FaSearch, FaShoppingBag, FaUserCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';

function Navbarr() {
  const { user } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const cleanSearch = searchTerm.trim();

    navigate(cleanSearch ? `/classes?search=${encodeURIComponent(cleanSearch)}` : '/classes');
    setSearchTerm('');
  };

  return (
    <Navbar expand="lg" className={`navbar-custom fixed-top ${isHomePage ? 'navbar-home' : ''} ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <Container fluid className="navbar-inner px-lg-5">
    
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <img className="img-logo" src="https://fitness-club.bold-themes.com/main-demo/wp-content/uploads/sites/3/2016/08/logo.png" alt="FitConnect Logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" className="border-0 toggle-custom" />

        <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-auto my-2 my-lg-0 gap-3">
            <Nav.Link as={Link} to="/" className="nav-item-custom">Home</Nav.Link>
            <Nav.Link as={Link} to="/salles" className="nav-item-custom">Salles</Nav.Link>
            <Nav.Link as={Link} to="/classes" className="nav-item-custom">Classes</Nav.Link>
            <Nav.Link as={Link} to="/shop" className="nav-item-custom">Shop</Nav.Link>
            <Nav.Link as={Link} to="/coaches" className="nav-item-custom">Coaches</Nav.Link>


            {user ? (
              <NavDropdown
                title={<span className="nav-user-title"><FaUserCircle /> {user.fullname}</span>}
                id="user-dropdown"
                className="nav-item-custom"
              >
                <NavDropdown.Item as={Link} to="/profil">Profile</NavDropdown.Item>
                {user.role === 'admin' && (
                  <NavDropdown.Item as={Link} to="/admin">Admin Dashboard</NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => dispatch(logout())}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown title="Compte" id="login-dropdown" className="nav-item-custom">
                <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register">Register</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          <form className="navbar-search" onSubmit={handleSearch}>
            <FaSearch className="navbar-search-icon" />
            <input
              type="search"
              placeholder="Search classes..."
              aria-label="Search classes"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </form>

          <div className="navbar-icons-right">
            {/* <a href="https://instagram.com" target="_blank" rel="noreferrer" className="icon-link"><FaInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="icon-link"><FaFacebookF /></a> */}
            <Link to="/panier" className="cart-icon-container" aria-label="Shopping cart">
              <FaShoppingBag className="cart-icon" />
              {items.length > 0 && (
                <span className="cart-badge">{items.reduce((acc, item) => acc + item.quantity, 0)}</span>
              )}
            </Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarr;
