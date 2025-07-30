// npm install redux-devtools-extension --legacy-peer-deps
//testing server ->

// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import  {thunk}  from "redux-thunk";
// import rootReducer from "./reducers";

// const initialState = {};

// const middleware = [thunk];

// const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// export default store;



// npm uninstall redux-devtools-extension --legacy-peer-deps
//live server ->

import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // 👈 fixed
import rootReducer from "./reducers";

const initialState = {};
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
