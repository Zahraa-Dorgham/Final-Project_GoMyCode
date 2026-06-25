import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import salleReducer from "./salleSlice";
import coachReducer from "./coachSlice";
import classeReducer from "./classeSlice";
import reservationReducer from "./reservationSlice";
import cartReducer from "./panierSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        salle: salleReducer,
        coach: coachReducer,
        classe: classeReducer,
        reservation: reservationReducer,
        cart: cartReducer
    }
});

export default store;