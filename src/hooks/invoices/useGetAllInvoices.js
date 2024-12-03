import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthProvider";
import { getAllInvoices } from "../../services/invoiceServices";

// * GET ALL INVOICES
const useGetAllInvoices = (page, status) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["invoices", page, status],
    queryFn: () => getAllInvoices(page, status),
    staleTime: 10 * 60 * 1000,
    enabled: !!user,
  });
};

export default useGetAllInvoices;
