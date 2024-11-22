import mongoose from "mongoose";
import {randomUUID} from "node:crypto"
const collection = "transactions";
const transactionSchema = new mongoose.Schema({
  _id: { type: String, default: () => randomUUID() },
  category: { type: String, default: "unknow" },
  amount: { type: Number, required: true },
  description: { type: String },
  type: { type: String, enum: ["in", "out"], required: true },

},
  {
    strict: "throw",
    versionKey: false,
  })

export const transactionsManager = mongoose.model(collection, transactionSchema)