import { LOCAL_URL, MONGODB_CNX_STR, NODE_ENV, PORT, VERCEL_URL } from "../config/config.js";
import express from "express"
import { apiRouter } from "../router/api/apiRouter.js";
import mongoose from "mongoose";
import passport from "passport";
import passportConfig from '../middlewares/passport.config.js';
import cookieParser from "cookie-parser";
import cors from "cors"
export class Server{
    server;
    constructor(){
        this.port = PORT,
        this.app = express()
        const allowedOrigins = [
          LOCAL_URL,  
          VERCEL_URL,
        ];
          
        this.app.use(cors({
          origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
              callback(null, true);
            } else {
              callback(new Error("Not allowed by CORS"));
            }
          },
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
          credentials: true,
        }));

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser())
        this.app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).send(err.stack);
          });
        this.app.use("/api",apiRouter); 
        passportConfig(passport);
        this.app.use(passport.initialize());
    }
    connect() {
        return new Promise((resolve, reject) => {
          this.server = this.app.listen(this.port, () => {
            console.log(process.env)
            resolve(console.log(`listen ${PORT} - ${NODE_ENV}`));
          });
        });
      }
      async connectDb() {
        await mongoose.connect(MONGODB_CNX_STR, { socketTimeoutMS: 45_000 });
        return console.log(`DB conectada`);
      }
}