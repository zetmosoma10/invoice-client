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
    <main className="bg-slate-50 min-h-screen">
      <NavBar />
      <section className="max-w-[990px] mx-auto">
        <Outlet />
      </section>
    </main>
  );
}

export default AppLayout;
