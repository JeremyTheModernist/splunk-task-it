import React, { useState, useEffect } from "react";
import { useFetch } from "../Hooks/index";
import styled from "styled-components";
import CompleteTodo from "./CompleteTodo";
import { useTodoState } from "../../state";

const StyledTodo = styled.li`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  box-sizing: border-box;
  list-style-type: none;
  padding: var(--padding-large);
  margin-bottom: var(--padding-normal);
  background-color: var(--gray-9);
  border-radius: var(--border-normal);
  font-weight: 500;
  border: 1px solid rgba(0, 0, 0, 0);
  cursor: pointer;
  :hover {
    transition: 0.15s ease-in-out;
    border-color: var(--gray-6);
  }
`;

const Status = styled.span`
  margin-left: auto;
  margin-right: var(--padding-normal);
  padding: var(--padding-small);
  background-color: ${(props) =>
    props.done ? "var(--status-done)" : "var(--status-undone)"};
  /* color: var(--primary-color); */
  font-weight: 500;
  font-size: var(--type-normal);
  border-radius: var(--border-normal);
`;

const TodoItems = ({ todo }) => {
  return (
    <StyledTodo>
      <p>{todo.todo}</p>
      <Status done={todo.done}>{todo.done ? "Done" : "Not Done"}</Status>
      <CompleteTodo todo={todo} />
    </StyledTodo>
  );
};

export default TodoItems;
