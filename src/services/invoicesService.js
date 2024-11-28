import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance.js";
import { useAuth } from "../context/AuthProvider.jsx";
import _ from "lodash";

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
    queryKey: ["invoice", id],
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
  const { data } = await axiosInstance.post("/invoices", invoice);
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
        console.log({ ...invoice, id: `temp-${Date.now()}` });
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

// * UPDATE INVOICE
const updateInvoiceRequest = async (invoice) => {
  const { id } = invoice;
  const payload = _.omit(invoice, [
    "__v",
    "_id",
    "id",
    "user",
    "amountDue",
    "invoiceNumber",
    "paymentDue",
  ]);

  const { data } = await axiosInstance.patch(`/invoices/${id}`, payload);
  return data;
};

const updateInvoice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invoice) => updateInvoiceRequest(invoice),
    onMutate: async (updatedInvoice) => {
      await queryClient.cancelQueries(["invoices"]);
      await queryClient.cancelQueries(["invoice", updatedInvoice._id]);

      const prevInvoices = queryClient.getQueryData(["invoices"]);
      const prevInvoiceDetails = queryClient.getQueryData([
        "invoice",
        updatedInvoice._id,
      ]);

      queryClient.setQueryData(["invoices"], (oldInvoices) => {
        return oldInvoices?.map((invoice) =>
          invoice.id === updateInvoice.id
            ? { ...invoice, ...updateInvoice }
            : invoice
        );
      });

      queryClient.setQueryData(
        ["invoice", updatedInvoice._id],
        (oldInvoice) => {
          return {
            ...oldInvoice,
            ...updatedInvoice,
          };
        }
      );

      return { prevInvoiceDetails, prevInvoices };
    },

    onError: (error, updatedInvoice, context) => {
      console.log("Error while updating invoice");
      console.log(error);
      queryClient.setQueryData(["invoices"], context.prevInvoices);
      queryClient.setQueryData(
        ["invoice", updatedInvoice.id],
        context.prevInvoiceDetails
      );
    },

    onSettled: (updatedInvoice) => {
      queryClient.invalidateQueries(["invoices"]);
      queryClient.invalidateQueries(["invoice", updatedInvoice.id]);
    },
  });
};

export {
  getAllInvoices,
  getInvoice,
  deleteInvoice,
  markAsPaid,
  createInvoice,
  updateInvoice,
};
