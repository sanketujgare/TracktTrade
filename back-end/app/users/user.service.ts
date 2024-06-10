import { authResponses } from "../auth/auth.responses";
import { encrypt } from "../utility/encrypt";
import userRepo from "./user.repo";
import { ICustomerSchema, IUserSchema } from "./user.types";
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
    try {
        const userInventory = await userRepo.getInventory(userId);

        if (userInventory) return userInventory;
    } catch (e) {
        throw e;
    }
};

export const updateCustomerDetails = async (
    customerDetails: ICustomerSchema
) => {
    try {
        const user = await userRepo.findByMobileNumber(
            customerDetails.mobileNumber
        );
        if (user) {
            const isAdded = await userRepo.addSaleToPurchaceHistory(
                customerDetails.salesId
            );
            if (!isAdded) throw userResponses.COULD_NOT_UPDATE_PURCHACE_HISTORY;
            return userResponses.PURCHACE_HISTORY_UPDATED;
        }
        customerDetails.role = "Customer";
        const newCustomer = userRepo.addCustomer(customerDetails);
        if (!newCustomer) throw userResponses.CANNOT_CREATE_CUSTOMER;
        return userResponses.NEW_CUSTOMER_CREATED;
    } catch (e) {}
};
export default {
    findUser,
    createUser,
    addProductToInventory,
    getSpecificUser,
    getInventory,
    updateCustomerDetails,
};
