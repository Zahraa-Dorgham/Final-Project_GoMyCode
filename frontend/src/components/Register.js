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
    age: "",
    weight: "",
    gender: ""
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
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }
    await dispatch(userRegister(register));
  };

  return (
    <div className="login-page-container">
      <div className="login-card-wrapper">
        <div className="login-post-header">
          <div className="post-header-content">
            <h2 className="header-main-title">START YOUR <br /> FITNESS JOURNEY</h2>
            <p className="header-sub-text">Join our community of fitness enthusiasts and begin your transformation today. Get access to expert guidance, personalized training plans, and achieve your fitness goals.</p>
          </div>
        </div>
        <h1 className="login-main-title">Register</h1>

        <form onSubmit={handleRegister} className="login-form-box">
        
          <div className="form-group-custom">
            <label htmlFor="fullname">
              Nom complet <span className="required-star">*</span>
            </label>
            <input
              id="fullname"
              type="text"
              className="input-field-custom"
              required
              onChange={(e) => setregister({ ...register, fullname: e.target.value })}
            />
          </div>

          <div className="form-group-custom">
            <label htmlFor="email">
              Adresse Email <span className="required-star">*</span>
            </label>
            <input
              id="email"
              type="email"
              className="input-field-custom"
              required
              onChange={(e) => setregister({ ...register, email: e.target.value })}
            />
          </div>

          <div className="form-group-custom">
            <label htmlFor="phone">
              Numéro de téléphone <span className="required-star">*</span>
            </label>
            <input
              id="phone"
              type="text"
              className="input-field-custom"
              required
              onChange={(e) => setregister({ ...register, phone: e.target.value })}
            />
          </div>

          <div className="form-group-custom">
            <label htmlFor="age">
              Âge
            </label>
            <input
              id="age"
              type="number"
              className="input-field-custom"
              onChange={(e) => setregister({ ...register, age: e.target.value })}
            />
          </div>

          <div className="form-group-custom">
            <label htmlFor="weight">
              Poids (kg)
            </label>
            <input
              id="weight"
              type="number"
              className="input-field-custom"
              onChange={(e) => setregister({ ...register, weight: e.target.value })}
            />
          </div>

          <div className="form-group-custom">
            <label htmlFor="gender">
              Genre
            </label>
            <select 
              id="gender"
              className="input-field-custom"
              onChange={(e) => setregister({ ...register, gender: e.target.value })}
              value={register.gender}
            >
              <option value="">Sélectionner le genre</option>
              <option value="male">Homme</option>
              <option value="female">Femme</option>
            </select>
          </div>

          <div className="form-group-custom">
            <label htmlFor="password" className="password-label">
              Mot de passe <span className="required-star">*</span>
            </label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="input-field-custom"
                required
                onChange={(e) => setregister({ ...register, password: e.target.value })}
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
             
              >
              </button>
            </div>
          </div>

          <button type="submit" className="submit-login-btn">
            S'inscrire
          </button>

          <div className="login-footer-links">
            <p className="register-redirect">
              Aleardy have an account ? <Link to="/login">Login </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
