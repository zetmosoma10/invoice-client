import React from "react";

const Button = ({
  children,
  className,
  type = "button",
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg 
        border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

{
  /* <Button className="bg-gray-800 text-white hover:bg-gray-900 focus:bg-gray-900 dark:bg-white dark:text-neutral-800">
        save as Draft
      </Button>
      <Button className="bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700">
        Mark as Paid
      </Button>
      <Button className="bg-red-500 text-white hover:bg-red-600 focus:bg-red-600">
        Delete
      </Button>
      <Button className="bg-gray-200 text-blue-700 hover:text-white hover:bg-gray-800 focus:bg-gray-800">
        Edit
      </Button> */
}
