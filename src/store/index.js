import { configureStore } from "@reduxjs/toolkit";
import { TaskReducer } from "./task/task-slice";
import { SearchReducer, SearchSlice } from "./task/userSearch-slice";
import { TitleReducer } from "./task/title_slice";

export const store = configureStore({
  reducer: {
    TASK: TaskReducer,
    SEARCH: SearchReducer,
    TITLE: TitleReducer,
  },
});
