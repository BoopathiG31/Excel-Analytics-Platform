import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import excelAPI from './excelAPI'

export const excelUpload = createAsyncThunk('excelrecord/upload-excel', excelAPI.uploadExcelFile);
export const fetchExcelFile = createAsyncThunk('excelrecord/record/:username', excelAPI.getExcelUploads);
export const recentExcelFile = createAsyncThunk('excelrecord/recent', excelAPI.getRecentExcel);


export const excelSlice = createSlice({
    name: 'excel',
    initialState: {
        files: [],
        loading: false,
        error: null,
    }, 
    reducers: {},
    extraReducers: (builder) => {
        builder
        //upload
            .addCase(excelUpload.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(excelUpload.fulfilled, (state, action) => {
                state.loading = false;
                state.files.push(action.payload);
            })
            .addCase(excelUpload.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Something went wrong';
            })
        //Fetch
            .addCase(fetchExcelFile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchExcelFile.fulfilled, (state, action) => {
                state.loading = false;
                state.files = action.payload;
            })
            .addCase(fetchExcelFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        //recent files
            .addCase(recentExcelFile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(recentExcelFile.fulfilled, (state, action) => {
                state.loading = false;
                state.files = action.payload;
            })
            .addCase(recentExcelFile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    } 
})

export default excelSlice.reducer;