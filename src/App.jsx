import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "preline/preline";
import StatusBar from "./components/StatusBar";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <main className="max-w-[800px] mx-auto">
      <StatusBar />
    </main>
  );
}

export default App;
