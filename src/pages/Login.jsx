import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email("valid email is required"),
  password: z.string().min(4, "Password must be at least 4 characters long"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-[500px] mt-7 bg-white  rounded-xl shadow-md dark:bg-neutral-900 dark:border-neutral-700">
        <div className="p-4 sm:p-7">
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

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10" noValidate>
            <div className="grid gap-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm dark:text-white"
                >
                  Email address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 ${
                      errors.email && "focus:border-red-500 focus:ring-red-500 "
                    }`}
                    aria-describedby="email-error"
                  />
                  {errors.email && (
                    <p className="mt-2 text-xs text-red-600 " id="email-error">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm dark:text-white"
                  >
                    Password
                  </label>
                  <Link
                    to="/user/forgot-password"
                    className="inline-flex items-center text-sm font-medium text-blue-600 gap-x-1 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    className={`block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 ${
                      errors.password &&
                      "focus:border-red-500 focus:ring-red-500"
                    }`}
                    aria-describedby="password-error"
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-xs text-red-600 " id="password-error">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
