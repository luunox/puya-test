/** @format */

import { combineReducers, compose, configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./reducers";

const reducer = combineReducers({
  app: appReducer.reducer,
});

const middleware = [] || ((getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }));
const enhancers = process.env.NODE_ENV === "development" ? typeof window !== "undefined" && (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose) : compose;

export const store = configureStore({ reducer, enhancers, middleware });
