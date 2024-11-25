import { usersManager } from "../user.schema.js";


export class UsersDaoMongoose {
    async create(data) {
      const user = (await usersManager.create(data)).toObject();
  
      return user;
    }
    async readOne(query) {
      const user = await usersManager.findOne(query).lean();
      return user
    }
    async readMany(query) {
      const users = await usersManager.find(query);
      return users;
    }
    async updateOne(id, query) {
      return await usersManager
        .findOneAndUpdate({ _id: id }, query, { new: true })
        .lean();
    }
  
    async deleteOne(id) {
      const userToDelete = await usersManager
        .findOneAndDelete({ _id: id })
        .lean();
      return userToDelete;
    }
}