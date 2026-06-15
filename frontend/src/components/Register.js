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

  const handleRegister = (e) => {
    e.preventDefault();
    if (!register.fullname || !register.email || !register.password || !register.phone) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }
    dispatch(userRegister(register));
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
            <label htmlFor="fullname" className="name">
              Full Name <span className="required-star">*</span>
            </label>
            <input
              id="fullname"
              type="text"
              className="input-field-custom"
              required
              value={register.fullname}
              onChange={(e) => setregister({ ...register, fullname: e.target.value })}
            />
          </div>

          <div className="form-group-custom">
            <label htmlFor="email" className="email">
              Email Adress <span className="required-star">*</span>
            </label>
            <input
              id="email"
              type="email"
              className="input-field-custom"
              required
              value={register.email}
              onChange={(e) => setregister({ ...register, email: e.target.value })}
            />
          </div>

          <div className="form-group-custom">
            <label htmlFor="phone" className="phone">
              Phone Number <span className="required-star">*</span>
            </label>
            <input
              id="phone"
              type="text"
              className="input-field-custom"
              required
              value={register.phone}
              onChange={(e) => setregister({ ...register, phone: e.target.value })}
            />
          </div>

          <div className="form-group-custom">
            <label htmlFor="age" className="age">Age</label>
            <input
              id="age"
              type="number"
              className="input-field-custom"
              value={register.age}
              onChange={(e) => setregister({ ...register, age: e.target.value })}
            />
          </div>

          <div className="form-group-custom">
            <label htmlFor="weight" className="weight">Weight (kg)</label>
            <input
              id="weight"
              type="number"
              className="input-field-custom"
              value={register.weight}
              onChange={(e) => setregister({ ...register, weight: e.target.value })}
            />
          </div>

          <div className="form-group-custom">
            <label htmlFor="gender" className="gender"s>Gender</label>
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

          <div className="form-group-custom">
            <label htmlFor="password" className="password-label">
              Password <span className="required-star">*</span>
            </label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="input-field-custom"
                required
                value={register.password}
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
            Register
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
