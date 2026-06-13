import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice/userSlice";

function Profil() {
    const user = useSelector((state) => state.user);
    console.log("User state:", user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1>Hello {user?.fullname}</h1>
                <p>Welcome to your profile</p>
                <button
                    onClick={() => {
                        dispatch(logout());
                        navigate("/login");
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Profil;