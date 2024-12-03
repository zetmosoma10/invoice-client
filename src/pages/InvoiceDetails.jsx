import { useState, useEffect } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import StatusBadge from "../components/common/StatusBadge";
import InvoiceAction from "../components/InvoiceAction";
import InvoiceDetailsSkeleton from "../components/skeletons/InvoiceDetailsSkeleton";
import Modal from "../components/Modal";
import InvoiceForm from "./../components/invoice-form/InvoiceForm";
import Button from "../components/common/Button";
import UnExpectedError from "../components/UnExpectedError";
import useGetInvoice from "./../hooks/invoices/useGetInvoice";
import useDeleteInvoice from "./../hooks/invoices/useDeleteInvoice";
import useMarkAsPaid from "./../hooks/invoices/useMarkAsPaid";

const InvoiceDetails = () => {
  const [modal, setModal] = useState(false);
  const [isInvoiceFormOpen, setIsInvoiceFormOpen] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    data,
    isLoading: isInvoicePending,
    isError: isInvoiceError,
    error: invoiceError,
  } = useGetInvoice(id);

  const { mutate: deleteMutation, isPending: isDeletePending } =
    useDeleteInvoice();
  const { mutate: markAsPaidMutation, isPending } = useMarkAsPaid();

  useEffect(() => {
    if (modal || isInvoiceFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modal, isInvoiceFormOpen]);

  const onDelete = (invoiceId) => {
    deleteMutation(invoiceId, {
      onSuccess: () => {
        setModal(false);
        navigate("/", { replace: true });
      },
      onError: (error) => {
        if (!error?.status || error?.status >= 500) {
          toast.error(`${error.message}. Please try again later.`);
        } else {
          toast.error(error?.response?.data.message);
        }
      },
    });
  };

  const onPaid = (invoiceId) => {
    markAsPaidMutation(invoiceId, {
      onSuccess: () => {
        toast.success("Invoice Paid successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const onFormOpen = () => {
    setIsInvoiceFormOpen(true);
  };

  const onFormClose = () => {
    setIsInvoiceFormOpen(false);
  };

  const addModal = () => {
    setModal(true);
  };

  const removeModal = () => {
    setModal(false);
  };

  if (isInvoicePending) {
    return <InvoiceDetailsSkeleton />;
  }

  if (isInvoiceError && invoiceError.status === 404) {
    return navigate("/not-found", { replace: true });
  }

  if (
    (isInvoiceError && !invoiceError?.status) ||
    invoiceError?.status >= 500
  ) {
    return <UnExpectedError message={invoiceError.message} />;
  }

  const query = location.state?.query || "";

  return (
    <div className="px-4 my-4 max-container sm:px-6 lg:px-8 sm:my-10">
      <AnimatePresence>
        {isInvoiceFormOpen && (
          <InvoiceForm onFormClose={onFormClose} invoice={data?.invoice} />
        )}
      </AnimatePresence>
      <Link
        to={`..?${query}`}
        className="flex items-center mb-10 text-base font-semibold text-gray-500 dark:text-neutral-500 gap-x-2 hover:underline"
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
      <InvoiceAction
        isPending={isPending}
        status={data?.invoice.status}
        onPaid={() => onPaid(id)}
        onFormOpen={onFormOpen}
        addModal={addModal}
      />
      {/* Card */}
      <AnimatePresence>
        {modal && (
          <Modal removeModal={removeModal}>
            <div className="p-5">
              <h3 className="font-bold text-xl md:text-2xl leading-[-0.5] text-gray-950 dark:text-neutral-200">
                Confirm Deletion
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-neutral-200">
                Are you sure you want to delete invoice{" "}
                <span className="font-bold text-gray-950 dark:text-neutral-200">
                  #{data?.invoice.invoiceNumber.toUpperCase()}
                </span>
                ? This action cannot be undone.
              </p>
              <div className="flex items-center justify-end mt-5 gap-x-2">
                <Button
                  onClick={removeModal}
                  className="text-blue-700 bg-gray-200 rounded-2xl hover:text-white hover:bg-gray-800 focus:bg-gray-800"
                >
                  Cancel
                </Button>
                <Button
                  disabled={isDeletePending}
                  onClick={() => onDelete(id)}
                  className="text-white bg-red-500 hover:bg-red-600 focus:bg-red-600 rounded-2xl"
                >
                  {isDeletePending ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
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
            <span className="block mt-1 font-semibold text-gray-500 dark:text-neutral-500">
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
            {/* <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
              Bill to:{"  "}
              <a
                href={`mailto:${data?.invoice.clientEmail}`}
                className="text-sm font-semibold text-blue-500 cursor-pointer hover:underline"
              >
                {data?.invoice.clientEmail}
              </a>
            </h3> */}
            <h3 className="mt-3 text-lg font-semibold text-gray-800 dark:text-neutral-200">
              Bill to:{" "}
              <span className="font-medium text-gray-500 dark:text-neutral-500">
                {data?.invoice.clientName}
              </span>
            </h3>
            <address className="not-italic text-gray-500 dark:text-neutral-500">
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
              <div className="">
                <span className="block font-semibold text-gray-800 sm:mr-2 sm:inline-block dark:text-neutral-200">
                  Invoice date:
                </span>
                <span className="text-gray-500 dark:text-neutral-500">
                  {dayjs(data?.invoice.invoiceDate).format("DD MMM, YYYY")}
                </span>
              </div>
              <div className="">
                <span className="block font-semibold text-gray-800 sm:inline-block sm:mr-2 dark:text-neutral-200">
                  Due date:
                </span>
                <span className="text-gray-500 dark:text-neutral-500">
                  {data?.invoice.paymentDue}
                </span>
              </div>

              {data?.invoice.status === "Paid" && (
                <div className="">
                  <span className="block font-semibold text-blue-600 sm:inline-block sm:mr-2 dark:text-neutral-200">
                    Paid At:
                  </span>
                  <span className="text-gray-500 dark:text-neutral-500">
                    {dayjs(data?.invoice.paidAt).format("DD MMM, YYYY")}
                  </span>
                </div>
              )}
              <div className="">
                <span className="block font-semibold text-gray-800 sm:inline-block sm:mr-2 dark:text-neutral-200">
                  Email:
                </span>
                <a
                  href={`mailto:${data?.invoice.clientEmail}`}
                  className="text-blue-600 dark:text-blue-600 hover:underline"
                >
                  {data?.invoice.clientEmail}
                </a>
              </div>
            </div>
            {/* End Grid */}
          </div>
          {/* Col */}
        </div>
        {/* End Grid */}

        {/* Invoice Table */}
        <div className="p-4 mt-8 border border-gray-200 divide-y divide-gray-200 rounded-lg dark:divide-neutral-700 md:mt-6 dark:border-neutral-700">
          <div className="hidden pt-2 pb-4 sm:grid sm:grid-cols-3">
            <div className="text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Item
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase justify-self-center dark:text-neutral-500">
              Qty
            </div>
            <div className="text-xs font-medium text-gray-500 uppercase justify-self-end dark:text-neutral-500">
              Amount
            </div>
          </div>

          {/* Table Rows */}

          {data?.invoice.items.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-3 gap-2 py-3 border-gray-200 dark:border-neutral-700"
            >
              <div>
                <div className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                  Item
                </div>
                <p className="pt-1 font-medium text-gray-800 dark:text-neutral-200">
                  {item.name}
                </p>
              </div>
              <div className="justify-self-center">
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
        <div className="flex justify-end mt-8">
          <div className="space-y-2 text-end">
            <div className="grid grid-cols-2">
              <span className="font-medium text-gray-800 dark:text-neutral-500">
                Subtotal:
              </span>
              <span className="text-gray-500 dark:text-neutral-200">
                R{data?.invoice.amountDue}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium text-gray-800 dark:text-neutral-500">
                Total:
              </span>
              <span className="text-gray-500 dark:text-neutral-200">
                R{data?.invoice.amountDue}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium text-gray-800 dark:text-neutral-500">
                Tax:
              </span>
              <span className="text-gray-500 dark:text-neutral-200">
                R{(data?.invoice.amountDue * 0.17).toFixed(2)}
              </span>
            </div>
            <div className="grid grid-cols-2">
              <span className="font-medium text-gray-800 dark:text-neutral-500">
                Amount Paid:
              </span>
              <span className="text-gray-500 dark:text-neutral-200">
                {data?.invoice.status === "Paid"
                  ? `R${(
                      data?.invoice.amountDue -
                      data?.invoice.amountDue * 0.17
                    ).toFixed(2)}`
                  : "R0"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetails;
