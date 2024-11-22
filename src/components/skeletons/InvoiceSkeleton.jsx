const InvoiceSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="block px-4 py-3 mb-4 bg-white border rounded-lg shadow-sm md:flex md:justify-between hover:shadow-md">
        <div className="flex items-center justify-between md:gap-x-10">
          <span className="h-6 w-[80px] rounded-2xl bg-gray-200 dark:bg-neutral-700"></span>
          <p className="h-4 w-[100px]  bg-gray-200 rounded-full dark:bg-neutral-700"></p>
        </div>
        <div className="flex items-center justify-between mt-6 md:mt-0">
          <span className="h-4 w-[100px] bg-gray-200 rounded-full dark:bg-neutral-700"></span>
          <span className="h-6 w-[120px] bg-gray-200 rounded-md dark:bg-neutral-700 md:mr-10 md:ml-24"></span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSkeleton;
