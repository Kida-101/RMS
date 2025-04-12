import { Router } from "express";
import suppliersController from "./suppliersControlle.js";
const suppliersRouter = Router();
suppliersRouter.post("/add", suppliersController.addSuppliers);
suppliersRouter.get("/getAll", suppliersController.getSuppliers);
suppliersRouter.delete("/deleteSupplier", suppliersController.deleteSuppliers);
suppliersRouter.put("/update", suppliersController.updateSupplier);
export default suppliersRouter;
