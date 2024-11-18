import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "preline/preline";
import StatusBadge from "./components/StatusBadge";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <main>
      <StatusBadge status="Paid" color="GREEN" />
      <StatusBadge status="Pending" color="ORANGE" />
      <StatusBadge status="Draft" color="LIGHT_GREY" />
    </main>
  );
}

export default App;
