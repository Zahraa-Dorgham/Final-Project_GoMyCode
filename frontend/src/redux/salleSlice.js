import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSalles = createAsyncThunk("salle/get", async () => {
    try {
        let response = await axios.get("http://localhost:5000/salle/all");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const addSalle = createAsyncThunk("salle/add", async (newSalle) => {
    try {
        let response = await axios.post("http://localhost:5000/salle/add", newSalle);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const deleteSalle = createAsyncThunk("salle/delete", async (id) => {
    try {
        let response = await axios.delete(`http://localhost:5000/salle/${id}`);
        return id;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const updateSalle = createAsyncThunk("salle/update", async ({ id, updatedSalle }) => {
    try {
        let response = await axios.put(`http://localhost:5000/salle/${id}`, updatedSalle);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const initialState = {
    salles: [],
    status: null,
};

export const salleSlice = createSlice({
    name: "salle",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSalles.pending, (state) => {
                state.status = "pending";
            })
            .addCase(getSalles.fulfilled, (state, action) => {
                state.status = "success";
                state.salles = action.payload.salles;
            })
            .addCase(getSalles.rejected, (state) => {
                state.status = "fail";
            })
            .addCase(addSalle.fulfilled, (state, action) => {
                state.salles.push(action.payload.newSalle);
            })
            .addCase(deleteSalle.fulfilled, (state, action) => {
                state.salles = state.salles.filter((el) => el._id !== action.payload);
            })
            .addCase(updateSalle.fulfilled, (state, action) => {
                state.salles = state.salles.map((el) =>
                    el._id === action.payload.updatedSalle._id ? action.payload.updatedSalle : el
                );
            });
    },
});

export default salleSlice.reducer;
