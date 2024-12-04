import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInvoice } from "../../services/invoiceServices";

const useUpdateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invoice) => updateInvoice(invoice),
    onMutate: async (updatedInvoice) => {
      await queryClient.cancelQueries(["invoice", updatedInvoice._id]);

      const prevInvoiceDetails = queryClient.getQueryData([
        "invoice",
        updatedInvoice._id,
      ]);

      queryClient.setQueryData(
        ["invoices", updatedInvoice._id],
        (oldInvoice) => {
          return oldInvoice ? { ...oldInvoice, ...updateInvoice } : oldInvoice;
        }
      );

      return { prevInvoiceDetails };
    },

    onError: (error, updatedInvoice, context) => {
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
