import { AnyObject } from "mongoose";
import userService from "../users/user.service";
import merchandiseRepo from "./merchandise.repo";
import { merchandiseResponses } from "./merchandise.responses";
import {
    IMerchandiseSchema,
    IRedeemeRequest,
    IUdpateRequestSchema,
    IUpdateMerchandiseSchema,
} from "./merchandise.types";

export const addMerchandise = (
    merchandise: IMerchandiseSchema,
    manufacturerId: string
) => {
    try {
        merchandise.createdBy = manufacturerId;
        const newMerchandise = merchandiseRepo.insertOne(merchandise);
        if (!newMerchandise) throw merchandiseResponses.CAN_NOT_ADD_MERCHANDISE;
        return merchandiseResponses.MERCHANDISE_ADDED;
    } catch (e) {
        throw e;
    }
};

export const getAllMerchandise = async (page: number, limit: number) => {
    try {
        page = page || 1;
        limit = limit || 8;
        const merchandise = await merchandiseRepo.getAllMerchandise(
            page,
            limit
        );
        if (!merchandise) throw merchandiseResponses.MERCHANDISE_NOT_FOUND;

        return merchandise;
    } catch (e) {
        throw e;
    }
};

export const getMerchandiseRequests = async (
    status: string,
    page: number,
    limit: number,
    distributorId?: string
) => {
    try {
        const matchStage: any = {
            "merchandiseRedeemed.status": status,
        };

        if (distributorId) {
            matchStage._id = distributorId;
        }

        const pipeline = [
            { $unwind: "$merchandiseRedeemed" },
            { $match: matchStage },
            {
                $lookup: {
                    from: "merchandises",
                    localField: "merchandiseRedeemed.merchandiseId",
                    foreignField: "_id",
                    as: "merchandiseDetails",
                },
            },
            { $unwind: "$merchandiseDetails" },
            {
                $project: {
                    distributorId: "$_id",
                    username: "$name",
                    merchandiseId: "$merchandiseRedeemed.merchandiseId",
                    merchandiseName: "$merchandiseDetails.merchandiseName",
                    status: "$merchandiseRedeemed.status",
                    createdAt: "$merchandiseRedeemed.createdAt",
                },
            },
            { $skip: (page - 1) * limit },
            { $limit: limit },
        ];

        const merchandise = await userService.getMerchandiseRequests(pipeline);

        if (!merchandise || merchandise.length === 0) {
            throw merchandiseResponses.MERCHANDISE_NOT_FOUND;
        }

        return merchandise;
    } catch (error) {
        throw error;
    }
};

export const getMerchandiseById = async (merchandiseId: string) => {
    try {
        const merchandise = await merchandiseRepo.getMerchandiseById(
            merchandiseId
        );
        if (!merchandise) throw merchandiseResponses.MERCHANDISE_NOT_FOUND;
        return merchandise;
    } catch (e) {
        throw e;
    }
};

export const reedeemMerchandises = async (redeemRequest: IRedeemeRequest) => {
    try {
        const { merchandiseId, userId } = redeemRequest;
        const user = await userService.checkPointsLevel(merchandiseId, userId);
        if (user) {
            const redeemedMerchandise = user.merchandiseRedeemed;
            if (redeemedMerchandise) {
                let newMerchandise = { merchandiseId: merchandiseId };
                redeemedMerchandise.push(newMerchandise);

                await userService.updateRedeemedMerchandise(
                    redeemedMerchandise,
                    user._id.toString()
                );
            } // what if redeemedMerchandise is null?
        }
        return merchandiseResponses.REQUESTED_TO_REDEEM_MERCHANDISE;
    } catch (e) {
        throw e;
    }
};
export const updateMerchandiseRequestStatus = async (
    updates: IUdpateRequestSchema
) => {
    try {
        const isUpdated = userService.updateMerchandiseRequestStatus(updates);
        if (!isUpdated)
            throw merchandiseResponses.CAN_NOT_UPDATE_REQUEST_STATUS;
        return merchandiseResponses.MERCHANDISE_APPROVED;
    } catch (e) {
        throw e;
    }
};

export const findByIdAndUpdate = async (
    merchandiseId: string,
    updates: IUpdateMerchandiseSchema,
    manufacturerId: string
) => {
    try {
        updates.updatedBy = manufacturerId;
        const isUpdated = await merchandiseRepo.findByIdAndUpdate(
            merchandiseId,
            updates
        );
        if (!isUpdated) throw merchandiseResponses.CAN_NOT_UPDATE_MERCHANDISE;
        return merchandiseResponses.MERCHANDISE_UPDATED;
    } catch (e) {
        throw e;
    }
};
export const deleteById = async (merchandiseId: string) => {
    try {
        const isDeleted = await merchandiseRepo.deleteById(merchandiseId);
        if (!isDeleted) throw merchandiseResponses.CAN_NOT_DELETE_MERCHANDISE;
        return merchandiseResponses.MERCHANDISE_DELETED;
    } catch (e) {
        throw e;
    }
};
export default {
    addMerchandise,
    getAllMerchandise,
    getMerchandiseById,
    reedeemMerchandises,
    getMerchandiseRequests,
    updateMerchandiseRequestStatus,
    deleteById,
    findByIdAndUpdate,
};
