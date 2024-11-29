const StatusBadge = ({ status, className }) => {
  let color;
  if (status === "Draft")
    color = "bg-LIGHT_GREY text-LIGHT_GREY dark:bg-LIGHT dark:text-LIGHT";
  if (status === "Pending")
    color = "bg-ORANGE text-ORANGE dark:bg-ORANGE dark:text-ORANGE";
  if (status === "Paid")
    color = "bg-GREEN text-GREEN dark:bg-GREEN dark:text-GREEN";

  return (
    <span
      className={`inline-flex items-center justify-center gap-x-1.5 pt-[10px] md:pt-[14px] pb-[8px] md:pb-[11px] w-[90px] md:w-[105px] rounded-md text-sm 
        font-semibold  bg-opacity-15  dark:bg-opacity-5 ${className} ${color}`}
    >
      <span
        className={`w-[8px] h-[8px] inline-block rounded-full ${color}`}
      ></span>
      {status}
    </span>
  );
};

export default StatusBadge;
