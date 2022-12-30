import { createSlice } from '@reduxjs/toolkit'

export const selectionsSlice = createSlice({

    name: 'selections',

    initialState: {
        selectedCity1: "",
        selectedCity2: "",
        selectedAirport1: "",
        selectedAirport2: ""
    },
    reducers: {
        setSelectedCity1: (state, action) => {
            state.selectedCity1 = action.payload;
        },
        setSelectedCity2: (state, action) => {
            state.selectedCity2 = action.payload;
        },
        setSelectedAirport1: (state, action) => {
            state.selectedAirport1 = action.payload;
        },
        setSelectedAirport2: (state, action) => {
            state.selectedAirport2 = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const { setSelectedCity1, setSelectedCity2, setSelectedAirport1, setSelectedAirport2 } = selectionsSlice.actions

export default selectionsSlice.reducer
