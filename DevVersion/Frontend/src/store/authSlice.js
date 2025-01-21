import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authed: false,
  userData: {}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAuth: (state, action) => {
        state.authed = action.payload
    },
    setUserData: (state, action) => {
        state.userData = action.payload
    }
  },
})

export const { changeAuth, setUserData } = authSlice.actions

export default authSlice.reducer