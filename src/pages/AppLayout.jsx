import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "preline/preline";
import NavBar from "../components/NavBar";

function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-slate-100">
      <NavBar />
      <section className="pb-10 max-container">
        <Outlet />
      </section>
    </main>
  );
}

export default AppLayout;
