import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markAsPaid } from "../../services/invoiceServices";

const useMarkAsPaid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => markAsPaid(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries(["invoices", id]);
      const prevInvoices = queryClient.getQueryData(["invoices", id]);

      queryClient.setQueryData(["invoices", id], (oldData) => {
        return {
          ...oldData,
          status: "Paid",
        };
      });

      return { prevInvoices, id };
    },

    onError: (error, invoice, context) => {
      queryClient.setQueryData(["invoices", context.id], context.prevData);
    },

    onSettled: (id) => {
      queryClient.invalidateQueries(["invoices"]);
      queryClient.invalidateQueries(["invoice", id]);
    },
  });
};

export default useMarkAsPaid;
