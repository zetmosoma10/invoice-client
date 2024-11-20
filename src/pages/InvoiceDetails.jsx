import { useParams } from "react-router-dom";
import { useGetInvoice } from "../services/useGetInvoice";
import dayjs from "dayjs";

const InvoiceDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useGetInvoice(id);

  return (
    <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
      {/* Card */}
      <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dark:bg-neutral-800">
        {/* Grid */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">Logo Here</h1>
          </div>
          {/* Col */}
          <div className="text-end">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-neutral-200">
              Invoice #
            </h2>
            <span className="mt-1 block text-gray-500 dark:text-neutral-500">
              {data?.invoice.invoiceNumber.toUpperCase()}
            </span>
            <address className="mt-4 not-italic text-gray-800 dark:text-neutral-200">
              {data?.invoice.senderAddress.street}
              <br />
              {data?.invoice.senderAddress.postalCode}
              <br />
              {data?.invoice.senderAddress.city}
              <br />
              {data?.invoice.senderAddress.country}
              <br />
            </address>
          </div>
          {/* Col */}
        </div>
        {/* End Grid */}

        {/* Grid */}
        <div className="mt-8 grid sm:grid-cols-2 gap-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
              Bill to:{"  "}
              <a
                className="text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                href="#"
              >
                {data?.invoice.clientEmail}
              </a>
            </h3>

            <p className=" text-gray-800 dark:text-neutral-200">
              {data?.invoice.clientName}
            </p>
            <address className="mt-2 not-italic text-gray-500 dark:text-neutral-500">
              {data?.invoice.clientAddress.street}
              <br />
              {data?.invoice.clientAddress.postalCode}
              <br />
              {data?.invoice.clientAddress.city}
              <br />
              {data?.invoice.clientAddress.country}
              <br />
            </address>
          </div>
          {/* Col */}

          <div className="sm:text-end space-y-2">
            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                  Invoice date:
                </dt>
                <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                  {dayjs(data?.invoice.invoiceDate).format("DD MMM, YYYY")}
                </dd>
              </dl>
              <dl className="grid sm:grid-cols-5 gap-x-3">
                <dt className="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">
                  Due date:
                </dt>
                <dd className="col-span-2 text-gray-500 dark:text-neutral-500">
                  {data?.invoice.paymentDue}
                </dd>
              </dl>
            </div>
            {/* End Grid */}
          </div>
          {/* Col */}
        </div>
        {/* End Grid */}

        {/* Invoice Table */}
        <div className="mt-6 border border-gray-200 p-4 rounded-lg dark:border-neutral-700">
          <div className="hidden sm:grid sm:grid-cols-5 pt-2 pb-4">
            <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Item
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Qty
            </div>
            <div className="text-xs font-medium justify-self-end text-gray-500 uppercase dark:text-neutral-500">
              Amount
            </div>
          </div>
          <div className="border-b border-gray-200 dark:border-neutral-700"></div>

          {/* Table Rows */}

          {data?.invoice.items.map((item) => (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 py-3 border-b border-gray-200 dark:border-neutral-700 sm:border-none">
              <div className="col-span-full sm:col-span-2">
                <div className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                  Item
                </div>
                <p className="font-medium text-gray-800 dark:text-neutral-200 pt-1">
                  {item.name}
                </p>
              </div>
              <div>
                <div className="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                  Qty
                </div>
                <p className="text-gray-800 dark:text-neutral-200">
                  {item.quantity}
                </p>
              </div>
              <div>
                <div className="sm:hidden text-xs font-medium justify-self-end text-gray-500 uppercase dark:text-neutral-500">
                  Amount
                </div>
                <p className="text-end text-gray-800 dark:text-neutral-200">
                  {item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="mt-8 flex sm:justify-end">
          <div className="w-full max-w-2xl sm:text-end">
            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                Subtotal:
              </dt>
              <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                {data?.invoice.amountDue}
              </dd>
            </dl>
            <dl className="grid sm:grid-cols-5 gap-x-3 text-sm">
              <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                Total:
              </dt>
              <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                {data?.invoice.amountDue}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;

{
  /* <a
  className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
  href="#"
>
  <svg
    className="shrink-0 size-4"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect width="12" height="8" x="6" y="14" />
  </svg>
  Print
</a>; */
}
