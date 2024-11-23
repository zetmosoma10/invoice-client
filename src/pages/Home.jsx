import { useEffect, useState } from "react";
import Invoice from "../components/Invoice";
import Pagination from "../components/Pagination";
import Button from "../components/common/Button";
import { getAllInvoices } from "../services/invoicesService";
import { useSearchParams } from "react-router-dom";
import InvoiceSkeleton from "../components/skeletons/InvoiceSkeleton";
import ShowEmptyIcon from "../components/common/ShowEmptyIcon";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [page, setPage] = useState(initialPage);

  const queryStr = searchParams.toString();
  const { data, isError, isLoading, error } = getAllInvoices(page);

  useEffect(() => {
    setSearchParams({ page });
  }, [page, setSearchParams]);

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
    return (
      <div className="mt-28">
        {[1, 2, 3, 4, 5].map((item) => (
          <InvoiceSkeleton key={item} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <h2 className="text-3xl font-semibold ">{error?.message}</h2>;
  }

  return (
    <div className="min-h-screen ">
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

      {data?.totalInvoices === 0 ? (
        <ShowEmptyIcon />
      ) : (
        data?.invoices.map((invoice) => (
          <Invoice
            key={invoice._id}
            id={invoice._id}
            query={queryStr}
            status={invoice.status}
            clientName={invoice.clientName}
            amountDue={invoice.amountDue}
            paymentDue={invoice.paymentDue}
            invoiceNumber={invoice.invoiceNumber}
          />
        ))
      )}
      {data?.totalPages > 1 && (
        <Pagination
          currentPage={data?.currentPage}
          totalPages={data?.totalPages}
          incrementPage={incrementPage}
          decrementPage={decrementPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Home;
