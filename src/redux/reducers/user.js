import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        username: null,
        token: null,
    },
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload.username;
        },
        setToken: (state, action) => {
            state.token = action.payload.token;
        },
    }
});

export const {setUsername, setToken, getUsername, getToken} = userSlice.actions;
export default userSlice.reducer;