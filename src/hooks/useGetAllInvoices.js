import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInstance.js";

const fetchData = async () => {
  const { data } = await axiosInstance.get("/invoices");
  return data;
};

const useGetAllInvoices = () => {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: fetchData,
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    // enabled: !!user, <Only fetch if user has logged in>
  });
};

export { useGetAllInvoices };
