const Dropdown = ({ selectedStatus, handleSelectedStatus }) => {
  const filters = ["Draft", "Pending", "Paid"];

  return (
    <select
      value={selectedStatus}
      onChange={(e) => handleSelectedStatus(e.target.value)}
      className="py-3 px-4 cursor-pointer pe-9 block max-w-[180px] font-semibold border-gray-200 rounded-lg text-sm md:text-base focus:border-blue-500
     focus:ring-blue-500 bg-white dark:bg-neutral-900 dark:border-neutral-700 text-gray-950
      dark:text-gray-500 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
    >
      <option value="">Filter by status</option>
      {filters.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
