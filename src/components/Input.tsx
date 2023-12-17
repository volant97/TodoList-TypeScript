import React, { useState } from "react";
import uuid from "react-uuid";
import { Todo } from "../types/todoType";
import { CustomError } from "../types/CustomError";
import { useMutation, useQueryClient } from "react-query";
import { addTodo } from "../api/todoAPI";
import styled from "styled-components";

function Input() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  // const todos = useSelector((state: RootStateType) => state.todos);
  // const dispatch = useDispatch();

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

    if (title.length < 1 || title.length > 12) {
      return alert("제목을 1~12글자로 입력해주세요.");
    }

    if (content.length < 1 || content.length > 19) {
      return alert("내용을 1~19글자로 입력해주세요.");
    }

    // dispatch(addTodo(newTodo));
    addMutation.mutate(newTodo);
    setTitle("");
    setContent("");
  };

  // 리액트 쿼리
  // post
  const queryClient = useQueryClient();

  const addMutation = useMutation(addTodo, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("todos");
    },
    onError: (error: CustomError) => {
      console.log("post-------------", error.code);
      alert(`예상하지 못한 오류가 발생했습니다. 고객센터로 연락바랍니다.
      오류 코드 : ${error.code}`);
    },
  });

  return (
    <StInputAndBtnForm onSubmit={handleFormSubmit}>
      <StInputBox>
        <p>제목 :</p>
        <input type="text" value={title} onChange={handleTitleInput}></input>
      </StInputBox>
      <StInputBox>
        <p>내용 :</p>
        <input
          type="text"
          value={content}
          onChange={handleContentInput}
        ></input>
      </StInputBox>
      <button type="submit">추가하기</button>
    </StInputAndBtnForm>
  );
}

export default Input;

const StInputAndBtnForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;

  button {
    background: transparent;
    background-color: #d6ffd8;
    width: 7rem;
    height: 2rem;
    color: #000000;
    border: 2px solid black;
    border-radius: 5px;

    &:hover {
      background-color: #00be29;
      color: #ffff;
    }
  }
`;

const StInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;

  input {
    height: 2rem;
    outline: none;
    border: none;
    border-bottom: 2px solid black;
  }
`;
