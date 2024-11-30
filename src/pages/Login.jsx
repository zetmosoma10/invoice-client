import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/common/Input";
import loginSchema from "../schemas/loginSchema";
import { loginUser } from "../services/auth.js";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = loginUser();

  const onSubmit = (data) => {
    location.state = null;
    mutate(data, {
      onSuccess: () => {
        reset();
        queryClient.invalidateQueries(["invoices"]);
        navigate("/", { replace: true });
      },
      onError: (error) => {
        if (!error?.status)
          toast.error(`${error.message}. Please try again later.`);
      },
    });
  };

  const message = location.state?.message || null;

  return (
    <div className="flex items-center justify-center  w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 ">
      <div className="w-full  bg-white  rounded-xl shadow-md dark:bg-neutral-800 dark:border-neutral-700">
        <div className="px-5 py-6 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Sign in
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Don't have an account yet?
              <Link
                to="/user/register"
                className="font-medium text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
              >
                {" "}
                Sign up here
              </Link>
            </p>
          </div>
          {isError && error.status >= 400 && error.status < 500 && (
            <p className="mt-4 text-lg font-semibold text-center text-red-600 ">
              {error?.response.data.message}
            </p>
          )}
          {message && (
            <p className="mt-4 text-lg font-semibold text-center text-red-600 ">
              {message}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-7" noValidate>
            <div className="grid gap-y-4">
              <Input
                type="email"
                label="Email address"
                id="email"
                errors={errors?.email}
                register={register}
              />
              <Input
                type="password"
                label="Password"
                id="password"
                errors={errors?.password}
                register={register}
              />
              <div className="text-end">
                <Link
                  to="/user/forgot-password"
                  className="text-sm font-medium text-blue-600 gap-x-1 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                disabled={isPending}
              >
                {isPending ? (
                  <div
                    className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-gray-50 rounded-full dark:text-gray-50"
                    role="status"
                    aria-label="loading"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Sing in"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
