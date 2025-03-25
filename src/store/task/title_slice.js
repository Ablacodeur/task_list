import { createSlice } from "@reduxjs/toolkit";
export const TitleSlice = createSlice({
    name:"TitleSlice",
    initialState:{
        theTitle: {
            title:'My task board',
            description:'Task to keep you organised'
        },
    },
    reducers:
    {
        settitle: (currentSlice, action) => {
            currentSlice.theTitle = { ...currentSlice.theTitle, ...action.payload };
    },
}
    

});

export const TitleReducer = TitleSlice.reducer;
export const {settitle } = TitleSlice.actions;
