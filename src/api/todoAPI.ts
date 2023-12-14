import axios from "axios";
import { Todo } from "../types/todoType";

const getTodos = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_JSON_SERVER}/todos`
  );
  return response.data;
};

const addTodo = async (newTodo: Todo) => {
  const response = await axios.post(
    `${process.env.REACT_APP_JSON_SERVER}/todos`,
    newTodo
  );
  return response.data;
};

const deleteTodo = async (id: string) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_JSON_SERVER}/todos/${id}`
  );
  return response.data;
};

const switchTodo = async ({ id, isDone }: { id: string; isDone: boolean }) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_JSON_SERVER}/todos/${id}`,
    {
      isDone: !isDone,
    }
  );
  return response.data;
};

export { getTodos, addTodo, deleteTodo, switchTodo };
