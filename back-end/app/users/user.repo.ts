import userModel from "./user.schema";
import { ICustomerSchema, IPurchaseSchema, IUserSchema } from "./user.types";
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

export const addCustomer = (customer: ICustomerSchema) => {
    const newCustomer = new userModel(customer);
    newCustomer.save();
    return newCustomer;
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

export const findByMobileNumber = async (mobileNumber: string) => {
    const user = await userModel.findOne({ mobileNumber });
    return user;
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

export const updatePurchaseHistroy = async (
    newHistory: IPurchaseSchema[],
    userId: string
) => {
    const isUpated = await userModel.findOneAndUpdate(
        { _id: userId },
        { $set: { customerPurchaseHistory: newHistory } }
    );
    return isUpated;
};

export const updateDistributorSales = () => {};

export default {
    findUser,
    insertOne,
    addCustomer,
    addProductToInventory,
    getSpecificUser,
    getInventory,
    findByMobileNumber,
    updateInventory,
    updatePurchaseHistroy,
    // addSaleToPurchaceHistory,
};
