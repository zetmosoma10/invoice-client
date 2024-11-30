const InvoiceSkeleton = () => {
  return (
    <div className="animate-pulse grid grid-cols-2 grid-rows-2 px-4 py-3 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:bg-neutral-800 gap-y-4 md:grid-rows-1 md:gap-y-0 md:grid-cols-5 md:items-center hover:shadow-md">
      <span className="h-6 w-[80px] font-bold bg-gray-300 dark:bg-neutral-600 rounded-2xl"></span>
      <p className="h-4 w-[100px] bg-gray-300 justify-self-end md:justify-self-start dark:bg-neutral-600 rounded-2xl"></p>
      <span className="h-4 w-[100px] bg-gray-300 dark:bg-neutral-600 rounded-2xl"></span>
      <span className="h-4 w-[100px] font-bold justify-self-end md:justify-self-start bg-gray-300 dark:bg-neutral-600 rounded-2xl"></span>
      <div className="h-6 w-[80px] bg-gray-300 dark:bg-neutral-600 rounded-2xl"></div>
    </div>
  );
};

export default InvoiceSkeleton;
