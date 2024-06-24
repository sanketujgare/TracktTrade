import userModel from "./user.schema";
import {
    IPointsEarnedSchema,
    IUserSchema,
    IUserUpdateSchema,
} from "./user.types";
import { IInventorySchema } from "../inventory/inventory.types";
import { IRedeemedSchema } from "../merchandise/merchandise.types";

export const findUser = async (query: Partial<IUserSchema>) => {
    const user = await userModel.findOne({
        $or: [
            { username: query.username },
            { email: query.email },
            { mobileNumber: query.mobileNumber },
        ],
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

export const getAllDistributors = () => userModel.find({ role: "Distributor" });

export const getUserById = async (userId: string) => userModel.findById(userId);

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
    const isUpdated = await userModel.findByIdAndUpdate(userId, updates);
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

export const updatePointesEarned = async (
    points: IPointsEarnedSchema[],
    userId: string
) => {
    const isUpdated = await userModel.findByIdAndUpdate(
        { _id: userId },
        { $set: { pointsEarned: points } }
    );
    return isUpdated;
};

export const updateRedeemedMerchandises = async (
    newRedeemed: IRedeemedSchema[],
    userId: string
) => {
    const isUpdated = await userModel.findByIdAndUpdate(
        { _id: userId },
        { $set: { merchandiseRedeemed: newRedeemed } }
    );
    return isUpdated;
};

export const deleteUserById = async (userId: String) => {
    const isDeleted = userModel.findByIdAndDelete({ _id: userId });
    return isDeleted;
};
export default {
    findUser,
    insertOne,
    addProductToInventory,
    getUserById,
    getInventory,
    updateInventory,
    updateUser,
    updatePointesEarned,
    updateRedeemedMerchandises,
    getAllDistributors,
    deleteUserById,
};
