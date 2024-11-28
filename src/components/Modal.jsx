import Button from "./common/Button";

const Modal = ({ invoiceNumber, onDelete, removeModal }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      removeModal();
    }
  };

  return (
    <section
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <div className="p-4 md:px-8 md:py-6 mx-4 bg-white rounded-lg shadow-lg max-w-[500px]">
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
              onClick={removeModal}
              className="text-blue-700 bg-gray-200 rounded-2xl hover:text-white hover:bg-gray-800 focus:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={onDelete}
              className="text-white bg-red-500 hover:bg-red-600 focus:bg-red-600 rounded-2xl"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modal;
