import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import Input from "../components/common/Input";
import useForgotPassword from "./../hooks/auth/useForgotPassword";

const schema = z.object({
  email: z.string().email("Valid email required"),
});

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const { mutate, isError, isPending, error } = useForgotPassword();

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        reset();
        toast.success(data.message);
      },
      onError: (error) => {
        if (
          error?.message === "Network Error" ||
          error?.response?.status >= 500
        )
          toast.error('Server is down. Please try again later.');
      },
    });
  };

  return (
    <div className="flex items-center justify-center w-11/12 min-h-screen sm:w-3/4 md:w-1/2 lg:w-1/3 ">
      <div className="w-full bg-white shadow-md rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
        <div className="px-5 py-6 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
              Remember your password?
              <Link
                to="/auth/login"
                className="font-medium text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
              >
                {" "}
                Sign in here
              </Link>
            </p>
          </div>

          {isError && error?.response && error.response?.status === 400 && (
            <p className="mt-4 text-lg font-semibold text-center text-red-600 ">
              {error?.response.data.message}
            </p>
          )}

          <div className="mt-10">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-y-4">
                <Input
                  label="Email Address"
                  type="email"
                  id="email"
                  autoFocus={true}
                  register={register}
                  errors={errors?.email}
                />
                <button
                  disabled={isPending}
                  className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
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
                    "Reset password"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
