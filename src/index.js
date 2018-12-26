// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

import { createStore, combineReducers, applyMiddleware } from "redux";

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
  combineReducers({ employeeReducer, userReducer }),
  {},
  applyMiddleware(mylogger)
);

store.subscribe(() => {
  console.log("Update store: ", store.getState());
});

store.dispatch({
  type: "ADD",
  payload: 15000
});

store.dispatch({
  type: "setName",
  payload: "Dacharat"
});

store.dispatch({
  type: "ADD",
  payload: 10000
});

store.dispatch({
  type: "setAge",
  payload: 21
});
