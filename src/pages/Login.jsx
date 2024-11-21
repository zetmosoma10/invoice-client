import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../components/common/Input";
import loginSchema from "../schemas/loginSchema";
import { loginUser } from "../services/auth.js";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const { mutate, isPending, isError, error } = loginUser();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => {
        reset();
        navigate("/", { replace: true });
      },
    });
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
          {isError && (
            <p className="mt-4 text-lg font-semibold text-center text-red-600 ">
              {error?.response.data.message}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-7" noValidate>
            <div className="grid gap-y-4">
              <Input
                type="email"
                label="Email address"
                id="email"
                errors={errors}
                register={register}
              />
              <Input
                type="password"
                label="Password"
                id="password"
                errors={errors}
                register={register}
              />
              <button
                className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                disabled={isPending}
              >
                {isPending ? "Signing..." : "Sing in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
