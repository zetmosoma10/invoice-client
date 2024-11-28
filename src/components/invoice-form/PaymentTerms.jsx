const PaymentTerms = ({ label, id, errors, register }) => {
  const terms = ["Net 1 day", "Net 7 days", "Net 14 days", "Net 30 days"];
  return (
    <div className="grid gap-6">
      <div className="space-y-2">
        <label htmlFor={id} className="text-sm">
          {label}
        </label>
        <select
          {...register(id)}
          id={id}
          className={`py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 ${
            errors?.message &&
            "border-red-500 ring-red-500 focus:border-red-500 focus:ring-red-500"
          }`}
        >
          {terms.map((item) => (
            <option className="p-3" key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {errors?.message && (
          <p className="mt-2 text-xs text-red-600 " id={id}>
            {errors?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentTerms;
