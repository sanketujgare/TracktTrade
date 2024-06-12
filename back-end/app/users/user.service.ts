import { authResponses } from "../auth/auth.responses";
import { encrypt } from "../utility/encrypt";
import userRepo from "./user.repo";
import { IUserSchema, IUserUpdateSchema } from "./user.types";
import { IInventorySchema } from "../inventory/inventory.types";
import { userResponses } from "./user.responses";
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
            if (newUser.email === email)
                throw authResponses.EMAIL_ALREADY_EXIST;
        }

        newUser.password = await encrypt(newUser.password);

        const result = userRepo.insertOne(newUser);
        if (!result) throw userResponses.CANNOT_CREATE_USER;
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
    try {
        const userInventory = await userRepo.getInventory(userId);
        if (userInventory) return userInventory;
    } catch (e) {
        throw e;
    }
};

export const updateInventory = async (
    newInventory: IInventorySchema[],
    userId: string
) => {
    try {
        const isUpdated = userRepo.updateInventory(newInventory, userId);
        if (!isUpdated) throw inventoryResponses.CAN_NOT_UPDATE_INVENTORY;
        return isUpdated;
    } catch (e) {
        throw e;
    }
};

export const updateUser = async (
    updates: IUserUpdateSchema,
    userId: string
) => {
    const isUpdated = await userRepo.updateUser(updates, userId);
    if (!isUpdated) throw userResponses.CAN_NOT_UPDATE_USER;
    return userResponses.USER_UPDATED_SUCCESSFULLY;
};

export default {
    findUser,
    createUser,
    addProductToInventory,
    getSpecificUser,
    getInventory,
    updateInventory,
    updateUser,
};
