import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18next";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import branchSlice, { branchFetch } from "./features/branchSlice";
import "./assets/css/index.css";
import categorySlice, { categoryFetch } from "./features/categorySlice";
const store = configureStore({
  reducer: {
    branches: branchSlice,
    categories: categorySlice,
  },
});
store.dispatch(branchFetch());
store.dispatch(categoryFetch());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
