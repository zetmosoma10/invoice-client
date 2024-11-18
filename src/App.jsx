import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Invoice from "./components/Invoice";
import "preline/preline";
import Dropdown from "./components/Dropdown";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <main className="max-w-[800px] mx-auto">
      <Dropdown />
    </main>
  );
}

export default App;
