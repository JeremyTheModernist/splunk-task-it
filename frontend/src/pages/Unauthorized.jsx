import React from "react";

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
        <h1>
          <span role="img">❌</span> You do not have access to this page
        </h1>
      </div>
    </PageWrapper>
  );
};

export default Signup;
