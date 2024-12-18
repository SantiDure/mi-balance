import mongoose from "mongoose";
import {randomUUID} from "node:crypto"
const collection = "users";
const userSchema = new mongoose.Schema({
    _id: {type: String, default:() => randomUUID()},
    name: {type: String, required:true},
    password: {type: String, required:true},
    email: {type: String, unique:true, required:true},
    age: {type: Number, required:true},
    transactions: {
      type: [
        {
          _id: { type: String, ref: "transactions" },
        },
      ],
      default: [], 
    },
    role: {type: String, enum: ["admin", "user"], default:"user"}
},
{
  strict: "throw",
  versionKey: false,
})

userSchema.pre("find", function (next) {
  this.populate("transactions._id");
  next();
});

export const usersManager = mongoose.model(collection, userSchema)