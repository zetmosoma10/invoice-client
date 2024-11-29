const InvoiceDetailsSkeleton = () => {
  return (
    <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10 animate-pulse">
      <div className="flex items-center justify-end w-full px-3 py-6 bg-white rounded-lg gap-x-6">
        <div className="h-6 w-[100px] bg-gray-200 rounded-lg"></div>
        <div className="h-6 w-[100px] bg-gray-200 rounded-lg"></div>
        <div className="h-6 w-[100px] bg-gray-200 rounded-lg"></div>
      </div>
      {/* Card */}
      <div className="flex flex-col p-4 mt-8 bg-white shadow-md sm:p-10 rounded-xl dark:bg-neutral-800">
        {/* Grid */}
        <div className="flex justify-between">
          <div className="h-3 w-[80px] mr-3 md:h-6 md:w-[120px] bg-gray-200 rounded-full text-end"></div>
          {/* Col */}
          <div className="text-end">
            <h2 className="h-4 w-[100px] md:h-8 md:w-[150px] bg-gray-200 rounded-full"></h2>
            <address className="mt-4 space-y-2">
              <span className="h-2 w-[150px] md:h-3 md:w-[200px] rounded-full bg-gray-200 block "></span>
              <span className="h-2 w-[150px] md:h-3 md:w-[200px] rounded-full bg-gray-200 block"></span>
              <span className="h-2 w-[150px] md:h-3 md:w-[200px] rounded-full bg-gray-200 block"></span>
              <span className="h-2 w-[150px] md:h-3 md:w-[200px] rounded-full bg-gray-200 block"></span>
            </address>
          </div>
          {/* Col */}
        </div>
        {/* End Grid */}

        {/* Grid */}
        <div className="grid gap-3 mt-8 sm:grid-cols-2">
          <div>
            <h3 className="h-6 w-[150px]"></h3>
            <address className="mt-4 space-y-2">
              <span className="h-2 w-[150px] md:h-3 md:w-[200px] rounded-full bg-gray-200 block "></span>
              <span className="h-2 w-[150px] md:h-3 md:w-[200px] rounded-full bg-gray-200 block"></span>
              <span className="h-2 w-[150px] md:h-3 md:w-[200px] rounded-full bg-gray-200 block"></span>
              <span className="h-2 w-[150px] md:h-3 md:w-[200px] rounded-full bg-gray-200 block"></span>
              <br />
            </address>
          </div>
          {/* Col */}
        </div>
        {/* End Grid */}

        {/* Invoice Table */}
        <div className="p-4 mt-6 border border-gray-200 rounded-lg dark:border-neutral-700">
          <div className="hidden pt-2 pb-4 sm:grid sm:grid-cols-5">
            <div className="h-3 w-[40px] bg-gray-200 sm:col-span-2"></div>
            <div className="h-3 w-[40px] bg-gray-200"></div>
            <div className="h-3 w-[40px] bg-gray-200 justify-self-end "></div>
          </div>
          <div className="border-b border-gray-200 dark:border-neutral-700"></div>

          {/* Table Rows */}

          <div className="grid grid-cols-3 gap-2 py-3 border-b border-gray-200 sm:grid-cols-5 sm:border-none">
            <div className="col-span-full sm:col-span-2">
              <div className="h-3 w-[40px] bg-gray-200 sm:hidden"></div>
            </div>
            <div>
              <div className="h-3 w-[40px] bg-gray-200 sm:hidden"></div>
            </div>
            <div>
              <div className="h-3 w-[40px] bg-gray-200 sm:hidden"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsSkeleton;
