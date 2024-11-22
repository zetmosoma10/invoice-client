import { useParams, Link, useLocation } from "react-router-dom";
import dayjs from "dayjs";
import StatusBadge from "../components/common/StatusBadge";
import InvoiceAction from "../components/InvoiceAction";
import { getInvoice } from "../services/invoicesService";
import InvoiceDetailsSkeleton from "../components/skeletons/InvoiceDetailsSkeleton";

const InvoiceDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const { data, isLoading, isError, error } = getInvoice(id);

  const query = location.state?.query || "";

  if (isLoading) {
    return <InvoiceDetailsSkeleton />;
  }

  return (
    <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10 ">
      <Link
        to={`..?${query}`}
        className="flex items-center mb-10 text-base font-semibold text-gray-500 gap-x-2 hover:underline"
      >
        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.342.886L2.114 5.114l4.228 4.228"
            stroke="#9277FF"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        <span>Go back</span>
      </Link>
      <InvoiceAction />
      {/* Card */}
      <div className="flex flex-col p-4 mt-8 bg-white shadow-md sm:p-10 rounded-xl dark:bg-neutral-800">
        {/* Grid */}
        <div className="flex justify-between">
          <div>
            <StatusBadge status={data?.invoice.status} />
          </div>
          {/* Col */}
          <div className="text-end">
            <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl dark:text-neutral-200">
              Invoice #
            </h2>
            <span className="block mt-1 text-gray-500 dark:text-neutral-500">
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
        <div className="grid gap-3 mt-8 sm:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
              Bill to:{"  "}
              <a
                className="text-sm font-medium text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline dark:text-blue-500"
                href="#"
              >
                {data?.invoice.clientEmail}
              </a>
            </h3>

            <p className="text-gray-800 dark:text-neutral-200">
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

          <div className="space-y-2 sm:text-end">
            {/* Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-2">
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
        <div className="p-4 mt-6 border border-gray-200 rounded-lg dark:border-neutral-700">
          <div className="hidden pt-2 pb-4 sm:grid sm:grid-cols-5">
            <div className="text-xs font-medium text-gray-500 uppercase sm:col-span-2 dark:text-neutral-500">
              Item
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Qty
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase justify-self-end dark:text-neutral-500">
              Amount
            </div>
          </div>
          <div className="border-b border-gray-200 dark:border-neutral-700"></div>

          {/* Table Rows */}

          {data?.invoice.items.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-3 gap-2 py-3 border-b border-gray-200 sm:grid-cols-5 dark:border-neutral-700 sm:border-none"
            >
              <div className="col-span-full sm:col-span-2">
                <div className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                  Item
                </div>
                <p className="pt-1 font-medium text-gray-800 dark:text-neutral-200">
                  {item.name}
                </p>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                  Qty
                </div>
                <p className="text-gray-800 dark:text-neutral-200">
                  {item.quantity}
                </p>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase sm:hidden justify-self-end dark:text-neutral-500">
                  Amount
                </div>
                <p className="text-gray-800 text-end dark:text-neutral-200">
                  R{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="flex mt-8 sm:justify-end">
          <div className="w-full max-w-2xl sm:text-end">
            <dl className="grid text-sm sm:grid-cols-5 gap-x-3">
              <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                Subtotal:
              </dt>
              <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                R{data?.invoice.amountDue}
              </dd>
            </dl>
            <dl className="grid text-sm sm:grid-cols-5 gap-x-3">
              <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                Total:
              </dt>
              <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                R{data?.invoice.amountDue}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
