import { configureStore } from "@reduxjs/toolkit";
import { TaskReducer } from "./task/task-slice";
import { SearchReducer, SearchSlice } from "./task/userSearch-slice";

export const store = configureStore({
  reducer: {
    TASK: TaskReducer,
    SEARCH: SearchReducer
  },
});
