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

function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <main>
      <NavBar />
    </main>
  );
}

export default App;
