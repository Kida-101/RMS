import { Router } from "express";
import suppliersRouter from "../api/suppliers/suppliersRouter.js";
import Casher from '../api/Casher/Casher.js';
import Kitchen from '../api/Kitchen/Kitchen.js';
const appRouter = Router();

appRouter.use("/suppliers", suppliersRouter);
appRouter.use('/casher',Casher)
appRouter.use('/Kitchen',Kitchen)
export default appRouter;
