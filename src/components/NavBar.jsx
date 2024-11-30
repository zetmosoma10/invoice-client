import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const NavBar = ({ darkMode, toggleDarkMode }) => {
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
        <div className="flex items-center">
          <div onClick={toggleDarkMode} className="mr-8 cursor-pointer">
            {darkMode ? (
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.817 16.18a.96.96 0 01.953.848l.007.112v1.535a.96.96 0 01-1.913.112l-.006-.112V17.14c0-.53.43-.96.96-.96zm-4.5-1.863c.347.346.373.89.08 1.266l-.08.09-1.085 1.087a.96.96 0 01-1.437-1.267l.08-.09 1.086-1.086a.959.959 0 011.357 0zm10.356 0l1.086 1.086a.959.959 0 11-1.357 1.357l-1.085-1.086a.959.959 0 111.356-1.357zM9.817 4.9a4.924 4.924 0 014.918 4.918 4.924 4.924 0 01-4.918 4.918A4.924 4.924 0 014.9 9.818 4.924 4.924 0 019.817 4.9zm8.858 3.958a.96.96 0 110 1.919H17.14a.96.96 0 110-1.92h1.535zm-16.18 0a.96.96 0 01.112 1.912l-.112.007H.96a.96.96 0 01-.112-1.913l.112-.006h1.534zm14.264-5.983a.96.96 0 010 1.357l-1.086 1.086a.96.96 0 11-1.356-1.357l1.085-1.086a.96.96 0 011.357 0zm-12.617-.08l.09.08 1.086 1.086A.96.96 0 014.05 5.398l-.09-.08-1.086-1.086a.959.959 0 011.267-1.436zM9.817 0c.53 0 .96.43.96.96v1.535a.96.96 0 01-1.92 0V.96c0-.53.43-.96.96-.96z"
                  fill="#fff"
                  fillRule="nonzero"
                />
              </svg>
            ) : (
              <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M19.502 11.342a.703.703 0 00-.588.128 7.499 7.499 0 01-2.275 1.33 7.123 7.123 0 01-2.581.46A7.516 7.516 0 018.74 11.06a7.516 7.516 0 01-2.198-5.316c0-.87.153-1.713.41-2.48.28-.817.69-1.559 1.226-2.197a.652.652 0 00-.102-.92.703.703 0 00-.588-.128C5.316.607 3.425 1.91 2.07 3.649A10.082 10.082 0 000 9.783C0 12.57 1.125 15.1 2.965 16.94a10.04 10.04 0 007.156 2.965c2.352 0 4.524-.818 6.262-2.173a10.078 10.078 0 003.579-5.597.62.62 0 00-.46-.793z"
                  fill="#fff"
                  fillRule="nonzero"
                />
              </svg>
            )}
          </div>
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
                {!user.profilePicUrl ? (
                  <span className="inline-block overflow-hidden bg-gray-100 rounded-full size-6">
                    <svg
                      className="text-gray-300 size-full"
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
                ) : (
                  <img
                    src={user.profilePicUrl}
                    alt="avatar"
                    className="w-[35px] h-[35px] rounded-full object-cover"
                  />
                )}
                <p className="ml-2 text-base">{user.firstName}</p>
              </Link>
              <Link
                to="user/logout"
                className="px-2 py-1 ml-4 text-sm text-blue-600 transition-all border md:text-base bg-gray-50 rounded-3xl hover:scale-105"
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
