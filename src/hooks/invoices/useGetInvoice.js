import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthProvider";
import { getInvoice } from "../../services/invoiceServices";

const useGetInvoice = (id) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoice(id),
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    enabled: !!user,
  });
};

export default useGetInvoice;
