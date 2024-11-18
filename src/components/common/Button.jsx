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
      className={`py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent focus:outline-none disabled:opacity-50 disabled:pointer-events-none ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
