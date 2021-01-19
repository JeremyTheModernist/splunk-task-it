import React from "react";

import styled from "styled-components";
import AddTodo from "../components/Todos/AddTodo";
import GetTodos from "../components/Todos/GetTodos";
import { useAppState, useTodoState } from "../state";

const PageWrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  margin: auto;
  margin-top: var(--padding-xxlarge);
  min-height: 80vh;
`;

const Profile = () => {
  const { user } = useAppState();
  // const {} = useTodoState();
  console.log("WHAT USER AM I GETTING?", user);
  return (
    <PageWrapper>
      <div>
        <h1>
          <span role="img">🎉</span> Welcome back, {user?.name || "partner"}
        </h1>
        <AddTodo />
        <GetTodos />
      </div>
    </PageWrapper>
  );
};

export default Profile;
