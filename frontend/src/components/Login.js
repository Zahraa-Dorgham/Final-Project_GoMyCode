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
  const { status, user } = useSelector(state => state.user);

  useEffect(() => {
    if (status === "successsss" && user) {
      navigate("/profil");
    }
  }, [status, user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!login.email || !login.password) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    
    console.log("Logging in with:", login);
    await dispatch(userlogin(login));
  };
  return (
    <div>
      <div className="wrapper">
        <form onSubmit={(e) => e.preventDefault()} className="form-signin">
          <h2 className="form-signin-heading">Please login</h2>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email Address"
            required
            onChange={(e) => setlogin({ ...login, email: e.target.value })}
          />
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setlogin({ ...login, password: e.target.value })}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="eye-icon">
                  <path fill="currentColor" d="M288 80c-56.8 0-108.4 21.8-147.9 60.3-39.4 38.5-66.6 91.2-78.1 147.7-3.3 15.7-3.3 31.7 0 47.4 11.5 56.5 38.7 109.2 78.1 147.7C179.6 542.2 231.2 564 288 564s108.4-21.8 147.9-60.3c39.4-38.5 66.6-91.2 78.1-147.7 3.3-15.7 3.3-31.7 0-47.4-11.5-56.5-38.7-109.2-78.1-147.7C396.4 101.8 344.8 80 288 80zm0 128c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="eye-icon">
                  <path fill="currentColor" d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-147.7 3.3-15.7 3.3-31.7 0-47.4C533.9 262.1 444.9 164.6 288 164.6c-44.6 0-86.7 10.3-124.8 28.9L38.8 5.1zM407 341.8l-40.7-31.1c4.5-13.8 6.9-28.3 6.9-43.2 0-53-43-96-96-96-15.7 0-30.6 3.7-43.5 10.2L407 341.8zm-234.6-78.3L126.6 159.1c-40 34.4-68.3 82.9-81.3 136.5-3.3 15.7-3.3 31.7 0 47.4 19.5 98.3 111.6 171.9 220.2 171.9 37 0 72.3-7.2 104.2-20.2l-50.3-38.5c-14.1 3.4-28.7 5.3-43.9 5.3-53 0-96-43-96-96 0-12.4 2.3-24.2 6.4-35.3z"/>
                </svg>
              )}
            </button>
          </div>

          <label className="checkbox">
            <input
              type="checkbox"
              value="remember-me"
              id="rememberMe"
              name="rememberMe"
            />
            Remember me
          </label>
          <button
            type="button"
            className="btn btn-lg btn-primary btn-block"
            onClick={handleLogin}
          >
            login
          </button>
          <h5 style={{ marginTop: "30px" }}>
            u already have account <Link to="/register">Register now</Link>{" "}
          </h5>
        </form>
      </div>
    </div>
  );
}

export default Login;
