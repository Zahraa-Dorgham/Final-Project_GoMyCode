import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCoaches = createAsyncThunk("coach/get", async () => {
    try {
        let response = await axios.get("http://localhost:5000/coach/all");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const addCoach = createAsyncThunk("coach/add", async (newCoach) => {
    try {
        let response = await axios.post("http://localhost:5000/coach/add", newCoach);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const initialState = {
    coaches: [],
    status: null,
};

export const coachSlice = createSlice({
    name: "coach",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCoaches.pending, (state) => {
                state.status = "pending";
            })
            .addCase(getCoaches.fulfilled, (state, action) => {
                state.status = "success";
                state.coaches = action.payload.coaches;
            })
            .addCase(getCoaches.rejected, (state) => {
                state.status = "fail";
            })
            .addCase(addCoach.fulfilled, (state, action) => {
                state.coaches.push(action.payload.newCoach);
            });
    },
});

export default coachSlice.reducer;
