import userModel from "./user.schema";
import { IUserSchema } from "./user.types";
import { IInventorySchema } from "../inventory/inventory.types";
export const findUser = async (query: Partial<IUserSchema>) => {
  const user = await userModel.findOne({
    $or: [{ username: query.username }, { email: query.email }],
  });
  return user;
};

export const insertOne = (newUser: IUserSchema): IUserSchema => {
  const User = new userModel(newUser);
  User.save();
  return User;
};

export const addProductToInventory = async (newProduct: IInventorySchema) => {
  const isAdded = await userModel.updateMany({
    $push: { inventory: newProduct },
  });
  return isAdded;
};

export const getSpecificUser = async (userId: string) => {
  const user = userModel.findById(userId);
  return user;
};
export const getInventory = async (userId: string) => {
  const inventory = await userModel
    .findById(userId)
    .populate("inventory.productId");
  return inventory;
};

export default {
  findUser,
  insertOne,
  addProductToInventory,
  getSpecificUser,
  getInventory,
};
