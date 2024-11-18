import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "preline/preline";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <main>
      <h1 className="font-bold text-RED">Main</h1>
    </main>
  );
}

export default App;
