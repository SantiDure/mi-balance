import { Router } from "express";
import { deleteUserByIdController, getUserByIdController ,getUsersController, loginUser, postUserController, putUserController } from "../controller/user.controller.js";

export const userRouter = Router();

userRouter.post("/", postUserController);
userRouter.post("/login", loginUser)
userRouter.get("/", getUsersController);
userRouter.get("/:id", getUserByIdController);
userRouter.delete("/:id", deleteUserByIdController)

//Revisar desp de hacer el login
userRouter.put("/", putUserController)