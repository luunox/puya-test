/** @format */

import { store } from "#store";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import AppRouter from "#routers/AppRouter";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
