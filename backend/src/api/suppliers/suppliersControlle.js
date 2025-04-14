import { date } from "zod";
import { query } from "../../../ds.js";
import supplierSchema from "./suppliersSchema.js";

const suppliersController = {
  addSuppliers: async (req, res) => {
    try {
      const parseResult = supplierSchema.supplierAdd.safeParse(req.body);

      if (!parseResult.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          error: parseResult.error.errors,
        });
      }

      const { name, stockType, contacts, address, email } = parseResult.data;
      if (contacts.length === 0 && email.length === 0 && address.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one contact, email, or address is required.",
        });
      }
      await query("BEGIN");

      const supplierResult = await query(
        `INSERT INTO suppliers (name, stock_type) VALUES ($1, $2) RETURNING id`,
        [name, stockType || null]
      );
      const supplierId = supplierResult.rows[0].id;

      // Insert all contacts (each loop inserts one row per data point if available)
      const maxLength = Math.max(contacts.length, email.length, address.length);

      for (let i = 0; i < maxLength; i++) {
        const phone = contacts[i] || null;
        const mail = email[i] || null;
        const addr = address[i] || null;

        if (phone || mail || addr) {
          await query(
            `INSERT INTO supplier_contacts (supplier_id, phone_number, email, address)
             VALUES ($1, $2, $3, $4)`,
            [supplierId, phone, mail, addr]
          );
        }
      }

      await query("COMMIT");

      res.status(201).json({
        success: true,
        message: "Supplier and contacts added successfully",
        data: { supplierId },
      });
    } catch (err) {
      await query("ROLLBACK");

      if (
        err.code === "23505" &&
        err.constraint === "supplier_contacts_email_key"
      ) {
        return res.status(409).json({
          success: false,
          message: "Email already exists for another supplier contact",
          error: err.detail || "Duplicate email",
        });
      }

      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message || "Unexpected error occurred",
      });
    }
  },

  getSuppliers: async (req, res) => {
    try {
      // Fetch suppliers with their contacts
      const result = await query(`
        SELECT suppliers.id, suppliers.name, suppliers.stock_type, supplier_contacts.phone_number, supplier_contacts.email, supplier_contacts.address
        FROM suppliers
        LEFT JOIN supplier_contacts ON supplier_contacts.supplier_id = suppliers.id
      `);
      // Group the result by supplier
      const suppliers = result.rows.reduce((acc, row) => {
        let supplier = acc.find((s) => s.id === row.id);

        if (!supplier) {
          supplier = {
            id: row.id,
            name: row.name,
            address: [],
            contacts: [],
            stockType: row.stock_type,
            email: [],
          };
          acc.push(supplier);
        }

        if (row.address && !supplier.address.includes(row.address)) {
          supplier.address.push(row.address);
        }
        if (row.phone_number && !supplier.contacts.includes(row.phone_number)) {
          supplier.contacts.push(row.phone_number);
        }
        if (row.email && !supplier.email.includes(row.email)) {
          supplier.email.push(row.email);
        }

        return acc;
      }, []);

      res.status(200).json({
        success: true,
        data: suppliers,
        message: "The suppliers retrieved successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message || "Unexpected error occurred",
      });
    }
  },
  deleteSuppliers: async (req, res) => {
    try {
      const parseResult = supplierSchema.deleteSupplier.safeParse(req.body);

      if (!parseResult.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          error: parseResult.error.errors,
        });
      }

      const { id } = parseResult.data;

      // Check if the supplier exists
      const supplierResult = await query(
        `SELECT id FROM suppliers WHERE id = $1`,
        [id]
      );

      if (supplierResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Supplier not found",
        });
      }

      await query("BEGIN");

      await query(`DELETE FROM supplier_contacts WHERE supplier_id = $1`, [id]);

      // Delete supplier
      await query(`DELETE FROM suppliers WHERE id = $1`, [id]);

      await query("COMMIT");

      res.status(200).json({
        success: true,
        message: "Supplier deleted successfully",
      });
    } catch (err) {
      await query("ROLLBACK");
      console.error("Error deleting supplier:", err);

      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message || "Unexpected error occurred",
      });
    }
  },
  updateSupplier: async (req, res) => {
    try {
      // Validate incoming data using the Zod schema
      const parseResult = supplierSchema.updateSupplier.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          error: parseResult.error.errors,
        });
      }

      const { id, name, stockType, address, contacts, email } =
        parseResult.data;
      if (contacts.length === 0 && email.length === 0 && address.length === 0) {
        await query("ROLLBACK");
        return res.status(400).json({
          success: false,
          message: "At least one contact, email, or address is required.",
        });
      }
      // Begin transaction
      await query("BEGIN");

      const existing = await query(`SELECT id FROM suppliers WHERE id = $1`, [
        id,
      ]);
      if (existing.rows.length === 0) {
        await query("ROLLBACK");
        return res.status(404).json({
          success: false,
          message: "Supplier not found",
        });
      }
      await query(
        `UPDATE suppliers SET name = $1, stock_type = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3`,
        [name, stockType || null, id]
      );

      // Handle updating supplier contacts, address, and email
      // First, delete old entries
      await query(`DELETE FROM supplier_contacts WHERE supplier_id = $1`, [id]);

      // Insert new contacts, address, and email
      const contactInsertPromises = [];
      if (contacts && contacts.length > 0) {
        contacts.forEach((contact) => {
          contactInsertPromises.push(
            query(
              `INSERT INTO supplier_contacts (supplier_id, phone_number, email, address)
               VALUES ($1, $2, $3, $4)`,
              [
                id,
                contact,
                email ? email[0] : null,
                address ? address[0] : null,
              ]
            )
          );
        });
      }

      // Execute all insertions
      await Promise.all(contactInsertPromises);

      // Commit transaction
      await query("COMMIT");

      // Respond with success
      res.status(200).json({
        success: true,
        message: "Supplier updated successfully",
        data: { id },
      });
    } catch (err) {
      await query("ROLLBACK");
      console.error("Error updating supplier:", err);

      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message || "Unexpected error occurred",
      });
    }
  },
};

export default suppliersController;
