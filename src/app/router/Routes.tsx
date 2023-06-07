import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import OrderPage from "../../features/orders/OrderPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";

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
        element: <Catalog />,
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
        element: <CheckoutPage />,
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
        element: <AboutPage />,
      },
      {
        path: "orders",
        element: <OrderPage />,
      },
      {
        path: "not-found",
        element: <h1>Not Found Page</h1>,
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "*",
        element: <Navigate replace to="/not-found" />,
      },
    ],
  },
]);
