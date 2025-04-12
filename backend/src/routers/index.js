import { Router } from "express";
import suppliersRouter from "../api/suppliers/suppliersRouter.js";
const appRouter = Router();

appRouter.use("/suppliers", suppliersRouter);

export default appRouter;
