import { Router } from "express";
import {deleteTransactionByIdController ,getTransactionByIdController, getTransactionsController, postTransactionController, putTransactinoController } from "../controller/transaction.controller.js";
import passport from "passport";

export const transactionRouter = Router();

transactionRouter.post("/", passport.authenticate('jwt', { session: false }), postTransactionController)
transactionRouter.get("/", passport.authenticate('jwt', { session: false }), getTransactionsController)
transactionRouter.get("/:id", passport.authenticate('jwt', { session: false }),getTransactionByIdController)
transactionRouter.put("/:id", passport.authenticate('jwt', { session: false }),putTransactinoController)
transactionRouter.delete("/:id", passport.authenticate('jwt', { session: false }),deleteTransactionByIdController)