import { Router } from "express";
import { deleteUserByIdController, getUserByIdController ,getUsersController, postUserController, putUserController } from "../controller/user.controller.js";

export const userRouter = Router();

userRouter.post("/", postUserController);
userRouter.get("/", getUsersController);
userRouter.get("/:id", getUserByIdController);
userRouter.delete("/:id", deleteUserByIdController)

//Revisar desp de hacer el login
userRouter.put("/", putUserController)