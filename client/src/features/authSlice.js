//Imports createSlice from Redux toolkit
import { createSlice } from '@reduxjs/toolkit'

//Creates authSlice with credntial, loginError, and registerError state along with its reducers
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    credentials: {
      username: '',
      password: '',
      reEnterPassword: ''
    },
    loginError: '',
    registerError: ''
  },
  reducers: {
    updateCredentials(state, action) {
      state.credentials.username = action.payload.username;
      state.credentials.password = action.payload.password;
      state.credentials.reEnterPassword = action.payload.reEnterPassword;
    },
    setLoginError(state, action) {
      state.loginError = action.payload;
    },
    setRegisterError(state, action) {
      state.registerError = action.payload;
    }
  }
})

//Exports state, actions, and reducer
export const selectCredentials = (state) => state.auth.credentials;

export const selectLoginError = (state) => state.auth.loginError;

export const selectRegisterError = (state) => state.auth.registerError;

export const { updateCredentials, setLoginError, setRegisterError } = authSlice.actions

export default authSlice.reducer