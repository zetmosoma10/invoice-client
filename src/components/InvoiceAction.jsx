import Button from "./common/Button";

const InvoiceAction = ({ addModal, onPaid }) => {
  return (
    <div className="flex items-center justify-end p-2 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-x-3">
        <Button className="text-blue-700 bg-gray-200 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">
          Edit
        </Button>
        <Button
          onClick={addModal}
          className="text-white bg-red-500 hover:bg-red-600 focus:bg-red-600"
        >
          Delete
        </Button>
        <Button
          onClick={onPaid}
          className="text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700"
        >
          Mark as Paid
        </Button>
      </div>
    </div>
  );
};

export default InvoiceAction;
