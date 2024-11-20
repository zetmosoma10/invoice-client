import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance.js";

const fetchData = () => {
  return axiosInstance.get("/invoices");
};

const useGetAllInvoices = () => {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: fetchData,
  });
};

export { useGetAllInvoices };
