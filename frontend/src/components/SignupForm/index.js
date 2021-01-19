import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import { useFetch } from "../Hooks/index";

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

const SignupForm = () => {
  const { execute, data, isError } = useFetch(
    () =>
      fetch("http://localhost:3002/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }),
    false
  );
  const [formData, setFormData] = useState({
    name: null,
    username: null,
    password: null,
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
  return (
    <StyledForm onSubmit={handleFormSubmit}>
      {isError && !data && <Error>{isError.message}</Error>}
      {data && !isError && (
        <Success>
          {formData.name} you have successfully signed up for taskit!
        </Success>
      )}
      <InputContainer>
        <label htmlFor="name">First Name</label>
        <input
          type="name"
          name="name"
          id="name"
          placeholder="Provide a first name"
          onChange={handleFormInput}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Provide a username"
          onChange={handleFormInput}
        />
      </InputContainer>
      <InputContainer>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Provide a password"
          onChange={handleFormInput}
        />
      </InputContainer>
      <Button type="submit">Sign Up</Button>
    </StyledForm>
  );
};

export default SignupForm;
