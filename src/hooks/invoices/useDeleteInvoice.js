import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInvoice } from "../../services/invoiceServices";

const useDeleteInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteInvoice(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries(["invoices"]);
      const prevInvoices = queryClient.getQueryData(["invoices"]);

      queryClient.setQueryData(["invoices"], (oldData) => {
        return oldData?.filter((invoice) => invoice._id !== id);
      });

      return { prevInvoices };
    },

    onError: (error, invoice, context) => {
      queryClient.setQueryData(["invoices"], context.prevData);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["invoices"]);
    },
  });
};

export default useDeleteInvoice;
