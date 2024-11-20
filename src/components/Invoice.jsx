import { Link } from "react-router-dom";
import StatusBadge from "./common/StatusBadge";

const Invoice = ({
  status,
  clientName,
  amountDue,
  paymentDue,
  invoiceNumber,
}) => {
  return (
    <Link
      to="#"
      className="block bg-white md:flex md:justify-between py-3 px-4 mb-4 text-gray-500  rounded-lg shadow-sm hover:shadow-md"
    >
      <div className="flex items-center justify-between md:gap-x-10">
        <span className="text-gray-950 font-bold ">
          {invoiceNumber.toUpperCase()}
        </span>
        <p>{clientName}</p>
      </div>
      <div className="flex items-center justify-between mt-6 md:mt-0">
        <div className="flex flex-col md:flex-row">
          <span>{paymentDue}</span>
          <span className="text-gray-950 font-bold md:mr-10 md:ml-24">
            R{amountDue}
          </span>
        </div>
        <div className="md:flex md:items-center md:gap-x-5">
          <StatusBadge status={status} />
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
