import express from "express";
import { v4 as uuid } from "uuid";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

// https://pusher.com/tutorials/http-response-codes-part-2#the-node-js-backend
// working with unsecure http resources:
// https://stackoverflow.com/questions/45088006/nodejs-error-self-signed-certificate-in-certificate-chain

// use res.json(<yourResponse>) to ensure that express is returning json, not text/html to the client

const app = express();

// interpret all incoming requests as json and attach them to your req.body
app.use(express.json());

// middleware for errors
const errorHandler = async (err, req, res, next) => {
  // make sure the content type for this error response is in json
  // so my clientside fetch request doesn't complain
  res.setHeader("Content-Type", "application/json");
  // set the status to 500
  res.status(500);
  // this will create a new splunk event with the error Response and correct status code
  const splunkEvent = await createSplunkEvent(err);
  // get the error that I pass through my next() call and send it to my client
  res.send(JSON.stringify(err));
};

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const users = [];
const todos = [];

// this is where I make the http request to Splunk for a new event
// needs:
// POST type request
// data that can be passed in
// headers to be set with Authorization tokens
const createSplunkEvent = async (resObj) => {
  try {
    // something about circular deps demands that you send the response.data
    const user = await axios.post(
      process.env.SPLUNK_PREM_URL,
      {
        event: resObj,
      },
      {
        headers: {
          // prettier-ignore
          'Authorization': process.env.SPLUNK_PREM_HEC_TOKEN,
          "Content-Type": "application/json",
        },
      }
    );
    return user.data;
  } catch (e) {
    // console.log("hitting some error", e);
    return e;
  }
};

// this full URL is used for logrocket.
// log rocket will provide a full url that links to a query in splunk request.url
// however I must make sure that the data in splunk has that exact same url
// in logrocket I specifiy Splunk's key name, and logrocket's field value
// these two will map to each other which allows them to connect services
const getFullUrl = (req) => {
  return req.protocol + "://" + req.get("host") + req.originalUrl;
};

app.get("/", (req, res, next) => {
  res.send({
    message: "hello world!",
    status: res.statusCode,
  });
});

app.get("/users", (req, res, next) => {
  console.log("hitting the user endpoint");
  res.status(200).json(users);
});

const dataValidation = (req, res) => {
  return {
    validateUserInput: (username, password) => {
      if (!username) {
        //   throw new Error("You must provide a user name");
        throw "You must provide a user name";
      } else if (!password) {
        throw "You must provide a password";
      }
    },
    validateUserCreds: (username, password) => {
      const isUser = users.find((user) => user.username === username);
      const isPassword = users.find((user) => user.password === password);
      if (!isUser) {
        throw "User not found";
      } else if (!isPassword) {
        throw "Password is incorrect";
      }
    },
  };
};

app.post("/signup", async (req, res, next) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const id = uuid();
  const userObject = {
    name,
    username,
    password,
    id,
  };
  const { validateUserInput } = dataValidation();
  const fullClientUrl = getFullUrl(req);
  try {
    validateUserInput(username, password);
    const successRes = {
      headers: req.headers,
      // url: req.originalUrl,
      url: fullClientUrl,
      action: "signup",
      status: "success",
      statusCode: res.statusCode,
      ...userObject,
    };
    const splunkEvent = await createSplunkEvent(successRes);
    console.log("SPLUNK EVENT", splunkEvent);
    users.push(userObject);
    res.status(200).json(successRes);
  } catch (err) {
    //   set the header status
    res.status(500);
    // create an errorObject
    console.log("HITTING A BACKEND PROBLEM", err);
    const errorRes = {
      headers: req.headers,
      // url: req.originalUrl,
      url: req.fullClientUrl,
      action: "signup",
      status: "failure",
      statusCode: res.statusCode,
      message: err,
      ...userObject,
    };
    // this will pass along my error object to the next middleware or route
    // which in this case happens to be my errorHandler
    next(errorRes);
  }
});

app.post("/login", async (req, res, next) => {
  const { validateUserCreds, validateUserInput } = dataValidation();
  const username = req.body.username;
  const password = req.body.password;
  const fullClientUrl = getFullUrl(req);
  try {
    validateUserInput(username, password);
    validateUserCreds(username, password);
    const user = users.filter((user) => user.username === username)[0];
    const successRes = {
      headers: req.headers,
      // url: req.originalUrl,
      url: fullClientUrl,
      action: "login",
      status: "success",
      statusCode: res.statusCode,
      authorized: true,
      ...user,
    };
    const splunkEvent = await createSplunkEvent(successRes);
    // console.log("SPLUNK EVENT", splunkEvent);
    res.status(200).send(successRes);
  } catch (err) {
    // res.status(400);
    // create an errorObject to pass to my error middleware
    const errorRes = {
      headers: req.headers,
      // url: req.originalUrl,
      url: req.fullClientUrl,
      action: "login",
      status: "failure",
      statusCode: res.statusCode,
      authorized: false,
      message: err,
      username,
      password,
    };
    // const splunkEvent = await createSplunkEvent(errorRes);
    next(errorRes);
  }
});

app.post("/addtodo", async (req, res, next) => {
  const todo = req.body.todo;
  const todoId = uuid();
  const userId = req.body.userId;
  const username = req.body.username;
  const done = false;
  const newTodo = {
    userId,
    username,
    todo,
    todoId,
    done,
  };
  todos.push(newTodo);
  const fullClientUrl = getFullUrl(req);
  // if I wanted to send splunk all of the user todos, I could use the getTodos successResponse object
  // it would allow me to maintain a consistent data structure
  const successResponse = {
    username: username,
    todo: todo,
    done: done,
    action: "add todo",
    headers: req.headers,
    // url: req.originalUrl,
    url: fullClientUrl,
    status: "success",
    statusCode: res.statusCode,
    authorized: true,
  };
  const splunkEvent = await createSplunkEvent(successResponse);
  res.status(200).json(newTodo);
});

app.post("/gettodos", async (req, res, next) => {
  const userId = req.body.userId;
  const username = req.body.username;
  const userTodos = todos.filter((todo) => {
    return todo.userId === userId;
  });
  const fullClientUrl = getFullUrl(req);
  const successResponse = {
    username: username,
    todos: userTodos,
    action: "get todos",
    headers: req.headers,
    // url: req.originalUrl,
    url: fullClientUrl,
    status: "success",
    statusCode: res.statusCode,
    authorized: true,
  };
  const splunkEvent = await createSplunkEvent(successResponse);
  res.status(200).send(userTodos);
});

app.put("/updatetodo", async (req, res, next) => {
  const todoId = req.body.todoId;
  const foundTodo = todos.find((todo) => {
    return todo.todoId === todoId;
  });
  foundTodo.done = true;
  const fullClientUrl = getFullUrl(req);
  const successResponse = {
    username: foundTodo.username,
    todo: foundTodo.todo,
    done: foundTodo.done,
    action: "mark done",
    headers: req.headers,
    // url: req.originalUrl,
    url: fullClientUrl,
    status: "success",
    statusCode: res.statusCode,
    authorized: true,
  };
  const splunkEvent = await createSplunkEvent(successResponse);
  res.status(200).json(foundTodo);
});

// if an error occurs then pass it to my errorHandler and
// attach all of the appropriate headers to ensure the response is json
// this will return the object I pass through the next call.
app.use(errorHandler);

app.listen(3002, () => console.log("your app is up and running"));
