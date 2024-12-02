import { useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import _ from "lodash";
import Input from "../components/common/Input";
import { resetPasswordMutation } from "../services/auth";
import { useAuth } from "../context/AuthProvider";
import { toast } from "react-toastify";

const schema = z
  .object({
    password: z.string().min(4, "Password must be at least 4 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  const { login } = useAuth();

  const { mutate, isError, error, isPending } = resetPasswordMutation();

  const onSubmit = (data) => {
    mutate(
      { id, token, password: data.password },
      {
        onSuccess: (data) => {
          toast.success("Password Reset successfully.");
          login(data.token);
          navigate("/", { replace: true });
        },
        onError: (error) => {
          if (!error?.status || error.status >= 500)
            toast.error(`${error.message}. Please try again later.`);
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 ">
      <div className="w-full bg-white shadow-md rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="px-5 py-6 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Reset Password
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Please enter your new Password
            </p>
          </div>

          {isError && error.status >= 400 && error.status < 500 && (
            <p className="mt-4 text-lg font-semibold text-center text-red-600 ">
              {error?.response.data.message}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-7" noValidate>
            <div className="grid gap-y-4">
              <Input
                type="password"
                label="Password"
                id="password"
                autoFocus={true}
                errors={errors?.password}
                register={register}
              />
              <Input
                type="password"
                label="Conform Password"
                id="confirmPassword"
                errors={errors?.confirmPassword}
                register={register}
              />
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
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
