import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaInstagram, FaFacebookF, FaShoppingBag } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';

function Navbarr() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Navbar expand="lg" className="navbar-custom fixed-top">
      <Container fluid className="px-lg-5">
    
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

            {user ? (
               <NavDropdown title={user.fullname} id="user-dropdown" className="nav-item-custom">
               <NavDropdown.Item as={Link} to="/profil">Profil</NavDropdown.Item>
               <NavDropdown.Divider />
               <NavDropdown.Item onClick={() => dispatch(logout())}>Déconnexion</NavDropdown.Item>
             </NavDropdown>
            ) : (
              <NavDropdown title="Compte" id="login-dropdown" className="nav-item-custom">
                <NavDropdown.Item as={Link} to="/login">Connexion</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/register">Inscription</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          <div className="navbar-icons-right d-flex align-items-center gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="icon-link"><FaInstagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="icon-link"><FaFacebookF /></a>
            <div className="cart-icon-container">
              <FaShoppingBag className="icon-link cart-icon" />
              <span className="cart-badge">0</span>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbarr;