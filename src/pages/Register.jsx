import { Link, useNavigate } from "react-router-dom";
import Input from "../components/common/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import _ from "lodash";
import { registerUser } from "../services/auth.js";
import registerSchema from "../schemas/registerSchema.js";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = registerUser();

  const onSubmit = (data) => {
    const userData = _.omit(data, "confirmPassword");
    mutate(userData, {
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

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white shadow-md mt-7 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="px-6 py-6 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Sign up
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Already have an account?
              <Link
                to="/user/login"
                className="font-medium text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
              >
                {" "}
                Sign in here
              </Link>
            </p>
          </div>

          {isError && error?.status === 400 && (
            <p className="mt-4 text-lg font-semibold text-center text-red-600 ">
              {error?.response.data.message}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-10" noValidate>
            <div className="grid gap-y-4">
              <div className="space-y-4 sm:flex sm:space-y-0 sm:gap-x-4">
                <Input
                  label="First Name"
                  id="firstName"
                  register={register}
                  errors={errors?.firstName}
                />
                <Input
                  label="Last Name"
                  id="lastName"
                  register={register}
                  errors={errors?.lastName}
                />
              </div>
              <Input
                label="Email Address"
                type="email"
                id="email"
                register={register}
                errors={errors?.email}
              />
              <Input
                label="Password"
                type="password"
                id="password"
                register={register}
                errors={errors?.password}
              />
              <Input
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                register={register}
                errors={errors?.confirmPassword}
              />
              <button
                className="inline-flex items-center justify-center w-full px-4 py-3 mt-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
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
                  "Sing up"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
