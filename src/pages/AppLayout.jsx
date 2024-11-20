import "preline/preline";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useGetAllInvoices } from "../services/useGetAllInvoices";
import Invoice from "../components/Invoice";
import Button from "./../components/common/Button";
Button;

function AppLayout() {
  const location = useLocation();

  const { data, isError, isLoading, error } = useGetAllInvoices();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <main className="bg-slate-50">
      <NavBar />
      <section className=" max-w-[990px] mx-auto">
        <div className="my-8 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl md:text-4xl leading-[-0.75px]">
              Invoices
            </h1>
            <p className="text-sm md:text-base text-gray-500">
              There are {data?.data.totalInvoices} total invoices in database.
            </p>
          </div>
          <Button className="bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700">
            New Invoice
          </Button>
        </div>
        {data?.data.invoices.map((invoice) => (
          <Invoice
            status={invoice.status}
            clientName={invoice.clientName}
            amountDue={invoice.amountDue}
            paymentDue={invoice.paymentDue}
            invoiceNumber={invoice.invoiceNumber}
          />
        ))}
      </section>
    </main>
  );
}

export default AppLayout;
