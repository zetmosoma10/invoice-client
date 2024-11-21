import { createContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import "preline/preline";
import { decodeJwt } from "../services/auth";

const CurrentUserContext = createContext();
export { CurrentUserContext };

function AppLayout() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loginUser = decodeJwt();
    setUser(loginUser);

    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <CurrentUserContext.Provider value={user}>
      <main className="min-h-screen bg-slate-100">
        <NavBar />
        <section className="pb-10 max-container">
          <Outlet />
        </section>
      </main>
    </CurrentUserContext.Provider>
  );
}

export default AppLayout;
