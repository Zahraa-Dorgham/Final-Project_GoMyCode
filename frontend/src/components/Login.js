import React, { useEffect, useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userlogin, clearError } from "../redux/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, user, error } = useSelector((state) => state.user);
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const handleLogin = (e) => {
    e.preventDefault();

    if (!login.email || !login.password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    dispatch(userlogin(login));
  };

  return (
    <main className="auth-page-container">
      <section className="auth-shell auth-shell-login">
        <div className="auth-visual-panel">
          <span className="auth-kicker">Fit Club Access</span>
          <h1>Welcome back</h1>
          <p>Sign in to access your account and continue your fitness journey.</p>
        </div>

        <div className="auth-form-panel">
          <div className="auth-form-header">
            <span>Member Login</span>
            <h2>Login</h2>
            <p>Enter your information to access your account.</p>
          </div>

          {error && (
            <div style={{ background: '#fff5f5', color: '#e53e3e', padding: '12px', borderRadius: '10px', marginBottom: '20px', fontSize: '14px', textAlign: 'center', border: '1px solid #fed7d7' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="auth-form-box">
            <div className="form-group-custom">
              <label htmlFor="email">
                Email address <span className="required-star">*</span>
              </label>
              <div className="auth-input-wrapper">
                <FaEnvelope className="auth-input-icon" />
                <input
                  id="email"
                  type="email"
                  className="input-field-custom"
                  name="email"
                  placeholder="you@example.com"
                  required
                  value={login.email}
                  onChange={(e) => setlogin({ ...login, email: e.target.value })}
                />
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
                  name="password"
                  placeholder="Your password"
                  required
                  value={login.password}
                  onChange={(e) => setlogin({ ...login, password: e.target.value })}
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

            <div className="login-actions-row">
              <label className="remember-me-checkbox">
                <input type="checkbox" id="rememberMe" name="rememberMe" />
                <span>Remember me</span>
              </label>
            </div>

            <button type="submit" className="submit-login-btn">
              Login
            </button>

            <p className="register-redirect">
              Don't have an account? <Link to="/register">Register now</Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
