import { Link } from "react-router-dom";
import StatusBadge from "./common/StatusBadge";

const Invoice = () => {
  return (
    <Link
      to="#"
      className="block md:flex md:justify-between py-5 px-6 mb-4 text-gray-500 border rounded-lg border-grey-200"
    >
      <div className="flex items-center justify-between md:gap-x-10">
        <span className="text-gray-950 font-bold ">#XM123</span>
        <p>John Smith</p>
      </div>
      <div className="flex items-center justify-between mt-6 md:mt-0">
        <div className="flex flex-col md:flex-row">
          <span>Due 19 Aug 2024</span>
          <span className="text-gray-950 font-bold md:mr-10 md:ml-24">
            R1789.95
          </span>
        </div>
        <div className="md:flex md:items-center md:gap-x-5">
          <StatusBadge status="Pending" color="ORANGE" />
          <svg
            className="hidden md:block"
            width="7"
            height="10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1l4 4-4 4"
              stroke="#7C5DFA"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default Invoice;
