import Invoice from "../components/Invoice";
import Button from "../components/common/Button";
import { getAllInvoices } from "../services/invoicesService";

const Home = () => {
  const { data, isError, isLoading, error } = getAllInvoices();

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
    </>
  );
};

export default Home;
