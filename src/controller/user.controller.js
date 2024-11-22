import { userService } from "../service/index.service.js";


export async function postUserController(req, res) {
  try {

    const user = await userService.createUserService(req.body);

    res.status(201).json({
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
