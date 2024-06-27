import { authResponses } from "../auth/auth.responses";
import { encrypt } from "../utility/encrypt";
import userRepo from "./user.repo";
import {
    IPointsEarnedSchema,
    IUserSchema,
    IUserUpdateSchema,
} from "./user.types";
import { IInventorySchema } from "../inventory/inventory.types";
import { userResponses } from "./user.responses";
import { inventoryResponses } from "../inventory/inventory.responces";
import merchandiseService from "../merchandise/merchandise.service";
import {
    IRedeemedSchema,
    IUdpateRequestSchema,
} from "../merchandise/merchandise.types";
import inventoyService from "../inventory/inventory.service";
import mailTemplates from "../utility/mail-templates";
import sendMail from "../utility/mail-service";

export const findUser = async (query: Partial<IUserSchema>) => {
    try {
        const user = await userRepo.findUser(query);
        if (user) return user;
    } catch (e) {
        throw userResponses.USER_NOT_FOUND;
    }
};

export const createUser = async (
    newUser: IUserSchema,
    creatorId: string,
    creatorEmail: string
) => {
    try {
        await checkExisting(newUser);

        newUser.inventory = await inventoyService.getDefaultInventory();
        newUser.createdBy = creatorId;
        const testPassword = newUser.password;
        newUser.password = await encrypt(newUser.password);

        const result = userRepo.insertOne(newUser);
        if (!result) throw userResponses.CANNOT_CREATE_USER;

        const mail = mailTemplates.userRegistration(
            newUser.email,
            testPassword,
            newUser.username,
            creatorEmail
        );

        await sendMail.sendMail(mail);

        return userResponses.USER_CREATED_SUCCESSFULLY;
    } catch (e) {
        throw e;
    }
};

export const checkExisting = async (newUser: Partial<IUserSchema>) => {
    try {
        const { username, email, mobileNumber } = newUser;
        const existingUser = await findUser({ username, email, mobileNumber });

        if (existingUser) {
            const { username, email, mobileNumber } = existingUser;
            if (newUser.username === username)
                throw authResponses.USERNAME_ALREADY_EXISTS;
            if (newUser.email === email)
                throw authResponses.EMAIL_ALREADY_EXISTS;
            if (newUser.mobileNumber === mobileNumber)
                throw authResponses.MOBILE_NUMBER_ALREADY_EXISTS;
        }
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

export const getAllDistributors = async (page?: number, limit?: number) => {
    try {
        page = page || 1;
        limit = limit || 10;
        const distributors = await userRepo.getAllDistributors(page, limit);
        if (!distributors) throw userResponses.NO_DISTRIBUTOR_FOUND;
        return distributors;
    } catch (e) {
        throw e;
    }
};

export const getUserById = async (userId: string) => {
    try {
        const user = await userRepo.getUserById(userId);
        if (!user) throw userResponses.USER_NOT_FOUND;
        return user;
    } catch (e) {
        throw e;
    }
};

export const getUserEmails = async () => {
    try {
        const users = await getAllDistributors();
        return users.map((user) => user.email);
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

export const getMerchandiseRequests = async (pipeline: any) =>
    userRepo.aggregate(pipeline);

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
    userId: string,
    updatorId?: string
) => {
    try {
        updates.updatedBy = updatorId;
        if (updates.email || updates.username || updates.mobileNumber)
            await checkExisting(updates);
        const isUpdated = await userRepo.updateUser(updates, userId);
        if (!isUpdated) throw userResponses.CAN_NOT_UPDATE_USER;
        return userResponses.USER_UPDATED_SUCCESSFULLY;
    } catch (e) {
        throw e;
    }
};

export const updatePointesEarned = async (userId: string, points: number) => {
    try {
        const user = await getUserById(userId);
        let pointsEarned = user.pointsEarned;
        if (pointsEarned) {
            // this can be done via aggregation
            pointsEarned.push({ points: points });
            await userRepo.updatePointesEarned(pointsEarned, userId);
            const totalPoints = calculateTotalPoints(pointsEarned);
            await userRepo.updateUser({ totalPoints: totalPoints }, userId);
        }
    } catch (e) {
        throw e;
    }
};

export const calculateTotalPoints = (points: IPointsEarnedSchema[]) => {
    try {
        const totalPoints = points.reduce((totalPoints, point) => {
            return (totalPoints += point.points);
        }, 0);
        return totalPoints;
    } catch (e) {
        throw e;
    }
};

export const checkPointsLevel = async (
    merchandiseId: string,
    userId: string
) => {
    try {
        const merchandise = await merchandiseService.getMerchandiseById(
            merchandiseId
        );
        const user = await userRepo.getUserById(userId);
        if (!user?.totalPoints || !merchandise?.pointsRequired)
            throw "INSUFFICIENT POINTS";

        if (user.totalPoints < merchandise.pointsRequired) {
            throw userResponses.INSUFFICIENT_POINTS;
        }

        const totalPoints = user.totalPoints - merchandise.pointsRequired;
        await updateUser({ totalPoints }, user._id.toString());

        return user;
    } catch (e) {
        throw e;
    }
};

export const updateRedeemedMerchandise = async (
    redeemedMerchandise: IRedeemedSchema[],
    userId: string
) => {
    try {
        const isUpdated = await userRepo.updateRedeemedMerchandises(
            redeemedMerchandise,
            userId
        );
        if (!isUpdated) throw userResponses.CAN_NOT_REDEEM_MERCHANDISE;
        return isUpdated;
    } catch (e) {
        throw e;
    }
};

export const updateMerchandiseRequestStatus = async (
    updates: IUdpateRequestSchema
) => userRepo.updateMerchandiseRequestStatus(updates);

export const deleteUserById = async (userId: String, deletedBy: String) => {
    try {
        if (deletedBy.toString() === userId)
            throw "YOU CAN NOT DELETE YOURSELF";

        const isDeleted = await userRepo.deleteUserById(userId);
        if (!isDeleted) throw userResponses.CAN_NOT_DELETE_USER;
        return userResponses.USER_DELETED_SUCCESSFULLY;
    } catch (e) {
        throw e;
    }
};

export default {
    findUser,
    createUser,
    addProductToInventory,
    getUserById,
    getInventory,
    getMerchandiseRequests,
    updateInventory,
    updateUser,
    updatePointesEarned,
    checkPointsLevel,
    updateRedeemedMerchandise,
    updateMerchandiseRequestStatus,
    getAllDistributors,
    deleteUserById,
    getUserEmails,
};
