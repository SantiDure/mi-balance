import mongoose from "mongoose";
import {randomUUID} from "node:crypto"
const collection = "transactions";
const transactionSchema = new mongoose.Schema({
  _id: { type: String, default: () => randomUUID() },
  category: { type: String, default: "unknow" },
  amount: { type: Number, required: true },
  description: { type: String },
  type: { type: String, enum: ["ingreso", "gasto"], required: true },
  date: {
    type: String,
      default: () => {
        return new Intl.DateTimeFormat("es-AR", {
          dateStyle: "short",
          timeStyle: "medium",
          timeZone: "America/Argentina/Buenos_Aires",
        }).format(new Date())
  }}
},
  {
    strict: "throw",
    versionKey: false,
  })

export const transactionsManager = mongoose.model(collection, transactionSchema)