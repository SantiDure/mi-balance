import mongoose from "mongoose";
import  mongoosePaginate  from "mongoose-paginate-v2";
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



  transactionSchema.pre("save", function (next) {
    if (this.description === null || this.description === "null") {
      this.description = "Sin descripción";
    }
    next();
  });

  transactionSchema.plugin(mongoosePaginate)

export const transactionsManager = mongoose.model(collection, transactionSchema)