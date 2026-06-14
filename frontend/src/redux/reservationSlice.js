import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addReservation = createAsyncThunk("reservation/add", async (newRes) => {
    try {
        let response = await axios.post("http://localhost:5000/reservation/add", newRes);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const getUserReservations = createAsyncThunk("reservation/getUser", async (userId) => {
    try {
        let response = await axios.get(`http://localhost:5000/reservation/user/${userId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const initialState = {
    userReservations: [],
    status: null,
};

export const reservationSlice = createSlice({
    name: "reservation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUserReservations.fulfilled, (state, action) => {
                state.status = "success";
                state.userReservations = action.payload.reservations;
            });
    },
});

export default reservationSlice.reducer;
