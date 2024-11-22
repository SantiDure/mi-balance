import { Router } from "express";
import { userRouter } from "../users.router.js";
import { transactionRouter } from "../transactions.router.js";

export const apiRouter = Router();

apiRouter.use("/users", userRouter)
apiRouter.use("/transactions", transactionRouter)
