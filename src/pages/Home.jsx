import { useEffect, useState } from "react";
import Invoice from "../components/Invoice";
import Pagination from "../components/Pagination";
import { getAllInvoices } from "../services/invoicesService";
import { Link, useSearchParams } from "react-router-dom";
import InvoiceSkeleton from "../components/skeletons/InvoiceSkeleton";
import ShowEmptyIcon from "../components/common/ShowEmptyIcon";
import Dropdown from "../components/Dropdown";
import { useAuth } from "../context/AuthProvider";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const initialStatus = searchParams.get("status") || "";

  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [page, setPage] = useState(initialPage);
  const { user } = useAuth();

  const queryStr = searchParams.toString();

  const { data, isError, isLoading, error } = getAllInvoices(
    page,
    selectedStatus
  );

  useEffect(() => {
    setSearchParams((prevSearchParams) => {
      const query = {
        ...Object.fromEntries(prevSearchParams),
        page,
        status: selectedStatus,
      };

      if (!selectedStatus) delete query.status;
      if (page === 1) delete query.page;

      return query;
    });
  }, [page, selectedStatus, setSearchParams]);

  const handleSelectedStatus = (status) => {
    setSelectedStatus(status);
    setPage(1);
  };

  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
    window.scrollTo(0, 0);
  };

  const decrementPage = () => {
    setPage((prevPage) => prevPage - 1);
    window.scrollTo(0, 0);
  };

  const setCurrentPage = (page) => {
    setPage(page);
    window.scrollTo(0, 0);
  };

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
          {user && (
            <>
              <p className="text-sm text-gray-500 md:text-base">
                There are {data?.totalInvoices} total invoices in database.
              </p>
              <div className="mt-6">
                <Dropdown
                  selectedStatus={selectedStatus}
                  handleSelectedStatus={handleSelectedStatus}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {data?.totalInvoices === 0 ? (
        <ShowEmptyIcon />
      ) : isLoading ? (
        <div>
          {[1, 2, 3, 4, 5].map((item) => (
            <InvoiceSkeleton key={item} />
          ))}
        </div>
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
