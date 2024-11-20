import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance.js";

const fetchData = async (id) => {
  const { data } = await axiosInstance.get(`/invoices/${id}`);
  return data;
};

const useGetInvoice = (id) => {
  return useQuery({
    queryKey: ["invoices", id],
    queryFn: () => fetchData(id),
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    // enabled: !!user, <Only fetch if user has logged in>
  });
};

export { useGetInvoice };
