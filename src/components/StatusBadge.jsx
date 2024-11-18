const StatusBadge = ({ status, color }) => {
  const colorClasses = {
    GREEN: "bg-GREEN text-GREEN dark:bg-GREEN dark:text-GREEN",
    ORANGE: "bg-ORANGE text-ORANGE dark:bg-ORANGE dark:text-ORANGE",
    LIGHT_GREY: "bg-LIGHT_GREY text-LIGHT_GREY dark:bg-LIGHT dark:text-LIGHT",
  };

  return (
    <span
      className={`${colorClasses[color]} inline-flex items-center gap-x-1.5 pt-[14px] pb-[11px] px-[18px] rounded-md text-sm 
        font-semibold   bg-opacity-5  dark:bg-opacity-5`}
    >
      <span
        className={`size-1.5 inline-block rounded-full ${colorClasses[color]}`}
      ></span>
      {status}
    </span>
  );
};

export default StatusBadge;
