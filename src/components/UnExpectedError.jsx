import Button from "./common/Button";

const UnExpectedError = ({ message }) => {
  return (
    <div className="mx-5 mt-10">
      <h2 className="text-xl font-semibold text-gray-950 dark:text-neutral-200">
        Something went wrong, please try again later
      </h2>
      <p className="pt-2 pb-3 text-gray-950 dark:text-neutral-200">
        Error: {message}
      </p>
      <Button
        onClick={() => window.location.reload()}
        className="text-white bg-blue-600 rounded-lg hover:bg-blue-500"
      >
        Reload
      </Button>
    </div>
  );
};

export default UnExpectedError;
