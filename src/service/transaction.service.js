export class TransactionRepository {
    constructor(dao) {
      this.dao = dao;
    }
    async createTransactionService(data) {
      const transaction = await this.dao.create(data);
      return transaction;
    }
  
    async getTransactionsService(query) {
      return await this.dao.readMany(query);
    }
  
    async getTransactionByIdService(query) {
      const transactionForId = await this.dao.readOne(query);
      return transactionForId;
    }
  
    async updateOneService(id, query) {
      return this.dao.updateOne(id, query);
    }
  
    async deleteOneService(id) {
      return this.dao.deleteOne(id);
    }
  }