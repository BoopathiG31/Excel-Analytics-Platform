import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import historyAPI from "./historyAPI";


export const saveHistory = createAsyncThunk('history/history-chart', historyAPI.saveChartAPI);
export const fetchChartHistory = createAsyncThunk('history/chart-history', historyAPI.fetchChartHistoryAPI);
export const deleteHistory = createAsyncThunk('history/delete-history',
    async ({ id, token }, thunkAPI ) => {
        try {
            return await
            deleteChartAPI(id, token)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message)
        }
    });

const historySlice = createSlice({
    
    name: 'history',
    initialState: {
        history: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchChartHistory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchChartHistory.fulfilled, (state, action) => {
                state.loading = false;
                state.history = action.payload;
            })
            .addCase(fetchChartHistory.rejected, (state) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(deleteHistory.fulfilled, (state, action) => {
                state.history = state.history.filter(chart => chart._id !== action.payload);
            })
            
            .addCase( saveHistory.fulfilled, (state, action) => {
                state.history.unshift({
                    ...action.meta.arg,
                    _id: action.payload.id,
                    createdAt: new Date().toISOString(),
                })
            })
    }
})

export default historySlice.reducer;