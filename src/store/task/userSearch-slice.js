import { createSlice } from "@reduxjs/toolkit";
export const SearchSlice = createSlice({
    name:"SearchSlice",
    initialState:{
        theSearch: '',
        theStatus:''
    },
    reducers:
    {
        settheSearch: (currentSlice, action) => {
            currentSlice.theSearch = action.payload;},
        settheStatus: (currentSlice, action) => {
            currentSlice.theStatus = action.payload;},
    },
    
    

});

export const SearchReducer = SearchSlice.reducer;
export const {settheSearch,settheStatus } = SearchSlice.actions;
