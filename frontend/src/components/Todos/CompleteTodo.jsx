import React, { useState, useEffect } from "react";
import { useFetch } from "../Hooks/index";
import styled from "styled-components";
import { useTodoState } from "../../state";

const StyledButton = styled.button`
  background-color: var(--brand-blue);
  color: var(--black);
  display: flex;
  flex-flow: row;
  justify-content: center;
  font-size: var(--type-normal);
  padding: var(--padding-small);
  font-weight: 600;
  border: none;
  border-radius: var(--border-normal);
  transition: 0.25s ease-in-out;
  cursor: pointer;
  :hover {
    transition: 0.25s ease-in-out;
    opacity: 0.8;
  }
`;

// need to add logic on the backend to change the status of the todo
// which means I also need to
const CompleteTodo = ({ todo }) => {
  const { markTodoDone } = useTodoState();
  const { execute, data, isError } = useFetch(
    () =>
      fetch("http://localhost:3002/updatetodo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todoId: todo.todoId }),
      }),
    false
  );
  const updateServerTodo = (e) => {
    execute();
  };
  // if data exists, and has changed via a server call, then update my local todo state
  useEffect(() => {
    if (data) {
      markTodoDone(data);
    }
  }, [data]);
  return (
    <>
      <StyledButton onClick={updateServerTodo}>Mark as Done</StyledButton>
    </>
  );
};

export default CompleteTodo;
