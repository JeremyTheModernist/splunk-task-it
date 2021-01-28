import React, { useState, useEffect } from "react";
import Button from "../Button";
import { useFetch } from "../Hooks";

import { useAppState, useTodoState } from "../../state";

import TodoItem from "./TodoItem";
import styled from "styled-components";

const TodoContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  border-top: 1px solid var(--gray-7);
  margin: var(--padding-normal);
  margin-top: var(--padding-xxlarge);
  margin-bottom: var(--padding-xxlarge);
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  button {
    margin-left: auto;
    margin-right: 0;
  }
`;

const TodoItemWrapper = styled.div`
  padding: 0;
  margin-top: var(--padding-large);
  list-style-type: none;
`;

const GetTodos = () => {
  console.log(
    "YOUR CURRENT URL",
    window.location.href,
    window.location.pathname
  );
  const { todos, setInitialTodos } = useTodoState();
  const { user } = useAppState();
  const { execute, data, isError } = useFetch(
    () =>
      fetch("http://localhost:3002/gettodos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id, username: user.username }),
      }),
    true
  );
  useEffect(() => {
    setInitialTodos(data);
  }, [data]);
  return (
    <TodoContainer>
      <TitleWrapper>
        <h3>
          You have{" "}
          {todos?.length === 1
            ? `${todos?.length} todo`
            : `${todos?.length} todos`}
          :{" "}
        </h3>
      </TitleWrapper>
      <TodoItemWrapper>
        {todos?.map((todo) => {
          return <TodoItem key={todo.todoId} todo={todo} />;
        })}
      </TodoItemWrapper>
    </TodoContainer>
  );
};

export default GetTodos;
