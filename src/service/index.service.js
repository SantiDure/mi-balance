import { TransactionsDaoMongoose } from "../models/dao/transaction.dao.mongoose.js";
import { UsersDaoMongoose } from "../models/dao/user.dao.mongoose.js";
import { TransactionRepository } from "./transaction.service.js";
import { UserRepository } from "./user.service.js";


export const userService = new UserRepository(new UsersDaoMongoose());
export const transactionsService = new TransactionRepository(new TransactionsDaoMongoose());
