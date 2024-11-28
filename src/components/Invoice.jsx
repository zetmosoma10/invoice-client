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
      className="grid grid-cols-2 grid-rows-2 px-4 py-3 mb-4 text-gray-500 bg-white rounded-lg shadow-sm gap-y-4 md:grid-rows-1 md:gap-y-0 md:grid-cols-5 md:items-center hover:shadow-md"
    >
      <span className="font-bold text-gray-950 ">
        #{invoiceNumber.toUpperCase()}
      </span>
      <p className="justify-self-end md:justify-self-start">{clientName}</p>
      <span>{paymentDue}</span>
      <span className="font-bold justify-self-end md:justify-self-start text-gray-950 ">
        R{amountDue}
      </span>
      <div className="md:flex md:items-center">
        <StatusBadge status={status} />
        <svg
          className="hidden md:block md:ml-5"
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
    </Link>
  );
};

export default Invoice;
