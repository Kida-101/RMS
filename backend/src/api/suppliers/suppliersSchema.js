import { z } from "zod";

const suppliersSchema = {
  supplierAdd: z.object({
    name: z
      .string()
      .min(1, "Supplier name is required")
      .max(100, "Supplier name cannot exceed 100 characters"),
    stockType: z
      .string()
      .max(50, "Stock type cannot exceed 50 characters")
      .optional(),
    contacts: z
      .array(
        z
          .string()
          .min(1, "Phone number is required")
          .max(20, "Phone number cannot exceed 20 characters")
      )
      .optional()
      .default([]),
    address: z
      .array(z.string().min(3).max(100, "Address cannot exceed 100 characters"))
      .optional()
      .default([]),
    email: z
      .array(
        z
          .string()
          .email("Invalid email")
          .max(100, "Email cannot exceed 100 characters")
      )
      .optional()
      .default([]),
  }),
  deleteSupplier: z.object({
    id: z
      .number()
      .int("ID must be an integer")
      .positive("ID must be a positive number")
      .min(1, "ID must be greater than 0"),
  }),
  updateSupplier: z.object({
    id: z
      .number()
      .int("ID must be an integer")
      .positive("ID must be a positive number")
      .min(1, "ID must be greater than 0"),
    name: z
      .string()
      .min(1, "Supplier name is required")
      .max(100, "Supplier name cannot exceed 100 characters"),
    stockType: z
      .string()
      .max(50, "Stock type cannot exceed 50 characters")
      .optional(),
    address: z
      .array(
        z.string().max(100, "Address cannot exceed 100 characters").optional()
      )
      .max(5, "Address array cannot exceed 5 items"),
    contacts: z
      .array(
        z
          .string()
          .max(20, "Phone number cannot exceed 20 characters")
          .optional()
      )
      .max(10, "Contacts array cannot exceed 10 items"),
    email: z
      .array(
        z
          .string()
          .email("Invalid email")
          .max(100, "Email cannot exceed 100 characters")
      )
      .max(5, "Email array cannot exceed 5 items")
      .optional()
      .default([]),
  }),
};

export default suppliersSchema;
