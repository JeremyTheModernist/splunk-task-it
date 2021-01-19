import React from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";

const PageWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 90%;
  min-height: 80vh;
`;

const StyledParagraph = styled.div`
  font-size: var(--type-large);
  line-height: 1.5em;
  margin-bottom: var(--padding-xlarge);
`;

const Home = () => {
  const history = useHistory();
  const handleOnClick = () => {
    history.push("/signup");
  };
  return (
    <PageWrapper>
      <div>
        <h1>
          <span role="img">✅</span> Welcome to Taskit
        </h1>
        <StyledParagraph>
          Taskit is the all in one task tracker app. Got todos, taskit. Got a
          schedule, taskit. No matter what it is, if it needs to get done, then
          you can taskit.
        </StyledParagraph>
        <Button small={true} handleOnClick={handleOnClick}>
          Sign Up Now
        </Button>
      </div>
    </PageWrapper>
  );
};

export default Home;
