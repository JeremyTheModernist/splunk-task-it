import React, { useState, useContext, createContext, useEffect } from "react";

const TodoContext = createContext({
  todos: [],
  setInitialTodos: () => {},
  addTodo: () => {},
  markTodoDone: () => {},
});

const initialState = [];

export const TodoWrapper = ({ children }) => {
  const [todos, setTodos] = useState(initialState);

  const addTodo = (newTodo) => {
    setTodos((prevTodos) => {
      if (prevTodos) {
        return [newTodo, ...prevTodos];
      }
      return [newTodo];
    });
  };
  const markTodoDone = (updatedTodo) => {
    setTodos((prevTodos) => {
      let todoIndex = prevTodos.findIndex(
        (todo) => todo.todoId === updatedTodo.todoId
      );
      let newArray = [...prevTodos];
      newArray[todoIndex] = updatedTodo;
      return [...newArray];
    });
  };
  // this allows me to fetch some server todos and add them here
  // this will update all of my todos everytime this function runs to be in sync with my server todos
  const setInitialTodos = (serverTodos = []) => {
    setTodos((prevState) => {
      if (serverTodos) {
        // todos come back and display by first added. we want the first one to be the most recently added.
        return [...serverTodos.reverse()];
      }
      return [];
    });
  };
  return (
    <TodoContext.Provider
      value={{ todos, setInitialTodos, addTodo, markTodoDone }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoState = () => useContext(TodoContext);
