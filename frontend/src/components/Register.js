import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const [register, setregister] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    role: "user"
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, user } = useSelector(state => state.user);

  useEffect(() => {
    if (status === "successsss" && user) {
      navigate("/profil");
    }
  }, [status, user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!register.fullname || !register.email || !register.password || !register.phone) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    await dispatch(userRegister(register));
  };

  return (
    <div className="register-page">
      <div className="wrapper">
        <form onSubmit={handleRegister} className="form-signin">
          <h2 className="form-signin-heading">Créer un compte</h2>
          
          <input
            type="text"
            className="form-control"
            placeholder="Nom complet"
            required
            onChange={(e) => setregister({ ...register, fullname: e.target.value })}
          />
          
          <input
            type="email"
            className="form-control"
            placeholder="Adresse Email"
            required
            onChange={(e) => setregister({ ...register, email: e.target.value })}
          />

          <input
            type="text"
            className="form-control"
            placeholder="Numéro de téléphone"
            required
            onChange={(e) => setregister({ ...register, phone: e.target.value })}
          />

          <select 
            className="form-control"
            onChange={(e) => setregister({ ...register, role: e.target.value })}
            value={register.role}
          >
            <option value="user">Utilisateur (Client)</option>
            <option value="coach">Coach</option>
            <option value="admin">Administrateur</option>
          </select>
          
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Mot de passe"
              required
              onChange={(e) => setregister({ ...register, password: e.target.value })}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>
         
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
          >
            S'inscrire
          </button>

          <h5>
            Déjà inscrit ? <Link to="/login">Se connecter</Link>
          </h5>
        </form>
      </div>
    </div>
  );
}

export default Register;
