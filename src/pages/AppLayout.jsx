import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import "preline/preline";
import { AuthProvider } from "../context/AuthProvider";

function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <AuthProvider>
      <main className="min-h-screen bg-slate-100">
        <NavBar />
        <section className="pb-10 max-container">
          <Outlet />
        </section>
      </main>
    </AuthProvider>
  );
}

export default AppLayout;