import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="max-w-[50rem] flex flex-col mx-auto size-full">
      <main id="content">
        <div className="px-4 py-10 text-center sm:px-6 lg:px-8">
          <h1 className="block font-bold text-gray-800 text-7xl sm:text-9xl dark:text-white">
            404
          </h1>
          <p className="mt-3 text-gray-600 dark:text-neutral-400">
            Oops, something went wrong.
          </p>
          <p className="text-gray-600 dark:text-neutral-400">
            Sorry, we couldn't find your page.
          </p>
          <div className="flex flex-col items-center justify-center gap-2 mt-5 sm:flex-row sm:gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg sm:w-auto gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              <svg
                className="shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
              Back to examples
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFoundPage;
