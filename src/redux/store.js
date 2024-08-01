import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { Api } from "./services/api";
import blogReducer from "./slices/blog";
import authReducer from "./slices/Auth/auth";
import loggedUserReducer from "./slices/Auth/login";

export const reducers = {
  [Api.reducerPath]: Api.reducer,
  blogs: blogReducer,
  auth: authReducer,
  user: loggedUserReducer,
};

export const store = configureStore({
  reducer: {
    ...reducers,
    devTools: process.env.NODE_ENV !== "production",
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
});

setupListeners(store.dispatch);

export default store;
