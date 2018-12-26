import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// import * as serviceWorker from './serviceWorker';
// serviceWorker.unregister();

const initialState = {
  result: 15000,
  value: []
};

const userReducer = (state = { name: "jack", age: 20 }, action) => {
  switch (action.type) {
    case "setName":
      state = {
        ...state,
        name: action.payload
      };
      break;
    case "setAge":
      state = {
        ...state,
        age: action.payload
      };
      break;
    default:
      break;
  }
  return state;
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      state = {
        ...state,
        result: (state.result += action.payload),
        value: [...state.value, action.payload]
      };
      break;
    case "SUBTRACT":
      state = {
        ...state,
        result: (state.result -= action.payload),
        value: [...state.value, action.payload]
      };
      break;
    default:
      break;
  }
  return state;
};

const mylogger = store => next => action => {
  console.log("Log Action: ", action);
  next(action);
};

const store = createStore(
  combineReducers({ emp: employeeReducer, user: userReducer }),
  {},
  applyMiddleware(mylogger)
);

store.subscribe(() => {
  console.log("Update store: ", store.getState());
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
