import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance.js";
import { useAuth } from "../context/AuthProvider.jsx";

const fetchAllInvoice = async () => {
  const { data } = await axiosInstance.get("/invoices");
  return data;
};

const getAllInvoices = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["invoices"],
    queryFn: fetchAllInvoice,
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    enabled: !!user,
  });
};

// * GET INVOICE BY ID
const fetchInvoice = async (id) => {
  const { data } = await axiosInstance.get(`/invoices/${id}`);
  return data;
};

const getInvoice = (id) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["invoices", id],
    queryFn: () => fetchInvoice(id),
    staleTime: 10 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    enabled: !!user,
  });
};

export { getAllInvoices, getInvoice };
