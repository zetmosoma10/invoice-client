const Input = ({
  label,
  id,
  register,
  errors,
  className,
  type = "text",
  disabled = false,
}) => {
  return (
    <div>
      <label htmlFor={id} className="block mb-2 text-sm dark:text-white">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          id={id}
          disabled={disabled}
          {...register(id)}
          className={`block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 ${
            errors[id] && "border-red-500 ring-red-500 "
          } ${className}`}
          aria-describedby={id}
        />
        {errors[id] && (
          <p className="mt-2 text-xs text-red-600 " id={id}>
            {errors[id].message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Input;
