import { Router } from "express";
import {deleteTransactionByIdController ,getTransactionByIdController, getTransactionsController, postTransactionController, putTransactinoController } from "../controller/transaction.controller.js";

export const transactionRouter = Router();

transactionRouter.post("/", postTransactionController)
transactionRouter.get("/", getTransactionsController)
transactionRouter.get("/:id", getTransactionByIdController)
transactionRouter.put("/:id", putTransactinoController)
transactionRouter.delete("/:id", deleteTransactionByIdController)