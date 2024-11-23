import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance.js";
import { useAuth } from "../context/AuthProvider.jsx";

const fetchAllInvoice = async (page, status) => {
  const query = new URLSearchParams({ page });
  if (status) query.append("status", status);

  const { data } = await axiosInstance.get(`/invoices?${query.toString()}`);
  return data;
};

const getAllInvoices = (page, status) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["invoices", page, status],
    queryFn: () => fetchAllInvoice(page, status),
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
