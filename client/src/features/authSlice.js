import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState:{
    credentials: {
        username: '',
        password: '',
        reEnterPassword: ''
    }
  },
  reducers: {
    updateCredentials(state, action) {
      state.credentials.username = action.payload.username;
      state.credentials.password = action.payload.password;
      state.credentials.reEnterPassword = action.payload.reEnterPassword;
    }
  }
})

export const selectCredentials = (state) => state.auth.credentials;

export const { updateCredentials } = authSlice.actions

export default authSlice.reducer