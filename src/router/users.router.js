import { Router } from "express";
import { getUserCurrent ,deleteUserByIdController, getUserByIdController ,getUsersController, loginUser, logoutUser, postUserController, putUserController, getTransactionsForMonth} from "../controller/user.controller.js";
import passport from "passport";
export const userRouter = Router();

userRouter.post("/login", loginUser)
userRouter.post("/logout", logoutUser)
userRouter.post("/", postUserController);
userRouter.get("/", getUsersController);
userRouter.get("/current",passport.authenticate('jwt', { session: false }),getUserCurrent)
userRouter.get("/:uid/transactions/:month/:year"
     ,    passport.authenticate('jwt', { session: false })
,getTransactionsForMonth)
userRouter.get("/:id", getUserByIdController);
userRouter.delete("/:id", deleteUserByIdController)

//Revisar desp de hacer el login
userRouter.put("/:id", putUserController)
