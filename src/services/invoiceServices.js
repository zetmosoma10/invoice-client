import axiosInstance from "./axiosInstance";
import _ from "lodash";

const getAllInvoices = async (page, status) => {
  const query = new URLSearchParams({ page });
  if (status) query.append("status", status);

  const { data } = await axiosInstance.get(`/invoices?${query.toString()}`);
  return data;
};

const getInvoice = async (id) => {
  const { data } = await axiosInstance.get(`/invoices/${id}`);
  return data;
};

const createInvoice = async (invoice) => {
  const { data } = await axiosInstance.post("/invoices", invoice);
  return data;
};

const deleteInvoice = async (id) => {
  const { data } = await axiosInstance.delete(`/invoices/${id}`);
  return data;
};

const updateInvoice = async (invoice) => {
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

const markAsPaid = async (id) => {
  const { data } = await axiosInstance.patch(`/invoices/${id}/markAsPaid`);
  return data;
};

export {
  markAsPaid,
  getAllInvoices,
  getInvoice,
  deleteInvoice,
  updateInvoice,
  createInvoice,
};
