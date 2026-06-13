import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbarr from './components/Navbarr';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Shop from './components/Shop';
import Salles from './components/Salles';
import { Route, Routes } from 'react-router-dom';
import Profil from './components/Profil';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbarr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/salles" element={<Salles />} />
      </Routes>
      <Footer />
    
      
    </div>
  );
}

export default App;
