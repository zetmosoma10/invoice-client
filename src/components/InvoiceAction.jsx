import Button from "./common/Button";

const InvoiceAction = ({ addModal, onPaid, status }) => {
  return (
    <div className="flex items-center justify-end p-2 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-x-3">
        {status !== "Paid" && (
          <Button className="text-blue-700 bg-gray-200 rounded-lg hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">
            Edit
          </Button>
        )}
        <Button
          onClick={addModal}
          className="text-white bg-red-500 rounded-lg hover:bg-red-600 focus:bg-red-600"
        >
          Delete
        </Button>
        {status !== "Paid" && (
          <Button
            onClick={onPaid}
            className="text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:bg-blue-700"
          >
            Mark as Paid
          </Button>
        )}
      </div>
    </div>
  );
};

export default InvoiceAction;
