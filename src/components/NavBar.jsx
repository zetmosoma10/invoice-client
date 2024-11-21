import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const NavBar = () => {
  const { user } = useAuth();

  return (
    <header className="w-full bg-blue-600 ">
      <nav className="relative flex items-center justify-between w-full gap-3 px-4 py-2 mx-auto sm:px-6 lg:px-8">
        <div>
          <Link
            to="/"
            className="flex-none text-xl font-semibold text-white focus:outline-none focus:opacity-80"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="26">
              <path
                fill="#FFF"
                fillRule="evenodd"
                d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"
              />
            </svg>
          </Link>
        </div>
        <div>
          {!user && (
            <Link
              to="user/login"
              className="flex items-center w-full p-2 text-sm text-white/80 hover:text-white focus:outline-none focus:text-white"
            >
              <svg
                className="shrink-0 size-4 me-3 md:me-2"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Log in
            </Link>
          )}
          {user && (
            <div className="flex items-center">
              <Link
                to="user/profile"
                className="flex items-center text-gray-100"
              >
                <span className="inline-block overflow-hidden bg-gray-100 rounded-full size-6">
                  <svg
                    class="size-full text-gray-300"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.62854"
                      y="0.359985"
                      width="15"
                      height="15"
                      rx="7.5"
                      fill="white"
                    ></rect>
                    <path
                      d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
                      fill="currentColor"
                    ></path>
                    <path
                      d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                <p className="ml-2 text-base">{user.firstName}</p>
              </Link>
              <Link
                to="user/logout"
                className="px-2 py-1 ml-4 text-blue-600 transition-all border bg-gray-50 rounded-3xl hover:scale-105"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
