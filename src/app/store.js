import { configureStore } from '@reduxjs/toolkit'
import insightsReducer from '../features/insightsSlice'

export default configureStore({
  reducer: {
    insights: insightsReducer,
  },
})