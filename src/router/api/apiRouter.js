import { Router } from "express";
import { userRouter } from "../users.router.js";
import { transactionRouter } from "../transactions.router.js";
import passport from "passport";

export const apiRouter = Router();

apiRouter.use("/users", userRouter)
apiRouter.use("/transactions", transactionRouter)
//apiRouter.use((req, res, next) => {
    //passport.authenticate('jwt', { session: false }, (err, user, info) => {
//       if (err) return res.status(500).json({ message: 'Error en el servidor' });
//       if (!user) return res.status(401).json({ message: 'No autorizado' });
//       req.user = user;
//       next();
//     })(req, res, next);
//   });
  