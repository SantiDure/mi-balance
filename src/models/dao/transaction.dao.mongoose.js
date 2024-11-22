import { transactionsManager } from "../transaction.schema.js";


export class TransactionsDaoMongoose {
    async create(data) {
      const transaction = (await transactionsManager.create(data)).toObject();
  
      return transaction;
    }
    async readOne(query) {
      return await transactionsManager.findOne(query).lean();
    }
    async readMany(query) {
      const transactions = await transactionsManager.find(query);
  
      return transactions;
    }
    async updateOne(id, query) {
      return await transactionsManager
        .findOneAndUpdate({ _id: id }, query, { new: true })
        .lean();
    }
  
    async deleteOne(id) {
      const transactionToDelete = await transactionsManager
        .findOneAndDelete({ _id: id })
        .lean();
      return transactionToDelete;
    }
}