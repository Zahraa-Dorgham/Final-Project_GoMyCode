import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbarr from './components/Navbarr';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import Profil from './components/Profil';

function App() {
  return (
    <div className="App">
      <Navbarr />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profil" element={<Profil />} />





      </Routes>
      
    </div>
  );
}

export default App;
