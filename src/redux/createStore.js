import { createStore, applyMiddleware, compose } from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

export const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
  var reduxTools;
  reduxTools = window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (noop) => noop;
} else {
  reduxTools = (noop) => noop;
  console.log = function () {};
}

export const store = createStore(
  rootReducer,
  compose(applyMiddleware(...middlewares), reduxTools)
);

export default store;
