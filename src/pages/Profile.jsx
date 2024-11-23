import dayjs from "dayjs";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { useState } from "react";
import { uploadFile } from "../services/user";

const Profile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState("idle");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      setIsLoading("submitting");
      const data = await uploadFile(formData);
      const profilePicUrl = data.profilePicUrl;
      updateUser({ ...user, profilePicUrl });
    } catch (error) {
      setIsLoading("idle");
      alert("Error happened while uploading image");
      console.log(error);
    } finally {
      setIsLoading("idle");
    }
  };

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
            {user?.profilePicUrl ? (
              <img
                className="inline-block size-[100px] sm:size-[140px] rounded-full object-cover"
                src={user?.profilePicUrl}
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
          </div>
          <div>
            <div className="border-b border-b-gray-300">
              <h3 className="text-lg font-semibold sm:text-2xl text-gray-950">
                {user?.firstName} {user?.lastName}
              </h3>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-900 sm:text-base ">
                Email:{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
                >
                  {user?.email}
                </a>
              </p>
              <p className="text-sm text-gray-900 sm:text-base ">
                Account Created:{" "}
                <span className="font-medium">
                  {dayjs().format("DD MMM, YYYY")}
                </span>
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-3 flex-col gap-y-2">
              <input type="file" accept="image/*" onChange={handleFileChange} />
              <button
                disabled={isLoading === "submitting"}
                className="bg-blue-700 text-gray-50 text-sm py-2 px-4 disabled:bg-blue-400 disabled:cursor-wait rounded-3xl hover:bg-blue-500 capitalize active:scale-105"
              >
                {isLoading === "submitting" ? (
                  <div
                    className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-gray-50 rounded-full dark:text-gray-50"
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "upload"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
