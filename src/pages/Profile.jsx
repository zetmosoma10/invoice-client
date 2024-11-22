import dayjs from "dayjs";
import ProfileSkeleton from "../components/skeletons/ProfileSkeleton.jsx";
import { useAuth } from "../context/AuthProvider";
import { getCurrentUserDetails } from "../services/user.js";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();

  const { data, isLoading, isError, error } = getCurrentUserDetails();

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return <h2 className="text-3xl font-semibold ">{error?.message}</h2>;
  }

  return (
    <>
      <Link
        to="/"
        className="flex items-center my-10 text-base font-semibold text-gray-500 gap-x-2 hover:underline"
      >
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.342.886L2.114 5.114l4.228 4.228"
            stroke="#9277FF"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        <span>Go back</span>
      </Link>
      <div className="mt-10 bg-white shadow-lg w-[90%] mx-auto rounded-lg">
        <div className="flex items-start p-8 gap-x-6 ">
          <div className="relative">
            {data?.user.profilePicUrl ? (
              <img
                className="inline-block size-[100px] sm:size-[140px] rounded-full"
                src={profilePicUrl}
                alt="Avatar"
              ></img>
            ) : (
              <span className="inline-block overflow-hidden bg-gray-700 dark:bg-gray-200 rounded-full size-[100px] sm:size-[140px]">
                <svg
                  className="text-gray-700 dark:text-gray-200 size-full"
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
            )}
            {data?.user.profilePicUrl ? (
              <button className="absolute bottom-[-10px] left-0 right-0 text-xs sm:text-sm py-1   sm:py-2 sm:px-3 rounded-2xl  bg-blue-500 text-gray-100 text-nowrap ">
                remove picture
              </button>
            ) : (
              <button className="absolute bottom-[-10px] left-0 right-0 text-xs sm:text-sm py-1   sm:py-2 sm:px-3 rounded-2xl  bg-blue-500 text-gray-100 text-nowrap ">
                upload picture
              </button>
            )}
          </div>
          <div>
            <div className="border-b border-b-gray-300">
              <h3 className="text-lg font-semibold sm:text-2xl text-gray-950">
                {user.firstName} {user.lastName}
              </h3>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-900 sm:text-base ">
                Email:{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
                >
                  {user.email}
                </a>
              </p>
              <p className="text-sm text-gray-900 sm:text-base ">
                Account Created:{" "}
                <span className="font-medium">
                  {dayjs().format("DD MMM, YYYY")}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
