import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "preline/preline";
import StatusBar from "./components/StatusBar";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <main className="max-w-[800px] mx-auto">
      <ForgotPassword />
    </main>
  );
}

export default App;
