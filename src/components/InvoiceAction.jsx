import Button from "./common/Button";

const InvoiceAction = ({ addModal, onPaid, status, isPending, onFormOpen }) => {
  return (
    <div className="flex items-center justify-end p-2 bg-white rounded-lg shadow-md dark:bg-neutral-800">
      <div className="flex items-center gap-x-3">
        {status !== "Paid" && (
          <Button
            onClick={onFormOpen}
            disable={isPending}
            className="text-blue-700 bg-gray-200 rounded-lg hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white"
          >
            Edit
          </Button>
        )}
        <Button
          disable={isPending}
          onClick={addModal}
          className="text-white bg-red-500 rounded-lg hover:bg-red-600 focus:bg-red-600"
        >
          Delete
        </Button>
        {status !== "Paid" && (
          <Button
            disable={isPending}
            onClick={onPaid}
            className="text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:bg-blue-700"
          >
            {isPending ? (
              <div
                className="animate-spin mx-3 inline-block size-3 border-[3px] border-current border-t-transparent text-gray-50 rounded-full dark:text-gray-50"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Mark as Paid"
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default InvoiceAction;
