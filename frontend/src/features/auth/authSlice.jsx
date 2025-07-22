import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authAPI from './authAPI'


export const loginUser = createAsyncThunk('auth/login', authAPI.login);
export const registerUser = createAsyncThunk('auth/signup', authAPI.register);
export const getMeUser = createAsyncThunk('auth/me', authAPI.getMe);
export const logoutUser = createAsyncThunk('auth/logout', authAPI.logout);


const initialState = {
     user: JSON.parse(localStorage.getItem('user')) || null,
     token: localStorage.getItem("token") || null,
     isAuthenticated: !!localStorage.getItem("token"),
     loading: false,
     error: null,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
        extraReducers: (builder) => {
            builder
                //Login
                .addCase(loginUser.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(loginUser.fulfilled, (state, action) => {
                    const {user, token} = action.payload;

                    console.log("login payload:", action.payload);

                    state.user = user;
                    state.token = token;
                    state.isAuthenticated = true;
                    state.loading = false;
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('token', token);
                })

                .addCase(loginUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                    state.isAuthenticated = false;
                })

                //Register
                .addCase(registerUser.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(registerUser.fulfilled, (state, action) => {
                    const {user, token} = action.payload;

                    console.log("register fulfilled:", action.payload);

                    state.user = user;
                    state.token = token;
                    state.isAuthenticated = true;
                    state.loading = false;
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('token', token);
                })
                .addCase(registerUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.error.message;
                    state.isAuthenticated = false;
                })

                //GetMe
                .addCase(getMeUser.fulfilled, (state, action) => {
                    console.log("getMe payload:", action.payload);

                    state.user = action.payload;
                    state.isAuthenticated = true;
                })
                .addCase(getMeUser.rejected, (state)=>{
                    state.user = null;
                    state.token = null;
                    state.isAuthenticated = false;
                })

                //Logout
                .addCase(logoutUser.fulfilled,(state) => {
                    state.user = null;
                    state.token = null;
                    state.isAuthenticated = false;
                    localStorage.removeItem('user');
                    localStorage.removeItem('token')
                });
        },
})

export const {logout} = authSlice.actions;
export default authSlice.reducer;