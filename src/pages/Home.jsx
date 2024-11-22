import Invoice from "../components/Invoice";
import Pagination from "../components/Pagination";
import Button from "../components/common/Button";
import { getAllInvoices } from "../services/invoicesService";
import { useState } from "react";

const Home = () => {
  const [page, setPage] = useState(1);

  const { data, isError, isLoading, error } = getAllInvoices(page);

  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const decrementPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const setCurrentPage = (page) => {
    setPage(page);
  };

  if (isLoading) {
    return <h2 className="text-3xl font-semibold ">Loading...</h2>;
  }

  if (isError) {
    return <h2 className="text-3xl font-semibold ">{error?.message}</h2>;
  }

  return (
    <>
      <div className="flex items-start justify-between my-8">
        <div>
          <h1 className="font-bold text-2xl md:text-4xl leading-[-0.75px]">
            Invoices
          </h1>
          <p className="text-sm text-gray-500 md:text-base">
            There are {data?.totalInvoices} total invoices in database.
          </p>
        </div>
        <Button className="text-white bg-blue-600 hover:bg-blue-700 focus:bg-blue-700">
          New Invoice
        </Button>
      </div>
      {data?.invoices.map((invoice) => (
        <Invoice
          key={invoice._id}
          id={invoice._id}
          status={invoice.status}
          clientName={invoice.clientName}
          amountDue={invoice.amountDue}
          paymentDue={invoice.paymentDue}
          invoiceNumber={invoice.invoiceNumber}
        />
      ))}
      {data?.totalPages > 1 && (
        <Pagination
          currentPage={data?.currentPage}
          totalPages={data?.totalPages}
          incrementPage={incrementPage}
          decrementPage={decrementPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
};

export default Home;
