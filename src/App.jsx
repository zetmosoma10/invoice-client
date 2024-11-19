import "preline/preline";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import StatusBar from "./components/StatusBar";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import NavBar from "./components/NavBar";
import InvoiceActionSec from "./components/InvoiceActionSec";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <main>
      <InvoiceActionSec />
    </main>
  );
}

export default App;
