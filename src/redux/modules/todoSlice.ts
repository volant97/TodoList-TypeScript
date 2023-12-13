import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Todo } from "../../types/todoType";

const initialState: Todo[] = [
  {
    id: "1",
    title: "title1",
    content: "content1",
    isDone: false,
  },
  {
    id: "2",
    title: "title2",
    content: "content2",
    isDone: true,
  },
];

const todoSlcie = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      const newTodo = action.payload;
      return [...state, newTodo];
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const filteredTodo = state.filter((state) => state.id !== id);
      return [...filteredTodo];
    },
    switchTodo: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const updatedTodo = state.map((state) => {
        if (state.id === id) {
          return { ...state, isDone: !state.isDone };
        } else {
          return state;
        }
      });
      return [...updatedTodo];
    },
  },
});

export const { addTodo, deleteTodo, switchTodo } = todoSlcie.actions;
export default todoSlcie.reducer;
