import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbarr from './components/Navbarr';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Shop from './components/Shop';
import Salles from './components/Salles';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Profil from './components/Profil';
import Footer from './components/Footer';
import Classes from './components/Classes';
import Coach from './components/Coach';
import Panier from './components/Panier';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userCurrent } from './redux/userSlice';
import Admin from './components/Admin';

const ProtectedAdminRoute = ({ element }) => {
  const { user, status } = useSelector((state) => state.user);
  
  // Show loading if checking auth
  if (status === 'pending') {
    return <div className="loading-container">Loading...</div>;
  }
  
  // Check if user is admin
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (user.role !== 'admin') {
    return <Navigate to="/profil" replace />;
  }
  
  return element;
};

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(userCurrent());
    }
  }, []);

  return (
    <div className="App">
      {!isAdminPage && <Navbarr />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/salles" element={<Salles />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/coaches" element={<Coach />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/admin" element={<ProtectedAdminRoute element={<Admin />} />} />
      </Routes>
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;
