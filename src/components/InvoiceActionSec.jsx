import Button from "./common/Button";

const InvoiceActionSec = () => {
  return (
    <div className="flex items-center justify-end py-5 px-6 border border-gray-300 gap-x-3 md:hidden">
      <Button className="bg-gray-200 text-blue-700 hover:text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-white">
        Edit
      </Button>
      <Button className="bg-red-500 text-white hover:bg-red-600 focus:bg-red-600">
        Delete
      </Button>
      <Button className="bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700">
        Mark as Paid
      </Button>
    </div>
  );
};

export default InvoiceActionSec;
