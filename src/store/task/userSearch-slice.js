import { createSlice } from "@reduxjs/toolkit";
export const SearchSlice = createSlice({
    name:"SearchSlice",
    initialState:{
        theSearch: ''
    },
    reducers:{
        settheSearch: (currentSlice, action) => {
            currentSlice.theSearch = action.payload;        },
    },

});

export const SearchReducer = SearchSlice.reducer;
export const {settheSearch } = SearchSlice.actions;
