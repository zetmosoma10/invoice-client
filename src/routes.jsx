import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import InvoiceDetails from "./pages/InvoiceDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectRoutes from "./components/ProtectRoutes";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated";

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
        element: <ProtectRoutes />,
        children: [
          {
            path: "invoices/:id",
            element: <InvoiceDetails />,
          },
          {
            path: "user/profile",
            element: <Profile />,
          },
        ],
      },
      {
        element: <RedirectIfAuthenticated />,
        children: [
          {
            path: "user/login",
            element: <Login />,
          },
          {
            path: "user/register",
            element: <Register />,
          },
        ],
      },
      {
        path: "user/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "user/logout",
        element: <Logout />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
