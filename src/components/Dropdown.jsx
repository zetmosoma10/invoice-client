const Dropdown = () => {
  return (
    <select
      className="py-3 px-4 pe-9 block max-w-[180px] font-semibold border-gray-200 rounded-lg text-sm focus:border-blue-500
     focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700
      dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
    >
      <option selected="">Filter by status</option>
      <option>Draft</option>
      <option>Pending</option>
      <option>Paid</option>
    </select>
  );
};

export default Dropdown;
