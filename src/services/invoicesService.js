import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance.js";
import { useAuth } from "../context/AuthProvider.jsx";

const fetchAllInvoice = async (page) => {
  const { data } = await axiosInstance.get(`/invoices?page=${page}`);
  return data;
};

const getAllInvoices = (page) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["invoices", page],
    queryFn: () => fetchAllInvoice(page),
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
