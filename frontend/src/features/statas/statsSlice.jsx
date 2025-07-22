import { createSlice } from "@reduxjs/toolkit";


export const  statsSlice = createSlice({
    name: "cardstats",
    initialState: {
        stats: [
            {title: "users", value: 232, growth: "12%"},
            {title: "users", value: 232, growth: "12%"},
            {title: "users", value: 232, growth: "12%"},
        ]
    },
    reducers: {}
})

export default statsSlice.reducer;