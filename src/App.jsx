import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Invoice from "./components/Invoice";
import "preline/preline";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <main className="max-w-[800px] mx-auto">
      <Invoice />
      <Invoice />
      <Invoice />
    </main>
  );
}

export default App;
