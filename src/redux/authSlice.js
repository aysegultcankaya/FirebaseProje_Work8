import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem("user")) || null,
        isAuth: localStorage.getItem('isAuth') || false
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.isAuth = false
            localStorage.removeItem("user")
            localStorage.removeItem("isAuth")
        },
        setLogin: (state, action) => {
            // const { auth } = action.payload
            state.isAuth = action.payload
            localStorage.setItem("isAuth", action.payload)
        },
        setUser: (state, action) => {
            state.user = action.payload || null
            localStorage.setItem("user", action.payload ? JSON.stringify(action.payload) : null)
        },
        // getToken: (state, { payload: { token } }) => {
        //     state.token = token
        // }
    }
})

export const { setLogin, logout, setUser } = authSlice.actions
export default authSlice.reducer
export const getCurrentUser = (state) => state.auth.user
export const isLogin = (state) => state.auth.isAuth