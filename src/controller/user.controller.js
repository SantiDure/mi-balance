import { JWT_SECRET, NODE_ENV } from "../config/config.js";
import { userService } from "../service/index.service.js";
import jwt from "jsonwebtoken";
import { hashCompare, hashear } from "../utils/comparepassword.js";
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

//REVISAR
export async function putUserController(req, res) {
  try {
    if (req.body.password) {
      // req.body.password = hashear(req.body.password);
    }

    const updated = await userService.updateOneService(req.user._id, {
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
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
   
   return res
    .cookie("access_token", token, {
      httpOnly:true,
      secure:true,
      sameSite: "none", 
    })
    .json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

export async function getUserCurrent(req,res) {
 
   res.json({
     _id: req.user._id,
     name: req.user.name, 
     email: req.user.email,
     age:req.user.age,
     role: req.user.role
   });
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
