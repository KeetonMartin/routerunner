import { createSlice } from '@reduxjs/toolkit'

export const insightsSlice = createSlice({
    name: 'insights',
    initialState: {
        airportMode: false,
        cityMode: false,
        randomString: "test string"
    },
    reducers: {
        enableAirportMode: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.airportMode = true
            state.cityMode = false
            state.randomString = "Airport Mode On"
        },
        enableCityMode: (state) => {
            state.airportMode = false
            state.cityMode = true
            state.randomString = "City Mode On"
        }
    },
})

// Action creators are generated for each case reducer function
export const { enableAirportMode, enableCityMode } = insightsSlice.actions

export default insightsSlice.reducer
