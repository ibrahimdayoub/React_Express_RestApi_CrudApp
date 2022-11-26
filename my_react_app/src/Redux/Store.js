import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Features/Auth/authSlice'
import goalsReducer from './Features/Goals/goalsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalsReducer,
  },
})