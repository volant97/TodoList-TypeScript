import React from "react";
import styled from "styled-components";
import { Todo } from "../types/todoType";
import { CustomError } from "../types/CustomError";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteTodo, getTodos, switchTodo } from "../api/todoAPI";

function Todolist({ isWorking }: { isWorking: boolean }) {
  const handleDeleteTodo = (id: string) => {
    // dispatch(deleteTodo(id));
    deleteMutation.mutate(id);
  };

  const handleSwitchTodo = (id: string, isDone: boolean) => {
    // dispatch(switchTodo(id));
    switchMutation.mutate({ id, isDone });
  };

  // 리액트 쿼리
  // get
  const { data, isLoading, isError } = useQuery("todos", getTodos);

  const queryClient = useQueryClient();

  // delete
  const deleteMutation = useMutation(deleteTodo, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("todos");
    },
    onError: (error: CustomError) => {
      console.log("delete-------------", error.code);
      alert(`예상하지 못한 오류가 발생했습니다. 고객센터로 연락바랍니다.
      오류 코드 : ${error.code}`);
    },
  });

  // patch
  const switchMutation = useMutation(switchTodo, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("todos");
    },
    onError: (error: CustomError) => {
      console.log("patch-------------", error.code);
      alert(`예상하지 못한 오류가 발생했습니다. 고객센터로 연락바랍니다.
      오류 코드 : ${error.code}`);
    },
  });

  if (isLoading) {
    return <h1>로딩중...</h1>;
  }

  if (isError) {
    return <h1>오류발생...!</h1>;
  }

  return (
    <StWorkingAndDoneBox>
      {isWorking ? <h1>Working.. 🔥</h1> : <h1>Done..! 🎉</h1>}
      <StCardListBox>
        {data
          .filter((todo: Todo) => {
            return todo.isDone === !isWorking;
          })
          .map((todo: Todo) => {
            return (
              <StCard key={todo.id}>
                <p>{todo.title}</p>
                <p>{todo.content}</p>
                {/* <p>{todo.isDone.toString()}</p> */}
                <StBtnBox>
                  <button onClick={() => handleDeleteTodo(todo.id)}>
                    삭제
                  </button>
                  <button
                    onClick={() => handleSwitchTodo(todo.id, todo.isDone)}
                  >
                    {isWorking ? "완료" : "취소"}
                  </button>
                </StBtnBox>
              </StCard>
            );
          })}
      </StCardListBox>
    </StWorkingAndDoneBox>
  );
}

export default Todolist;

const StWorkingAndDoneBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StCardListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

const StCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.3rem;
  width: 22rem;
  height: 10rem;
  padding: 1.3rem;
  border: 3px solid black;
  border-radius: 1rem;

  p:nth-child(1) {
    font-size: 1.5rem;
    font-weight: bold;
  }

  p:nth-child(2) {
    font-size: 1rem;
  }
`;

const StBtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;

  button {
    background: transparent;
    width: 7rem;
    height: 2rem;
    color: #000000;
    border: 2px solid black;
    border-radius: 5px;
  }

  button:nth-child(1) {
    background-color: #ffdfdf;

    &:hover {
      background-color: #ff5656;
      color: #ffff;
    }
  }

  button:nth-child(2) {
    background-color: #d9d9ff;

    &:hover {
      background-color: #4343f8;
      color: #ffff;
    }
  }
`;
