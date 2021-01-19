import React from "react";
import LoginForm from "../components/LoginForm";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  margin: auto;
  min-height: 80vh;
`;

const Login = () => {
  return (
    <PageWrapper>
      <div>
        <h1>Login to Taskit</h1>
        <LoginForm />
      </div>
    </PageWrapper>
  );
};

export default Login;
