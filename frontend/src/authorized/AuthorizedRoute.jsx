import React from "react";
import { Route } from "react-router-dom";
import { useAppState } from "../state";
import Unauthorized from "../pages/Unauthorized";

const AuthorizedRoute = ({ path, children }) => {
  const { isAuthorized } = useAppState();
  if (isAuthorized) {
    return <Route path={path}>{children}</Route>;
  }
  return (
    <Route path={path}>
      <Unauthorized />
    </Route>
  );
};

export default AuthorizedRoute;
