import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance.js";
import { decodeJwt } from "./auth.js";

const currentUser = decodeJwt();

const fetchAllInvoice = async () => {
  const { data } = await axiosInstance.get("/invoices");
  return data;
};

const getAllInvoices = () => {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: fetchAllInvoice,
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    enabled: !!currentUser,
  });
};

// * GET INVOICE BY ID
const fetchInvoice = async (id) => {
  const { data } = await axiosInstance.get(`/invoices/${id}`);
  return data;
};

const getInvoice = (id) => {
  return useQuery({
    queryKey: ["invoices", id],
    queryFn: () => fetchInvoice(id),
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    enabled: !!currentUser,
  });
};

export { getAllInvoices, getInvoice };
