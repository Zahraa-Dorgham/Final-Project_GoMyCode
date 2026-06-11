import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userlogin } from "../redux/userSlice/userSlice";

function Login() {
  const navigate = useNavigate();
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });
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
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            required
            onChange={(e) => setlogin({ ...login, password: e.target.value })}
          />

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
