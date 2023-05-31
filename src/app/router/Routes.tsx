import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import BasketPage from "../../features/basket/BasketPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "products",
        element: <h1>Products Page</h1>,
      },
      {
        path: "products/:id",
        element: <h1>Product Detail Page</h1>,
      },
      {
        path: "basket",
        element: <BasketPage />,
      },
      {
        path: "checkout",
        element: <h1>Checkout Page</h1>,
      },
      {
        path: "account",
        element: <h1>Account Page</h1>,
      },
      {
        path: "contact",
        element: <h1>Contact Page</h1>,
      },
      {
        path: "about",
        element: <h1>About Page</h1>,
      },
      {
        path: "not-found",
        element: <h1>Not Found Page</h1>,
      },

      {
        path: "login",
        element: <h1>Login Page</h1>,
      },
      {
        path: "register",
        element: <h1>Register Page</h1>,
      },
      {
        path: "*",
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
]);
