import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { useAuth } from "../context/AuthProvider";
import Invoice from "../components/Invoice";
import Pagination from "../components/Pagination";
import InvoiceSkeleton from "../components/skeletons/InvoiceSkeleton";
import ShowEmptyIcon from "../components/common/ShowEmptyIcon";
import Dropdown from "../components/Dropdown";
import InvoiceForm from "../components/invoice-form/InvoiceForm";
import Button from "../components/common/Button";
import UnExpectedError from "../components/UnExpectedError";
import useGetAllInvoices from "./../hooks/invoices/useGetAllInvoices";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const initialStatus = searchParams.get("status") || "";

  const [selectedStatus, setSelectedStatus] = useState(initialStatus);
  const [page, setPage] = useState(initialPage);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const queryStr = searchParams.toString();

  const { data, isError, isLoading, error } = useGetAllInvoices(
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

  useEffect(() => {
    if (isFormOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFormOpen]);

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

  const onFormOpen = () => {
    if (user) {
      setIsFormOpen(true);
    } else {
      navigate("auth/login", { state: { message: "You should login first" } });
    }
  };

  const onFormClose = () => {
    setIsFormOpen(false);
  };

  //! UNEXPECTED ERROR
  if (isError && (error?.message === "Network Error" || error?.status >= 500)) {
    return <UnExpectedError message={error.message} />;
  }

  return (
    <div className="my-3 max-container">
      <AnimatePresence>
        {isFormOpen && <InvoiceForm onFormClose={onFormClose} />}
      </AnimatePresence>
      <div className="flex items-start justify-between my-8">
        <div>
          <h1 className="font-bold text-2xl md:text-4xl leading-[-0.75px] dark:text-neutral-200">
            Invoices
          </h1>
          {user && (
            <>
              <p className="text-sm text-gray-500 dark:text-neutral-500 md:text-base">
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
        <Button
          onClick={onFormOpen}
          className="text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:bg-blue-700"
        >
          New Invoice
        </Button>
      </div>
      {!user && <ShowEmptyIcon />}
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
