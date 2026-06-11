import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/userSlice/userSlice";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const [register, setregister] = useState({
    fullname: "",
    email: "",
    password: "",
  });
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
    
    // Validation
    if (!register.fullname || !register.email || !register.password) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    
    console.log("Submitting register data:", register);
    await dispatch(userRegister(register));
  };
  return (
    <div>
      <div className="wrapper">
        <form onSubmit={(e) => e.preventDefault()} className="form-signin">
          <h2 className="form-signin-heading">Please Register</h2>
          <input
            type="text"
            className="form-control"
            name="fullname"
            placeholder="Full Name"
            required
            onChange={(e) => setregister({ ...register, fullname: e.target.value })}
          />
          
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Email Address"
            required
            onChange={(e) =>
              setregister({ ...register, email: e.target.value })
            }
          />
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            required
            onChange={(e) =>
              setregister({ ...register, password: e.target.value })
            }
          />

          <button
            type="button"
            className="btn btn-lg btn-primary btn-block"
            onClick={handleRegister}
          >
            Register
          </button>

          <h5 style={{ marginTop: "30px" }}>
            u already have account <Link to="/login">sign in </Link>{" "}
          </h5>
        </form>
      </div>
    </div>
  );
}

export default Register;
