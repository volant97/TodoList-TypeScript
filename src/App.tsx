import React, { useState } from "react";
import { useDispatch } from "react-redux"; // useSelector
import styled from "styled-components";
// import { RootStateType } from "./redux/store";
import { Todo } from "./types/todoType";
import { addTodo, deleteTodo, switchTodo } from "./redux/modules/todoSlice";
import uuid from "react-uuid";
import { useQuery } from "react-query";
import { getTodos } from "./api/todoAPI";

function App() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // const todos = useSelector((state: RootStateType) => state.todos);
  const dispatch = useDispatch();

  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: Todo = {
      id: uuid(),
      title,
      content,
      isDone: false,
    };
    dispatch(addTodo(newTodo));
    setTitle("");
    setContent("");
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleSwitchTodo = (id: string) => {
    dispatch(switchTodo(id));
  };

  const { data, isLoading, isError } = useQuery("todos", getTodos);

  if (isLoading) {
    return <h1>로딩중...</h1>;
  }

  if (isError) {
    return <h1>오류발생...!</h1>;
  }

  return (
    <StContainer>
      <header>
        <h1>Todolist</h1>
      </header>
      <StMain>
        <StInputAndBtnForm onSubmit={handleFormSubmit}>
          <StInputBox>
            <p>제목</p>
            <input value={title} onChange={handleTitleInput}></input>
          </StInputBox>
          <StInputBox>
            <p>내용</p>
            <input value={content} onChange={handleContentInput}></input>
          </StInputBox>
          <button type="submit">추가하기</button>
        </StInputAndBtnForm>
        <StWorkingAndDoneBox>
          <div>
            <h1>Working.. 🔥</h1>
            <StCardListBox>
              {data
                .filter((todo: Todo) => {
                  return todo.isDone === false;
                })
                .map((todo: Todo) => {
                  return (
                    <StCard key={todo.id}>
                      <p>{todo.title}</p>
                      <p>{todo.content}</p>
                      <p>{todo.isDone.toString()}</p>
                      <button onClick={() => handleDeleteTodo(todo.id)}>
                        삭제
                      </button>
                      <button onClick={() => handleSwitchTodo(todo.id)}>
                        완료
                      </button>
                    </StCard>
                  );
                })}
            </StCardListBox>
          </div>
          <div>
            <h1>Done..! 🎉</h1>
            <StCardListBox>
              {data
                .filter((todo: Todo) => {
                  return todo.isDone === true;
                })
                .map((todo: Todo) => {
                  return (
                    <StCard key={todo.id}>
                      <p>{todo.title}</p>
                      <p>{todo.content}</p>
                      <p>{todo.isDone.toString()}</p>
                      <button onClick={() => handleDeleteTodo(todo.id)}>
                        삭제
                      </button>
                      <button onClick={() => handleSwitchTodo(todo.id)}>
                        취소
                      </button>
                    </StCard>
                  );
                })}
            </StCardListBox>
          </div>
        </StWorkingAndDoneBox>
      </StMain>
    </StContainer>
  );
}

export default App;

const StContainer = styled.div`
  /* position: absolute; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
  max-width: 800px;
  min-width: 550px;

  h1 {
    font-size: 1.5rem;
    font-weight: bold;
  }
`;

const StMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StInputAndBtnForm = styled.form`
  display: flex;
  gap: 1rem;
`;

const StInputBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const StWorkingAndDoneBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StCardListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 2rem 0;
  width: 100%;
`;

const StCard = styled.div`
  width: 13rem;
  height: 8rem;
  padding: 1rem;
  border: 2px solid black;
  border-radius: 1rem;
`;
