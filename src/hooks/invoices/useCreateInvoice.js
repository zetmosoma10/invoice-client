import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createInvoice } from "../../services/invoiceServices";

const useCreateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invoice) => createInvoice(invoice),
    onMutate: async (invoice) => {
      await queryClient.cancelQueries(["invoices"]);

      const prevInvoices = queryClient.getQueryData(["invoices"]);

      queryClient.setQueryData(["invoices"], (oldInvoices) => {
        return [
          { ...invoice, id: `temp-${Date.now()}` },
          ...(oldInvoices || []),
        ];
      });

      return { prevInvoices };
    },
    onError: (error, invoice, context) => {
      queryClient.setQueryData(["invoices"], context.prevInvoices);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["invoices"]);
    },
  });
};

export default useCreateInvoice;
