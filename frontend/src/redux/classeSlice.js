import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getClasses = createAsyncThunk("classe/get", async () => {
    try {
        let response = await axios.get("http://localhost:5000/classe/all");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

export const addClasse = createAsyncThunk("classe/add", async (newClasse) => {
    try {
        let response = await axios.post("http://localhost:5000/classe/add", newClasse);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const initialState = {
    classes: [],
    status: null,
};

export const classeSlice = createSlice({
    name: "classe",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getClasses.fulfilled, (state, action) => {
                state.status = "success";
                state.classes = action.payload.classes;
            })
            .addCase(addClasse.fulfilled, (state, action) => {
                state.classes.push(action.payload.newClasse);
            });
    },
});

export default classeSlice.reducer;
