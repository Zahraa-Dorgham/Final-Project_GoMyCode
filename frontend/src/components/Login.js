import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userlogin } from "../redux/userSlice";

function Login() {
  const navigate = useNavigate();
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { status, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (status === "successsss" && user) {
      navigate("/profil");
    }
  }, [status, user, navigate]);

  const handleLogin = (e) => {
    e.preventDefault(); // Gère la soumission proprement ici

    if (!login.email || !login.password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    console.log("Logging in with:", login);
    dispatch(userlogin(login));
  };

  return (
    <div className="login-page-container">
      <div className="login-card-wrapper">
        <div className="login-post-header">
          <div className="post-header-content">
            <h2 className="header-main-title">CHOOSE YOUR <br /> RIGHT CLASS</h2>
            <p className="header-sub-text">Join expert-led fitness classes tailored to your needs and experience level. Train smarter, stay motivated, and achieve your goals faster.</p>
          </div>
        </div>
        <h1 className="login-main-title">Login</h1>

        <form onSubmit={handleLogin} className="login-form-box">
        
          <div className="form-group-custom">
            <label htmlFor="email">
              Username or email address <span className="required-star">*</span>
            </label>
            <input
              id="email"
              type="email"
              className="input-field-custom"
              name="email"
              required
              onChange={(e) => setlogin({ ...login, email: e.target.value })}
            />
          </div>

          <div className="form-group-custom ">
            <label htmlFor="password" className="password-label">
              Password <span className="required-star">*</span>
            </label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="input-field-custom"
                name="password"
                required
                onChange={(e) => setlogin({ ...login, password: e.target.value })}
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="eye-icon-svg">
                    <path fill="currentColor" d="M288 32c-144.8 0-267.8 82.8-327.4 204c-7.5 15.3-7.5 33.3 0 48.6C20.2 406.8 143.2 489.6 288 489.6s267.8-82.8 327.4-204c7.5-15.3 7.5-33.3 0-48.6C555.8 114.8 432.8 32 288 32zm0 336c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="eye-icon-svg">
                    <path fill="currentColor" d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-147.7 3.3-15.7 3.3-31.7 0-47.4-11.5-56.5-38.7-109.2-78.1-147.7C396.4 101.8 344.8 80 288 80c-44.6 0-86.7 10.3-124.8 28.9L38.8 5.1zM407 341.8l-40.7-31.1c4.5-13.8 6.9-28.3 6.9-43.2 0-53-43-96-96-96-15.7 0-30.6 3.7-43.5 10.2L407 341.8zm-234.6-78.3L126.6 159.1c-40 34.4-68.3 82.9-81.3 136.5-3.3 15.7-3.3 31.7 0 47.4 19.5 98.3 111.6 171.9 220.2 171.9 37 0 72.3-7.2 104.2-20.2l-50.3-38.5c-14.1 3.4-28.7 5.3-43.9 5.3-53 0-96-43-96-96 0-12.4 2.3-24.2 6.4-35.3z" />
                  </svg>
                )} */}
              </button>
            </div>
          </div>

          <div className="login-actions-row">
            <button type="submit" className="submit-login-btn">
              Log in
            </button>

            <label className="remember-me-checkbox">
              <input type="checkbox" id="rememberMe" name="rememberMe" />
              <span>Remember me</span>
            </label>
          </div>

          <div className="login-footer-links">
            
            <p className="register-redirect">
              Don't have an account? <Link to="/register">Register now</Link>
            </p>
          </div>
        </form>
      </div>

      
    </div>
  );
}

export default Login;