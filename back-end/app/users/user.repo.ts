import userModel from "./user.schema";
import { IUserSchema, IUserUpdateSchema } from "./user.types";
import { IInventorySchema } from "../inventory/inventory.types";

export const findUser = async (query: Partial<IUserSchema>) => {
    const user = await userModel.findOne({
        $or: [{ username: query.username }, { email: query.email }],
    });
    return user;
};

export const insertOne = (newUser: Partial<IUserSchema>) => {
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
        .select("inventory")
        .populate("inventory.productId");
    return inventory;
};

export const updateUser = async (
    updates: Partial<IUserUpdateSchema>,
    userId: string
) => {
    const isUpdated = await userModel.findByIdAndUpdate(
        { userId },
        { $set: { updates } }
    );
    return isUpdated;
};

export const updateInventory = async (
    newInventory: IInventorySchema[],
    userId: string
) => {
    const isUpdated = await userModel.findOneAndUpdate(
        { _id: userId },
        { $set: { inventory: newInventory } }
    );
    return isUpdated;
};

export default {
    findUser,
    insertOne,
    addProductToInventory,
    getSpecificUser,
    getInventory,
    updateInventory,
    updateUser,
};
