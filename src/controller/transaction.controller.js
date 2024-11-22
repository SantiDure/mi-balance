import { TransactionsService } from "../service/index.service.js";

export async function postTransactionController(req, res) {
    try {
  
      const transaction = await TransactionsService.createTransactionService(req.body);
  
      res.status(201).json({
        status: "success",
        payload: transaction,
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  export async function getTransactionByIdController(req, res) {
    const {id} = req.params
    const transaction = await TransactionsService.getTransactionByIdService({_id:id})
    return res.json({ status: "success", payload: transaction });
  }
  
  export async function getTransactionsController(req, res) {
      try {
        const transactions = await TransactionsService.getTransactionsService({});
        return res.status(200).json({ status: "success", payload: transactions });
      } catch (error) {
        return res.status(500).json({ status: "error", message: error.message });
      }
  }
  
  //REVISAR
  export async function putTransactinoController(req, res) {
    try {
  
      const updated = await TransactionsService.updateOneService(req.transaction._id, {
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
      const deletedTransaction = await TransactionsService.deleteOneService(id);
      if (!deletedTransaction) {
        return res.status(404).json({ status: "error", message: "not found" });
      }
      return res.status(200).json({ status: "success", deletedTransaction });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  }
  