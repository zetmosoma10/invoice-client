import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvoice } from "../../services/invoiceServices";

const useUpdateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invoice) => updateInvoice(invoice),
    onMutate: async (updatedInvoice) => {
      await queryClient.cancelQueries(["invoices"]);
      await queryClient.cancelQueries(["invoice", updatedInvoice._id]);

      const prevInvoices = queryClient.getQueryData(["invoices"]);
      const prevInvoiceDetails = queryClient.getQueryData([
        "invoice",
        updatedInvoice._id,
      ]);

      queryClient.setQueryData(["invoices"], (oldInvoices) => {
        return oldInvoices?.map((invoice) =>
          invoice.id === updateInvoice.id
            ? { ...invoice, ...updateInvoice }
            : invoice
        );
      });

      queryClient.setQueryData(
        ["invoice", updatedInvoice._id],
        (oldInvoice) => {
          return {
            ...oldInvoice,
            ...updatedInvoice,
          };
        }
      );

      return { prevInvoiceDetails, prevInvoices };
    },

    onError: (error, updatedInvoice, context) => {
      queryClient.setQueryData(["invoices"], context.prevInvoices);
      queryClient.setQueryData(
        ["invoice", updatedInvoice.id],
        context.prevInvoiceDetails
      );
    },

    onSettled: (updatedInvoice) => {
      queryClient.invalidateQueries(["invoices"]);
      queryClient.invalidateQueries(["invoice", updatedInvoice.id]);
    },
  });
};

export default useUpdateInvoice;
