import { JWT_SECRET, NODE_ENV } from "../config/config.js";
import { transactionsService, userService } from "../service/index.service.js";
import jwt from "jsonwebtoken";
import { hashCompare, hashear } from "../utils/comparepassword.js";
import { transactionsManager } from "../models/transaction.schema.js";
export async function postUserController(req, res) {
  try {

    req.body.password = hashear(req.body.password);
    const user = await userService.createUserService(req.body);

    res.status(200).json({
      status: "success",
      payload: user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getUserByIdController(req, res) {
  const {id} = req.params
  const users = await userService.getUserByIdService({_id:id})
  return res.json({ status: "success", payload: users });
}

export async function getUsersController(req, res) {
    try {
      const users = await userService.getUsersService({});
      return res.status(200).json({ status: "success", payload: users });
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
}

export async function getTransactionsForMonth(req, res) {
  try {
    const { uid, month } = req.params;

    // Obtén el usuario por su ID
    const user = await userService.getUserByIdService({ _id: uid });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Establece el rango de fechas para el mes actual
    const currentYear = new Date().getFullYear();
    const startDate = new Date(currentYear, month - 1, 1); // Primer día del mes
    const endDate = new Date(currentYear, month, 0); // Último día del mes

    // Filtra las transacciones
    const transactions = await transactionsManager.find({
      _id: { $in: user.transactions },
    });

    // Filtra las transacciones basadas en el rango de fechas
    const filteredTransactions = transactions.filter((transaction) => {
      const [datePart, timePart] = transaction.date.split(", ");
      const [day, month, year] = datePart.split("/").map(Number);
      const formattedDate = new Date(
        2000 + year, // Aseguramos el formato del año completo
        month - 1,
        day
      );

      return formattedDate >= startDate && formattedDate <= endDate;
    });

    // Responde con las transacciones filtradas
    res.status(200).json({ payload: filteredTransactions });
  } catch (error) {
    console.error("Error al obtener transacciones:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}


//REVISAR
export async function putUserController(req, res) {
  const { id } = req.params;
  try {
    if (req.body.password) {
       req.body.password = hashear(req.body.password);
    }

    const updated = await userService.updateOneService(id, {
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

export async function deleteUserByIdController(req, res) {
  const { id } = req.params;
  try {
    const deletedUser = await userService.deleteOneService(id);
    if (!deletedUser) {
      return res.status(404).json({ status: "error", message: "not found" });
    }
    return res.status(200).json({ status: "success", deletedUser });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
}



export async function loginUser (req, res) {
  const { email, password } = req.body;
  try {
    const user = await userService.getUserByIdService({ email: email });
    if (!user || !(hashCompare(password, user.password))) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const payload = { id: user._id, email: user.email };
    const userInfo = {
      _id: user._id,
      name: user.name, 
      email: user.email,
      age: user.age,
      transactions:user.transactions,
      role: user.role
    }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
   
   return res
    .cookie("access_token", token, {
      httpOnly:true,
      secure:true,
      sameSite: "none", 
    })
    .json({ message: 'Login exitoso', userInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export async function getUserCurrent(req,res) {
   
  try {
    const user = await userService.getUserByIdService({_id:req.user._id});
    res.status(200).json({
      _id: user._id,
      name: user.name, 
      email: user.email,
      age: user.age,
      transactions:user.transactions,
      role: user.role
    });
  } catch (error) {
  res.status(500).json({message:error.message})   
  }
  
 
}

export async function logoutUser(req, res) {
  try {
    res
      .clearCookie("access_token", {
        httpOnly: true,
        secure: NODE_ENV === "production",
      })
      .status(200)
      .json({ message: "Logout exitoso" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
