import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegister = createAsyncThunk("auth/register", async (user) => {
    try {
        console.log("Sending register data:", user);
        let response = await axios.post(
            "http://localhost:5000/auth/register",
            user
        );
        console.log("Register response:", response);
        return response.data;
    } catch (error) {
        console.log("Register error:", error);
        throw error;
    }
});
export const userlogin = createAsyncThunk("auth/login", async (user) => {
    try {
        let response = await axios.post("http://localhost:5000/auth/login", user);
        return await response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});
export const userCurrent = createAsyncThunk("auth/current", async () => {
    try {
        let response = await axios.get("http://localhost:5000/auth/current", {
            headers:{
                Authorization: localStorage.getItem("token"),
            },
        });
        return await response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});
const initialState = {
    user: null,
    status: null,
    error: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state, action) => {
            state.user = null;
            state.status = null;
            state.error = null;
            localStorage.removeItem("token");
        },
        clearError: (state) => {
            state.error = null;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(userRegister.pending, (state) => {
                state.status = "pending";
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.status = "successsss";
                state.user = action.payload.user;
                localStorage.setItem("token", action.payload.token);
                console.log("Register successful, user:", action.payload.user);
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.status = "fail";
                state.error = action.error.message;
            })
            .addCase(userlogin.pending, (state) => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(userlogin.fulfilled, (state, action) => {
                state.status = "successsss";
                state.user = action.payload.user;
                localStorage.setItem("token", action.payload.token);
                state.error = null;
            })
            .addCase(userlogin.rejected, (state, action) => {
                state.status = "fail";
                state.error = "Identifiants incorrects ou problème de connexion";
            })
            .addCase(userCurrent.pending, (state) => {
                state.status = "pending";
            })
            .addCase(userCurrent.fulfilled, (state, action) => {
                state.status = "successsss";
                state.user = action.payload?.user;
                console.log("Current user loaded:", action.payload?.user);
            })
            .addCase(userCurrent.rejected, (state) => {
                state.status = "fail";
            })
    },
});

// Action creators are generated for each case reducer function
export const { logout, clearError } = userSlice.actions;

export default userSlice.reducer;
