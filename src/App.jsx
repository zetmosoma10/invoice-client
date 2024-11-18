import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "preline/preline";
import StatusBar from "./components/StatusBar";
import Login from "./pages/Login";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <main className="max-w-[800px] mx-auto">
      <Login />
    </main>
  );
}

export default App;
