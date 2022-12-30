import { configureStore } from '@reduxjs/toolkit'
import insightsReducer from '../features/insightsSlice'
import selectionsReducer from '../features/selectionsSlice'

export default configureStore({
  reducer: {
    insights: insightsReducer,
    selections: selectionsReducer,
  },
})