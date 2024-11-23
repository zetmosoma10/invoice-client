import Button from "./common/Button";

const InvoiceAction = ({ onDelete }) => {
  return (
    <div className="p-2 flex items-center justify-end   rounded-lg bg-white shadow-md">
      <div className="flex items-center gap-x-3">
        <Button className="bg-gray-200 text-blue-700 hover:text-white hover:bg-gray-800 focus:bg-gray-800  focus:text-white">
          Edit
        </Button>
        <Button
          onClick={onDelete}
          className="bg-red-500 text-white hover:bg-red-600 focus:bg-red-600"
        >
          Delete
        </Button>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700">
          Mark as Paid
        </Button>
      </div>
    </div>
  );
};

export default InvoiceAction;
