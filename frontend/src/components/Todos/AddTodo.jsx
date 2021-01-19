import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../Button";
import { useFetch } from "../Hooks/index";
import { useAppState, useTodoState } from "../../state";

const StyledForm = styled.form`
  max-width: 50%;
  margin: auto;
  display: flex;
  flex-flow: row wrap;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column wrap;
  text-align: left;
  label {
    margin-bottom: var(--padding-normal);
    font-size: var(--type-large);
  }
  input {
    background-color: var(--gray-9);
    color: var(--white);
    font-size: var(--type-normal);
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0);
    box-sizing: border-box;
    padding: var(--padding-normal);
    border-radius: var(--border-normal);
    ::placeholder {
      color: var(--gray-4);
    }
    transition: 0.15s ease-in-out;
    :hover {
      transition: 0.15s ease-in-out;
      border-color: var(--gray-6);
    }
  }
  align-items: flex-start;
  margin-bottom: var(--padding-large);
`;

const Error = styled.div`
  background-color: var(--error-transparent-color);
  color: var(--white);
  border-radius: var(--border-normal);
  padding: var(--padding-small);
  font-size: var(--type-normal);
  width: 100%;
  margin-bottom: var(--padding-large);
`;

const Success = styled.div`
  background-color: var(--secondary-color);
  color: var(--white);
  border-radius: var(--border-normal);
  padding: var(--padding-small);
  font-size: var(--type-normal);
  width: 100%;
  margin-bottom: var(--padding-large);
`;

const AddTodo = () => {
  // get the id from the app state
  const { user } = useAppState();
  const { todos, addTodo } = useTodoState();
  const { execute, data, isError } = useFetch(
    () =>
      fetch("http://localhost:3002/addtodo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }),
    false
  );
  const [formData, setFormData] = useState({
    userId: user.id,
    username: user.username,
    todo: null,
  });
  const handleFormInput = (e) => {
    let formData = {};
    formData[e.target.name] = e.target.value;
    setFormData((prevState) => {
      return {
        ...prevState,
        ...formData,
      };
    });
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    execute();
  };
  // here I can check to see if the data has updated, and only if it has, do I run this function
  useEffect(
    (prevState) => {
      if (data) {
        addTodo(data);
      }
    },
    [data]
  );
  return (
    <StyledForm onSubmit={handleFormSubmit}>
      {isError && !data && <Error>{isError}</Error>}
      {data && !isError && (
        <Success>{formData.name} you have successfully added a todo.</Success>
      )}
      <InputContainer>
        <label htmlFor="todo">Add a todo</label>
        <input
          type="todo"
          name="todo"
          id="todo"
          placeholder="Create a new todo"
          onChange={handleFormInput}
        />
      </InputContainer>
      <Button type="submit" disabled={formData.todo ? false : true}>
        Add Todo
      </Button>
    </StyledForm>
  );
};

export default AddTodo;
