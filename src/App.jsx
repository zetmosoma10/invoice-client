import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "preline/preline";
import Button from "./components/common/Button";
import iconPlus from "./assets/icon-plus.svg";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <main>
      <Button className="bg-gray-800 text-white hover:bg-gray-900 focus:bg-gray-900 dark:bg-white dark:text-neutral-800">
        save as Draft
      </Button>
      <Button className="bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700">
        Mark as Paid
      </Button>
      <Button className="bg-red-500 text-white hover:bg-red-600 focus:bg-red-600">
        Delete
      </Button>
      <Button className="bg-gray-200 text-blue-700 hover:text-white hover:bg-gray-800 focus:bg-gray-800">
        Edit
      </Button>
    </main>
  );
}

export default App;
