import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./modules/todoSlice";

const store = configureStore({
  reducer: {
    todos: todoSlice,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export default store;
