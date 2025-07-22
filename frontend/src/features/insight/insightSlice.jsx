import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import insightAPI from "./insightAPI";

export const fetchAIInsight = createAsyncThunk('excel/ai-insight', insightAPI.getAIInsight);

export const insightSlice = createSlice({
    name: 'aiInsight',
    initialState: {
        insight: "",
        loading: false,
        error: null,
    },
    reducers: {
        clearInsight: (state) => {
            state.insight = '';
            state.error = null;
        },
    },
    extraReducers: ( builder ) => {
        builder
            .addCase(fetchAIInsight.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.insight = '';
            })
            .addCase(fetchAIInsight.fulfilled, (state, action) => {
                state.loading = false;
                state.insight = action.payload;
            })
            .addCase(fetchAIInsight.rejected, (state,action) => {
                state.loading = false;
                state.error = action.payload;
            });
        },
}) 

export default insightSlice.reducer;