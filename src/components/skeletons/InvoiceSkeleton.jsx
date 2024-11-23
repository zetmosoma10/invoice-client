const InvoiceSkeleton = () => {
  return (
    <div className="grid  grid-cols-2 grid-rows-2 gap-y-4 md:grid-rows-1 md:gap-y-0 md:grid-cols-5  px-4 py-3 mb-4 bg-white rounded-lg shadow-sm  animate-pulse">
      <span className="h-6 w-[80px] rounded-2xl bg-gray-200 dark:bg-neutral-700"></span>
      <p className="justify-self-end md:justify-self-start h-4 w-[100px]  bg-gray-200 rounded-full dark:bg-neutral-700"></p>
      <span className=" h-4 w-[100px] bg-gray-200 rounded-full dark:bg-neutral-700"></span>
      <span className="justify-self-end md:justify-self-start h-4 w-[100px] bg-gray-200 rounded-full dark:bg-neutral-700"></span>
      <span className="md:justify-self-center h-6 w-[80px] bg-gray-200 rounded-md dark:bg-neutral-700 md:mr-10 md:ml-24"></span>
    </div>
  );
};

export default InvoiceSkeleton;
