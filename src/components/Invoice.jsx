import { Link } from "react-router-dom";
import StatusBadge from "./common/StatusBadge";

const Invoice = ({
  id,
  status,
  query,
  clientName,
  amountDue,
  paymentDue,
  invoiceNumber,
}) => {
  return (
    <Link
      to={`invoices/${id}`}
      state={{ query }}
      className="block px-4 py-3 mb-4 text-gray-500 bg-white rounded-lg shadow-sm md:flex md:justify-between hover:shadow-md"
    >
      <div className="flex items-center justify-between md:gap-x-10">
        <span className="font-bold text-gray-950 ">
          {invoiceNumber.toUpperCase()}
        </span>
        <p>{clientName}</p>
      </div>
      <div className="flex items-center justify-between mt-6 md:mt-0">
        <div className="flex flex-col md:flex-row">
          <span>{paymentDue}</span>
          <span className="font-bold text-gray-950 md:mr-10 md:ml-24">
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
