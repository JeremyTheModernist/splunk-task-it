import React from "react";
import SignupForm from "../components/SignupForm";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  margin: auto;
  min-height: 80vh;
`;

const Signup = () => {
  return (
    <PageWrapper>
      <div>
        <h1>Signup for Taskit</h1>
        <SignupForm />
      </div>
    </PageWrapper>
  );
};

export default Signup;
