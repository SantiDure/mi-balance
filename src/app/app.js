import { LOCAL_URL, MONGODB_CNX_STR, NODE_ENV, PORT, VERCEL_URL } from "../config/config.js";
import express from "express"
import { apiRouter } from "../router/api/apiRouter.js";
import mongoose from "mongoose";
import passport from "passport";
import passportConfig from '../middlewares/passport.config.js';
import cookieParser from "cookie-parser";
import cors from "cors"
export class Server {
  server;
  constructor() {
    this.port = PORT,
      this.app = express()

    this.app.use(cors({
      origin: NODE_ENV === "production"? "https://mi-balance.vercel.app" : LOCAL_URL,
      credentials:true
    }))
    // this.app.options("*", cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser())
    this.app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send(err.stack);
    });
    this.app.use("/api", apiRouter);
    passportConfig(passport);
    this.app.use(passport.initialize());
  }
  connect() {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(this.port, () => {

        resolve(console.log(`listen ${PORT} - ${NODE_ENV}`));
      });
    });
  }
  async connectDb() {
    await mongoose.connect(MONGODB_CNX_STR, { socketTimeoutMS: 45_000 });
    return console.log(`DB conectada`);
  }
}