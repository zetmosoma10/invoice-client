import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import InvoiceDetails from "./pages/InvoiceDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "invoices/:id",
        element: <InvoiceDetails />,
      },
      {
        path: "user/login",
        element: <Login />,
      },
      {
        path: "user/register",
        element: <Register />,
      },
      {
        path: "user/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "user/profile",
        element: <Profile />,
      },
      {
        path: "user/logout",
        element: <Logout />,
      },
    ],
  },
]);

export default router;
