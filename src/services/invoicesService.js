import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance.js";
import { useAuth } from "../context/AuthProvider.jsx";

const fetchAllInvoice = async (page, status) => {
  const query = new URLSearchParams({ page });
  if (status) query.append("status", status);

  const { data } = await axiosInstance.get(`/invoices?${query.toString()}`);
  return data;
};

// * GET ALL INVOICES
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

// * DELETE INVOICE
const deleteRequest = async (id) => {
  const { data } = await axiosInstance.delete(`/invoices/${id}`);
  return data;
};

const deleteInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteRequest(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries(["invoices"]);
      const prevInvoices = queryClient.getQueryData(["invoices"]);

      queryClient.setQueryData(["invoices"], (oldData) => {
        return oldData?.filter((invoice) => invoice._id !== id);
      });

      return { prevInvoices };
    },

    onError: (error, invoice, context) => {
      queryClient.setQueryData(["invoices"], context.prevData);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["invoices"]);
    },
  });
};

// * MARK AS PAID
const markAsPaidRequest = async (id) => {
  const { data } = await axiosInstance.patch(`/invoices/${id}/markAsPaid`);
  return data;
};

const markAsPaid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => markAsPaidRequest(id),
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

// * CREATE INVOICE
const createInvoiceRequest = async (invoice) => {
  console.log("Before POST");
  const { data } = await axiosInstance.post("/invoices", invoice);
  console.log("After POST", data);
  return data;
};

const createInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invoice) => createInvoiceRequest(invoice),
    onMutate: async (invoice) => {
      await queryClient.cancelQueries(["invoices"]);

      const prevInvoices = queryClient.getQueryData(["invoices"]);

      queryClient.setQueryData(["invoices"], (oldInvoices) => {
        return [
          { ...invoice, id: `temp-${Date.now()}` },
          ...(oldInvoices || []),
        ];
      });

      return { prevInvoices };
    },
    onError: (error, invoice, context) => {
      queryClient.setQueryData(["invoices"], context.prevInvoices);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["invoices"]);
    },
  });
};

export { getAllInvoices, getInvoice, deleteInvoice, markAsPaid, createInvoice };
