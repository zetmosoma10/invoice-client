import { useGetAllInvoices } from "../services/useGetAllInvoices";
import Invoice from "../components/Invoice";
import Button from "../components/common/Button";

const Home = () => {
  const { data, isError, isLoading, error } = useGetAllInvoices();

  return (
    <>
      <div className="my-8 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-2xl md:text-4xl leading-[-0.75px]">
            Invoices
          </h1>
          <p className="text-sm md:text-base text-gray-500">
            There are {data?.totalInvoices} total invoices in database.
          </p>
        </div>
        <Button className="bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700">
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
    </>
  );
};

export default Home;
