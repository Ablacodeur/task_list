import { createSlice } from "@reduxjs/toolkit";
export const taskSlice = createSlice({
    name:"taskSlice",
    initialState:{
        taskList:[],
        theTask: {}
    },
    reducers:{
        settaskList:(currentSlice,action)=>{
            currentSlice.taskList = action.payload;
        },
        setTheTask: (currentSlice, action) => {
            currentSlice.theTask = { ...currentSlice.theTask, ...action.payload };
        },
        addTask:(currentSlice,action)=>{
            currentSlice.taskList.push(action.payload);
        },
        updateTask: (currentSlice, action) => {
            const indexToUpdate = currentSlice.taskList.findIndex(
                (task) => task.id === action.payload.id
            );
            if (indexToUpdate !== -1) {
                currentSlice.taskList[indexToUpdate] = action.payload;
            }
        },
        deleteTask: (currentSlice, action) => {
            currentSlice.taskList = currentSlice.taskList.filter(
                (task) => task.id !== action.payload.id
            );
        },
        

    
    },

});

export const TaskReducer = taskSlice.reducer;
export const { settaskList, addTask, updateTask, deleteTask, setTheTask } = taskSlice.actions;
