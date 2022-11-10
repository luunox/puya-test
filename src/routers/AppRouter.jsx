/** @format */

import Employees from "#pages/Employees";
import ErrorPage from "#pages/error-page";
import HomePage from "#pages/HomePage";
import LoginPage from "#pages/LoginPage";
import ProtectedPage from "#pages/ProtectedPage";
import Upload from "#pages/UploadPage";
import { login } from "#reducers";
import { useDispatch } from "react-redux";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";

const AppRouter = () => {
  const dispatch = useDispatch();

  async function loginAction({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);

    if (updates.user === "knox" && updates.pass === "1234") {
      dispatch(login(updates));
      return redirect(`/employees`);
    }

    return redirect(`/login`);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
      errorElement: <ErrorPage />,
      children: [
        { path: "login", element: <LoginPage />, action: loginAction },
        { path: "upload", element: <ProtectedPage element={<Upload />} /> },
        { path: "employees", element: <ProtectedPage element={<Employees />} /> },
      ],
    },
    // { path: "/about", element: <div>Hello world!</div> },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
