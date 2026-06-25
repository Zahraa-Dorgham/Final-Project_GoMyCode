import React, { useEffect, useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaPhoneAlt, FaRulerVertical, FaUser, FaVenusMars, FaWeight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister, clearError } from "../redux/userSlice";

function Register() {
  const [register, setregister] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    weight: "",
    gender: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, user, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "successsss" && user) {
      if (user.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/profil");
      }
    }
  }, [status, user, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!register.fullname || !register.email || !register.password || !register.phone) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    dispatch(userRegister(register));
  };

  return (
    <main className="auth-page-container">
      <section className="auth-shell auth-shell-register">
        <div className="auth-visual-panel">
          <span className="auth-kicker">Join Fit Club</span>
          <h1>Start strong</h1>
          <p>Create your account to book classes, track your goals, and build a healthier lifestyle.</p>
        </div>

        <div className="auth-form-panel">
          <div className="auth-form-header">
            <span>New Member</span>
            <h2>Register</h2>
            <p>Complete your profile to join the community.</p>
          </div>

          {error && (
            <div style={{ background: '#fff5f5', color: '#e53e3e', padding: '12px', borderRadius: '10px', marginBottom: '20px', fontSize: '14px', textAlign: 'center', border: '1px solid #fed7d7' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="auth-form-box">
            <div className="auth-form-grid">
              <div className="form-group-custom">
                <label htmlFor="fullname">
                  Full Name <span className="required-star">*</span>
                </label>
                <div className="auth-input-wrapper">
                  <FaUser className="auth-input-icon" />
                  <input
                    id="fullname"
                    type="text"
                    className="input-field-custom"
                    placeholder="Your full name"
                    required
                    value={register.fullname}
                    onChange={(e) => setregister({ ...register, fullname: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-custom">
                <label htmlFor="email">
                  Email Address <span className="required-star">*</span>
                </label>
                <div className="auth-input-wrapper">
                  <FaEnvelope className="auth-input-icon" />
                  <input
                    id="email"
                    type="email"
                    className="input-field-custom"
                    placeholder="you@example.com"
                    required
                    value={register.email}
                    onChange={(e) => setregister({ ...register, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-custom">
                <label htmlFor="phone">
                  Phone Number <span className="required-star">*</span>
                </label>
                <div className="auth-input-wrapper">
                  <FaPhoneAlt className="auth-input-icon" />
                  <input
                    id="phone"
                    type="text"
                    className="input-field-custom"
                    placeholder="+216 ..."
                    required
                    value={register.phone}
                    onChange={(e) => setregister({ ...register, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-custom">
                <label htmlFor="age">Age</label>
                <div className="auth-input-wrapper">
                  <FaRulerVertical className="auth-input-icon" />
                  <input
                    id="age"
                    type="number"
                    min="1"
                    className="input-field-custom"
                    placeholder="Your age"
                    value={register.age}
                    onChange={(e) => setregister({ ...register, age: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-custom">
                <label htmlFor="weight">Weight (kg)</label>
                <div className="auth-input-wrapper">
                  <FaWeight className="auth-input-icon" />
                  <input
                    id="weight"
                    type="number"
                    min="1"
                    className="input-field-custom"
                    placeholder="Your weight"
                    value={register.weight}
                    onChange={(e) => setregister({ ...register, weight: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-custom">
                <label htmlFor="gender">Gender</label>
                <div className="auth-input-wrapper">
                  <FaVenusMars className="auth-input-icon" />
                  <select
                    id="gender"
                    className="input-field-custom"
                    onChange={(e) => setregister({ ...register, gender: e.target.value })}
                    value={register.gender}
                  >
                    <option value="">Choose gender</option>
                    <option value="male">Men</option>
                    <option value="female">Women</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group-custom">
              <label htmlFor="password">
                Password <span className="required-star">*</span>
              </label>
              <div className="auth-input-wrapper password-input-wrapper">
                <FaLock className="auth-input-icon" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="input-field-custom"
                  placeholder="Create a secure password"
                  required
                  value={register.password}
                  onChange={(e) => setregister({ ...register, password: e.target.value })}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-login-btn">
              Register
            </button>

            <p className="register-redirect">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Register;
