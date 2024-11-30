const Input = ({
  label,
  id,
  register,
  errors,
  className,
  type = "text",
  disabled = false,
  autoFocus = false,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium dark:text-neutral-200"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          disabled={disabled}
          autoFocus={autoFocus}
          {...register(id, { valueAsNumber: type === "number" })}
          className={`block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 ${
            errors?.message &&
            "border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500"
          } ${className}`}
          aria-describedby={id}
        />
        {errors?.message && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-500" id={id}>
            {errors?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
