import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/userSlice";
import salleReducer from "./salleSlice";
import coachReducer from "./coachSlice";
import classeReducer from "./classeSlice";
import reservationReducer from "./reservationSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        salle: salleReducer,
        coach: coachReducer,
        classe: classeReducer,
        reservation: reservationReducer
    }
});

export default store;