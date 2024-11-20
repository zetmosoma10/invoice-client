import "preline/preline";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import StatusBar from "../components/StatusBar";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Register from "./Register";
import NavBar from "../components/NavBar";
import InvoiceActionSec from "../components/InvoiceActionSec";
import InvoiceDetails from "./InvoiceDetails";
import { useGetAllInvoices } from "../services/useGetAllInvoices";

function AppLayout() {
  const location = useLocation();

  const { data, isError, isLoading } = useGetAllInvoices();

  console.log(data);

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <main>
      <NavBar />
    </main>
  );
}

export default AppLayout;
