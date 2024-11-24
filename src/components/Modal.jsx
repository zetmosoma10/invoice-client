import Button from "./common/Button";

const Modal = ({ invoiceNumber, onDelete, isLoading, removeModal }) => {
  return (
    <section className="absolute top-0 bottom-0 left-0 w-full min-h-screen px-10 bg-gray-950 bg-opacity-15">
      <div className="bg-white px-4 py-4 md:px-8 md:py-6 top-0 rounded-lg bottom-0 left-0 right-0 mt-20 mx-auto max-w-[500px]">
        <div className="p-5">
          <h3 className="font-bold text-xl md:text-2xl leading-[-0.5] text-gray-950">
            Confirm Deletion
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Are you sure you want to delete invoice{" "}
            <span className="font-bold text-gray-950">{invoiceNumber}</span>?
            This action cannot be undone.
          </p>
          <div className="flex items-center justify-end mt-5 gap-x-2">
            <Button
              disabled={isLoading}
              onClick={removeModal}
              className="text-blue-700 bg-gray-200 hover:text-white hover:bg-gray-800 focus:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={onDelete}
              className="text-white bg-red-500 hover:bg-red-600 focus:bg-red-600"
            >
              {isLoading ? (
                <div
                  className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-gray-50 rounded-full dark:text-gray-50"
                  role="status"
                  aria-label="loading"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modal;
