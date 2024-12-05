import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "motion/react";
import dayjs from "dayjs";
import { z } from "zod";
import { useAuth } from "../context/AuthProvider";
import { uploadFile, deleteProfilePics } from "../services/user";
import Button from "./../components/common/Button";
import Modal from "../components/Modal";
import Input from "./../components/common/Input";
import useDeleteAccount from "../hooks/user/useDeleteAccount";

const schema = z.object({
  password: z
    .string()
    .min(4, "Password must at least have 4 characters")
    .max(150, "Password must not have more than 150 characters"),
});

const Profile = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [modal, setModal] = useState(false);
  const { user, updateUser, logout } = useAuth();
  const [isUpdatingPic, setIsUpdatingPic] = useState("idle");
  const [isDeletingPic, setIsDeletingPic] = useState("idle");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const { mutate, isError, error, isPending } = useDeleteAccount();

  const addModal = () => {
    setModal(true);
  };

  const removeModal = () => {
    setModal(false);
  };

  const onDeleteAccount = (data) => {
    console.log(data);
    mutate(data, {
      onSuccess: (data) => {
        navigate("/auth/register", { replace: true });
        logout();
      },
      onError: (error) => {
        if (!error?.status || error?.status >= 500)
          toast.error(`${error.message}. Please try again later.`);
      },
    });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileDelete = async () => {
    try {
      setIsDeletingPic("submitting");
      const data = await deleteProfilePics();
      updateUser(data.user);
    } catch (error) {
      setIsDeletingPic("idle");
      toast.error(`${error.response.data.message}. Please try again later`);
    } finally {
      setIsDeletingPic("idle");
    }
  };

  const handleSubmitFile = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.info("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", selectedFile);

    try {
      setIsUpdatingPic("submitting");
      const data = await uploadFile(formData);
      updateUser(data.user);
      setSelectedFile(null);
    } catch (error) {
      setIsUpdatingPic("idle");
      toast.error(`${error.response.data.message}. Please try again later`);
    } finally {
      setIsUpdatingPic("idle");
    }
  };

  return (
    <div className="w-[95%] mx-auto">
      <AnimatePresence>
        {modal && (
          <Modal removeModal={removeModal}>
            <form onSubmit={handleSubmit(onDeleteAccount)} className="p-5">
              <h3 className="font-bold text-xl md:text-2xl leading-[-0.5] text-red-600 dark:text-red-600">
                Confirm Deletion
              </h3>
              <p className="mt-2 mb-4 text-sm text-gray-500 dark:text-neutral-200">
                Are you sure you want to delete the account ? This action cannot
                be undone.
              </p>
              {isError && error.status >= 400 && error.status < 500 && (
                <p className="mt-4 text-lg font-semibold text-center text-red-600 ">
                  {error?.response.data.message}
                </p>
              )}
              <Input
                type="password"
                id="password"
                label="Password"
                register={register}
                errors={errors?.password}
                autoFocus={true}
              />
              <div className="flex items-center justify-end mt-5 gap-x-2">
                <Button
                  onClick={removeModal}
                  className="text-blue-700 bg-gray-200 rounded-2xl hover:text-white hover:bg-gray-800 focus:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white rounded-xl"
                >
                  {isPending ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center my-10 text-base font-semibold text-gray-500 dark:text-neutral-500 gap-x-2 hover:underline"
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
        <Button
          onClick={addModal}
          className="text-red-600 border border-red-600 hover:bg-red-600 hover:text-white focus:bg-red-600 focus:text-white rounded-xl"
        >
          Delete Account
        </Button>
      </div>
      <div className="mt-10 bg-white rounded-lg shadow-lg dark:bg-neutral-800">
        <div className="p-6 text-center md:text-left md:flex md:items-start md:gap-x-6 ">
          <div className="overflow-hidden rounded-full size-[140px] sm:size-[140px] mx-auto md:mx-0">
            {user?.profilePicUrl ? (
              <img
                className="inline-block object-cover w-full rounded-full"
                src={user?.profilePicUrl}
                alt="Avatar"
              ></img>
            ) : (
              <span className="inline-block w-full bg-gray-700 dark:bg-gray-200 ">
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
            <div className="mt-5 border-b md:mt-0 border-b-gray-300 dark:border-b-neutral-700">
              <h3 className="text-xl font-semibold sm:text-2xl text-gray-950 dark:text-neutral-200">
                {user?.firstName} {user?.lastName}
              </h3>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-900 dark:text-neutral-200 sm:text-base ">
                Email:{" "}
                <a
                  href={`mailto:${user?.email}`}
                  className="font-medium text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
                >
                  {user?.email}
                </a>
              </p>
              <p className="text-sm text-gray-900 dark:text-neutral-200 sm:text-base ">
                Account Created:{" "}
                <span className="font-medium">
                  {dayjs(user?.createdAt).format("DD MMM, YYYY")}
                </span>
              </p>
            </div>
            <form onSubmit={handleSubmitFile} className="mt-3 ">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="inline-block w-full "
              />
              <button
                type="submit"
                disabled={isUpdatingPic === "submitting"}
                className="px-4 w-[130px] py-2 mt-3 text-sm capitalize bg-blue-700 text-gray-50 disabled:bg-blue-400 disabled:cursor-wait rounded-3xl hover:bg-blue-500 active:scale-105"
              >
                {isUpdatingPic === "submitting" ? (
                  <div
                    className="animate-spin inline-block size-3 border-[3px] border-current border-t-transparent text-gray-50 rounded-full dark:text-gray-50"
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "upload picture"
                )}
              </button>
              {user?.profilePicUrl && (
                <button
                  type="button"
                  onClick={handleFileDelete}
                  disabled={isDeletingPic === "submitting"}
                  className="px-4 py-2 w-[130px] mt-2 ml-2 text-sm capitalize bg-gray-700 text-gray-50 disabled:bg-gray-400 disabled:cursor-wait rounded-3xl hover:bg-gray-500 active:scale-105"
                >
                  {isDeletingPic === "submitting" ? (
                    <div
                      className="animate-spin inline-block size-3 border-[3px] border-current border-t-transparent text-gray-50 rounded-full dark:text-gray-50"
                      role="status"
                      aria-label="loading"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "delete picture"
                  )}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
