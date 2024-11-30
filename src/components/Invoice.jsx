import { Link } from "react-router-dom";
import { motion } from "motion/react";
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
    <motion.div
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`invoices/${id}`}
        state={{ query }}
        className="grid grid-cols-2 grid-rows-2 px-4 py-3 mb-4 text-gray-500 bg-white rounded-lg shadow-sm dark:bg-neutral-800 gap-y-4 md:grid-rows-1 md:gap-y-0 md:grid-cols-5 md:items-center hover:shadow-md"
      >
        <span className="font-bold text-gray-950 dark:text-neutral-200">
          #{invoiceNumber.toUpperCase()}
        </span>
        <p className="text-gray-500 justify-self-end md:justify-self-start dark:text-neutral-500">
          {clientName}
        </p>
        <span className="text-gray-500 dark:text-neutral-500">
          {paymentDue}
        </span>
        <span className="font-bold justify-self-end md:justify-self-start text-gray-950 dark:text-neutral-200">
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
    </motion.div>
  );
};

export default Invoice;
