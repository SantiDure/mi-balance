
import { transactionsManager } from "../models/transaction.schema.js";
import { transactionsService, userService } from "../service/index.service.js";

export async function postTransactionController(req, res) {
    try {
      const transaction = await transactionsService.createTransactionService(req.body);
      const userUpdated = await userService.updateOneService(req.user._id, {
        $push: { transactions: { _id: transaction._id } }
      })
      res.status(201).json({
        status: "success",
        payload: userUpdated,
        transaction:transaction
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
        
  
  export async function getTransactionByIdController(req, res) {
    const {id} = req.params
    const transaction = await transactionsService.getTransactionByIdService({_id:id})
    return res.json({ status: "success", payload: transaction });
  }
  
  export async function getTransactionsController(req, res) {
      try {
        const options = {
          page: 1,
          limit: 10,}
        const transactions = await transactionsManager.paginate({},options);
        return res.status(200).json({ status: "success", payload: transactions });
      } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
      }
  }
  
  
  export async function putTransactinoController(req, res) {
    const {id} = req.params
    try {
      const updated = await transactionsService.updateOneService(id, {
        $set: req.body,
      });
  
      if (!updated) {
        return res
          .status(404)
          .json({ status: "error", message: "usuario no encontrado" });
      }
  
      res.json({ status: "success", payload: updated });
    } catch (error) {
      res.status(400).json({ status: "error", message: error.message });
    }
  }
  
  export async function deleteTransactionByIdController(req, res) {
    const { id } = req.params;
    try {
      const updateUser = await userService.updateOneService(req.user._id,   { $pull: { transactions: { _id: id } }  })
      if(!updateUser) {
       return res.status(403).json({status:error, message:"prohibido"})
      }
      const deletedTransaction = await transactionsService.deleteOneService(id);
      if (!deletedTransaction) {
        return res.status(404).json({ status: "error", message: "not found" });
      }
      return res.status(200).json({ status: "success", deletedTransaction });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  }
  