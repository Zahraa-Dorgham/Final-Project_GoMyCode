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
        <div>
            <h1>hello {user?.fullname}</h1>

            <button
                onClick={() => {
                    dispatch(logout());
                    navigate("/login");
                }}
            >
                logout
            </button>
        </div>
    );
}

export default Profil;