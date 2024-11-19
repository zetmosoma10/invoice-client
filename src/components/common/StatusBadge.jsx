const StatusBadge = ({ status, className }) => {
  // const colorClasses = {
  //   GREEN: "bg-GREEN text-GREEN dark:bg-GREEN dark:text-GREEN",
  //   ORANGE: "bg-ORANGE text-ORANGE dark:bg-ORANGE dark:text-ORANGE",
  //   LIGHT_GREY: "bg-LIGHT_GREY text-LIGHT_GREY dark:bg-LIGHT dark:text-LIGHT",
  // };

  let color;
  if (status === "Draft")
    color = "bg-LIGHT_GREY text-LIGHT_GREY dark:bg-LIGHT dark:text-LIGHT";
  if (status === "Pending")
    color = "bg-ORANGE text-ORANGE dark:bg-ORANGE dark:text-ORANGE";
  if (status === "Paid")
    color = "bg-GREEN text-GREEN dark:bg-GREEN dark:text-GREEN";

  return (
    <span
      className={` inline-flex items-center gap-x-1.5 pt-[14px] pb-[11px] px-[18px] rounded-md text-sm 
        font-semibold   bg-opacity-5  dark:bg-opacity-5 ${className}`}
    >
      <span
        className={`w-[5px] h-[5px] inline-block rounded-full ${color}`}
      ></span>
      {status}
    </span>
  );
};

export default StatusBadge;
