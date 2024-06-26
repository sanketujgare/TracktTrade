"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteById = exports.findByIdAndUpdate = exports.updateMerchandiseRequestStatus = exports.reedeemMerchandises = exports.getMerchandiseById = exports.getMerchandiseRequests = exports.getAllMerchandise = exports.addMerchandise = void 0;
const user_service_1 = __importDefault(require("../users/user.service"));
const merchandise_repo_1 = __importDefault(require("./merchandise.repo"));
const merchandise_responses_1 = require("./merchandise.responses");
const addMerchandise = (merchandise, manufacturerId) => {
    try {
        merchandise.createdBy = manufacturerId;
        const newMerchandise = merchandise_repo_1.default.insertOne(merchandise);
        if (!newMerchandise)
            throw merchandise_responses_1.merchandiseResponses.CAN_NOT_ADD_MERCHANDISE;
        return merchandise_responses_1.merchandiseResponses.MERCHANDISE_ADDED;
    }
    catch (e) {
        throw e;
    }
};
exports.addMerchandise = addMerchandise;
const getAllMerchandise = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        page = page || 1;
        limit = limit || 8;
        const merchandise = yield merchandise_repo_1.default.getAllMerchandise(page, limit);
        if (!merchandise)
            throw merchandise_responses_1.merchandiseResponses.MERCHANDISE_NOT_FOUND;
        return merchandise;
    }
    catch (e) {
        throw e;
    }
});
exports.getAllMerchandise = getAllMerchandise;
const getMerchandiseRequests = (status, page, limit, distributorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matchStage = {
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
        const merchandise = yield user_service_1.default.getMerchandiseRequests(pipeline);
        if (!merchandise || merchandise.length === 0) {
            throw merchandise_responses_1.merchandiseResponses.MERCHANDISE_NOT_FOUND;
        }
        return merchandise;
    }
    catch (error) {
        throw error;
    }
});
exports.getMerchandiseRequests = getMerchandiseRequests;
const getMerchandiseById = (merchandiseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const merchandise = yield merchandise_repo_1.default.getMerchandiseById(merchandiseId);
        if (!merchandise)
            throw merchandise_responses_1.merchandiseResponses.MERCHANDISE_NOT_FOUND;
        return merchandise;
    }
    catch (e) {
        throw e;
    }
});
exports.getMerchandiseById = getMerchandiseById;
const reedeemMerchandises = (redeemRequest) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { merchandiseId, userId } = redeemRequest;
        const user = yield user_service_1.default.checkPointsLevel(merchandiseId, userId);
        if (user) {
            const redeemedMerchandise = user.merchandiseRedeemed;
            if (redeemedMerchandise) {
                let newMerchandise = { merchandiseId: merchandiseId };
                redeemedMerchandise.push(newMerchandise);
                yield user_service_1.default.updateRedeemedMerchandise(redeemedMerchandise, user._id.toString());
            } // what if redeemedMerchandise is null?
        }
        return merchandise_responses_1.merchandiseResponses.REQUESTED_TO_REDEEM_MERCHANDISE;
    }
    catch (e) {
        throw e;
    }
});
exports.reedeemMerchandises = reedeemMerchandises;
const updateMerchandiseRequestStatus = (updates) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isUpdated = user_service_1.default.updateMerchandiseRequestStatus(updates);
        if (!isUpdated)
            throw merchandise_responses_1.merchandiseResponses.CAN_NOT_UPDATE_REQUEST_STATUS;
        return merchandise_responses_1.merchandiseResponses.MERCHANDISE_APPROVED;
    }
    catch (e) {
        throw e;
    }
});
exports.updateMerchandiseRequestStatus = updateMerchandiseRequestStatus;
const findByIdAndUpdate = (merchandiseId, updates, manufacturerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        updates.updatedBy = manufacturerId;
        const isUpdated = yield merchandise_repo_1.default.findByIdAndUpdate(merchandiseId, updates);
        if (!isUpdated)
            throw merchandise_responses_1.merchandiseResponses.CAN_NOT_UPDATE_MERCHANDISE;
        return merchandise_responses_1.merchandiseResponses.MERCHANDISE_UPDATED;
    }
    catch (e) {
        throw e;
    }
});
exports.findByIdAndUpdate = findByIdAndUpdate;
const deleteById = (merchandiseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isDeleted = yield merchandise_repo_1.default.deleteById(merchandiseId);
        if (!isDeleted)
            throw merchandise_responses_1.merchandiseResponses.CAN_NOT_DELETE_MERCHANDISE;
        return merchandise_responses_1.merchandiseResponses.MERCHANDISE_DELETED;
    }
    catch (e) {
        throw e;
    }
});
exports.deleteById = deleteById;
exports.default = {
    addMerchandise: exports.addMerchandise,
    getAllMerchandise: exports.getAllMerchandise,
    getMerchandiseById: exports.getMerchandiseById,
    reedeemMerchandises: exports.reedeemMerchandises,
    getMerchandiseRequests: exports.getMerchandiseRequests,
    updateMerchandiseRequestStatus: exports.updateMerchandiseRequestStatus,
    deleteById: exports.deleteById,
    findByIdAndUpdate: exports.findByIdAndUpdate,
};
