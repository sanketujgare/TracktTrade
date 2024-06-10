import { authResponses } from "../auth/auth.responses";
import { encrypt } from "../utility/encrypt";
import userRepo from "./user.repo";
import { IUserSchema } from "./user.types";
import { IInventorySchema } from "../inventory/inventory.types";
import { userResponses } from "./user.responses";
import productService from "../Products/product.service";
import { inventoryResponses } from "../inventory/inventory.responces";

export const findUser = async (query: Partial<IUserSchema>) => {
  try {
    const user = await userRepo.findUser(query);
    if (user) return user;
  } catch (e) {
    throw userResponses.USER_NOT_FOUND;
  }
};

export const createUser = async (newUser: IUserSchema) => {
  try {
    const { username, email } = newUser;
    const existingUser = await findUser({ username, email });

    if (existingUser) {
      const { username, email } = existingUser;
      if (newUser.username === username)
        throw authResponses.USERNAME_ALREADY_EXIST;
      if (newUser.email === email) throw authResponses.EMAIL_ALREADY_EXIST;
    }

    newUser.password = await encrypt(newUser.password);

    const result = userRepo.insertOne(newUser);
    if (!result) return userResponses.CANNOT_CREATE_USER;
    return userResponses.USER_CREATED_SUCCESSFULLY;
  } catch (e) {
    throw e;
  }
};

export const addProductToInventory = async (product: IInventorySchema) => {
  try {
    const isAdded = await userRepo.addProductToInventory(product);
    if (!isAdded) throw userResponses.CANNOT_UPDATE_INVENTORY;
    return isAdded;
  } catch (e) {
    throw e;
  }
};

export const getSpecificUser = async (userId: string) => {
  try {
    const user = await userRepo.getSpecificUser(userId);
    if (!user) throw userResponses.USER_NOT_FOUND;
    return user;
  } catch (e) {
    throw e;
  }
};
export const getInventory = async (userId: string) => {
  const inventory = await userRepo.getInventory(userId);
  // if (!inventory || inventory.length === 0) inventoryResponses.EMPTY_INVENTORY;
};
export default {
  findUser,
  createUser,
  addProductToInventory,
  getSpecificUser,
};
