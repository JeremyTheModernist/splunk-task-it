import React from "react";
import ReactDOM from "react-dom";
import LogRocket from "logrocket";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { PageWrapper, TodoWrapper } from "./state";

// LogRocket.init("zc2cw6/my-todo-app-dev");

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <PageWrapper>
        <TodoWrapper>
          <App />
        </TodoWrapper>
      </PageWrapper>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
