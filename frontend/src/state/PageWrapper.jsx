import React, { useState, useContext, createContext } from "react";

export const AppContext = createContext({
  isAuthorized: false,
  setIsAuthorized: () => {},
  user: {
    id: null,
    name: null,
    username: null,
    password: null,
  },
  setUser: () => {},
});

export const PageWrapper = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(false);
  console.log("SETTTING A USER YO", user);
  return (
    <AppContext.Provider
      value={{ isAuthorized, setIsAuthorized, user, setUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => useContext(AppContext);
