import StatusBadge from "./common/StatusBadge";
import Button from "./common/Button";

const StatusBar = () => {
  return (
    <div className="p-6 md:flex md:items-center md:justify-between  border rounded-lg border-gray-300">
      <div className="flex items-center justify-between md:justify-normal md:gap-x-5">
        <span className="text-gray-500">Status</span>
        <StatusBadge status="Pending" color="ORANGE" />
      </div>
      <div className="hidden  md:flex md:items-center md:gap-x-3">
        <Button className="bg-gray-200 text-blue-700 hover:text-white hover:bg-gray-800 focus:bg-gray-800">
          Edit
        </Button>
        <Button className="bg-red-500 text-white hover:bg-red-600 focus:bg-red-600">
          Delete
        </Button>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700">
          Mark as Paid
        </Button>
      </div>
    </div>
  );
};

export default StatusBar;
