import dotenv from "dotenv";

dotenv.config()
export const PORT = process.env.PORT
export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR
export const JWT_SECRET=process.env.JWT_SECRET
