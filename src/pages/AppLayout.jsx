import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "preline/preline";
import NavBar from "../components/NavBar";
import { AuthProvider } from "../context/AuthProvider";
import ScrollToTop from "../components/ScrollToTop";
import "react-toastify/dist/ReactToastify.css";

function AppLayout() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("theme")) || false
  );
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AuthProvider>
      <ScrollToTop />
      <main
        className={`${
          darkMode && "dark"
        } min-h-screen flex flex-col bg-slate-100 dark:bg-neutral-900`}
      >
        <NavBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <ToastContainer />
        <section className="flex-1 flex  justify-center">
          <Outlet context={{ darkMode }} />
        </section>
      </main>
    </AuthProvider>
  );
}

export default AppLayout;
