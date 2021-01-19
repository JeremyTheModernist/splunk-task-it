import logo from "./logo.svg";
import "./App.css";
import Form from "./components/SignupForm";
import { Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Nav from "./components/Nav";
import AuthorizedRoute from "./authorized/AuthorizedRoute";

function App() {
  return (
    <>
      <Nav />
      <div className="App">
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <AuthorizedRoute path="/profile">
            <Profile />
          </AuthorizedRoute>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
