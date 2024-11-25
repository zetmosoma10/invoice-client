import { z } from "zod";

const invoiceSchema = z.object({
  clientName: z
    .string()
    .min(3, "Client's name must at least have 3 characters")
    .max(50, "Client's name must  have less than 50 characters"),
  clientEmail: z.string().email("Valid email required"),
  description: z
    .string()
    .min(3, "Description must at least have 3 characters")
    .max(150, "Description must have less than 50 characters"),
  paymentTerms: z.string().min(1, "Invalid payment term"),
  senderAddress: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Post Code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  clientAddress: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Post Code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  items: z
    .array(
      z.object({
        name: z.string().min(1, "Item name is required"),
        quantity: z.number().int().positive("Quantity must be greater than 0"),
        price: z.number().positive("Price must be greater than 0"),
      })
    )
    .min(1, "At least one item is required"),
});

export default invoiceSchema;
