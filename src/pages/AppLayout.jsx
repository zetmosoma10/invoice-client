import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "preline/preline";
import NavBar from "../components/NavBar";
import { AuthProvider } from "../context/AuthProvider";
import ScrollToTop from "../components/ScrollToTop";
import Loading from "../components/Loading";
import "react-toastify/dist/ReactToastify.css";

function AppLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("theme")) || false
  );

  useEffect(() => {
    const handleDOMContentLoaded = () => setIsLoading(false);

    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      handleDOMContentLoaded();
    } else {
      window.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
    }

    return () => {
      window.removeEventListener("DOMContentLoaded", handleDOMContentLoaded);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (isLoading) {
    return <Loading />;
  }

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
        <section className="flex justify-center flex-1">
          <Outlet context={{ darkMode }} />
        </section>
      </main>
    </AuthProvider>
  );
}

export default AppLayout;
