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
exports.deleteUserById = exports.updateMerchandiseRequestStatus = exports.updateRedeemedMerchandise = exports.checkPointsLevel = exports.calculateTotalPoints = exports.updatePointesEarned = exports.updateUser = exports.updateInventory = exports.getMerchandiseRequests = exports.getInventory = exports.getUserEmails = exports.getUserById = exports.getAllDistributors = exports.addProductToInventory = exports.checkExisting = exports.createUser = exports.findUser = void 0;
const auth_responses_1 = require("../auth/auth.responses");
const encrypt_1 = require("../utility/encrypt");
const user_repo_1 = __importDefault(require("./user.repo"));
const user_responses_1 = require("./user.responses");
const inventory_responces_1 = require("../inventory/inventory.responces");
const merchandise_service_1 = __importDefault(require("../merchandise/merchandise.service"));
const inventory_service_1 = __importDefault(require("../inventory/inventory.service"));
const mail_templates_1 = __importDefault(require("../utility/mail-templates"));
const mail_service_1 = __importDefault(require("../utility/mail-service"));
const findUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_repo_1.default.findUser(query);
        if (user)
            return user;
    }
    catch (e) {
        throw user_responses_1.userResponses.USER_NOT_FOUND;
    }
});
exports.findUser = findUser;
const createUser = (newUser, creatorId, creatorEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, exports.checkExisting)(newUser);
        newUser.inventory = yield inventory_service_1.default.getDefaultInventory();
        newUser.createdBy = creatorId;
        const testPassword = newUser.password;
        newUser.password = yield (0, encrypt_1.encrypt)(newUser.password);
        const result = user_repo_1.default.insertOne(newUser);
        if (!result)
            throw user_responses_1.userResponses.CANNOT_CREATE_USER;
        const mail = mail_templates_1.default.userRegistration(newUser.email, testPassword, newUser.username, creatorEmail);
        yield mail_service_1.default.sendMail(mail);
        return user_responses_1.userResponses.USER_CREATED_SUCCESSFULLY;
    }
    catch (e) {
        throw e;
    }
});
exports.createUser = createUser;
const checkExisting = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, mobileNumber } = newUser;
        const existingUser = yield (0, exports.findUser)({ username, email, mobileNumber });
        if (existingUser) {
            const { username, email, mobileNumber } = existingUser;
            if (newUser.username === username)
                throw auth_responses_1.authResponses.USERNAME_ALREADY_EXISTS;
            if (newUser.email === email)
                throw auth_responses_1.authResponses.EMAIL_ALREADY_EXISTS;
            if (newUser.mobileNumber === mobileNumber)
                throw auth_responses_1.authResponses.MOBILE_NUMBER_ALREADY_EXISTS;
        }
    }
    catch (e) {
        throw e;
    }
});
exports.checkExisting = checkExisting;
const addProductToInventory = (product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isAdded = yield user_repo_1.default.addProductToInventory(product);
        if (!isAdded)
            throw user_responses_1.userResponses.CANNOT_UPDATE_INVENTORY;
        return isAdded;
    }
    catch (e) {
        throw e;
    }
});
exports.addProductToInventory = addProductToInventory;
const getAllDistributors = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        page = page || 1;
        limit = limit || 10;
        const distributors = yield user_repo_1.default.getAllDistributors(page, limit);
        if (!distributors)
            throw user_responses_1.userResponses.NO_DISTRIBUTOR_FOUND;
        return distributors;
    }
    catch (e) {
        throw e;
    }
});
exports.getAllDistributors = getAllDistributors;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_repo_1.default.getUserById(userId);
        if (!user)
            throw user_responses_1.userResponses.USER_NOT_FOUND;
        return user;
    }
    catch (e) {
        throw e;
    }
});
exports.getUserById = getUserById;
const getUserEmails = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, exports.getAllDistributors)();
        return users.map((user) => user.email);
    }
    catch (e) {
        throw e;
    }
});
exports.getUserEmails = getUserEmails;
const getInventory = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInventory = yield user_repo_1.default.getInventory(userId);
        if (userInventory)
            return userInventory;
    }
    catch (e) {
        throw e;
    }
});
exports.getInventory = getInventory;
const getMerchandiseRequests = (pipeline) => __awaiter(void 0, void 0, void 0, function* () { return user_repo_1.default.aggregate(pipeline); });
exports.getMerchandiseRequests = getMerchandiseRequests;
const updateInventory = (newInventory, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isUpdated = user_repo_1.default.updateInventory(newInventory, userId);
        if (!isUpdated)
            throw inventory_responces_1.inventoryResponses.CAN_NOT_UPDATE_INVENTORY;
        return isUpdated;
    }
    catch (e) {
        throw e;
    }
});
exports.updateInventory = updateInventory;
const updateUser = (updates, userId, updatorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        updates.updatedBy = updatorId;
        if (updates.email || updates.username || updates.mobileNumber)
            yield (0, exports.checkExisting)(updates);
        const isUpdated = yield user_repo_1.default.updateUser(updates, userId);
        if (!isUpdated)
            throw user_responses_1.userResponses.CAN_NOT_UPDATE_USER;
        return user_responses_1.userResponses.USER_UPDATED_SUCCESSFULLY;
    }
    catch (e) {
        throw e;
    }
});
exports.updateUser = updateUser;
const updatePointesEarned = (userId, points) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, exports.getUserById)(userId);
        let pointsEarned = user.pointsEarned;
        if (pointsEarned) {
            // this can be done via aggregation
            pointsEarned.push({ points: points });
            yield user_repo_1.default.updatePointesEarned(pointsEarned, userId);
            const totalPoints = (0, exports.calculateTotalPoints)(pointsEarned);
            yield user_repo_1.default.updateUser({ totalPoints: totalPoints }, userId);
        }
    }
    catch (e) {
        throw e;
    }
});
exports.updatePointesEarned = updatePointesEarned;
const calculateTotalPoints = (points) => {
    try {
        const totalPoints = points.reduce((totalPoints, point) => {
            return (totalPoints += point.points);
        }, 0);
        return totalPoints;
    }
    catch (e) {
        throw e;
    }
};
exports.calculateTotalPoints = calculateTotalPoints;
const checkPointsLevel = (merchandiseId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const merchandise = yield merchandise_service_1.default.getMerchandiseById(merchandiseId);
        const user = yield user_repo_1.default.getUserById(userId);
        if (!(user === null || user === void 0 ? void 0 : user.totalPoints) || !(merchandise === null || merchandise === void 0 ? void 0 : merchandise.pointsRequired))
            throw "INSUFFICIENT POINTS";
        if (user.totalPoints < merchandise.pointsRequired) {
            throw user_responses_1.userResponses.INSUFFICIENT_POINTS;
        }
        const totalPoints = user.totalPoints - merchandise.pointsRequired;
        yield (0, exports.updateUser)({ totalPoints }, user._id.toString());
        return user;
    }
    catch (e) {
        throw e;
    }
});
exports.checkPointsLevel = checkPointsLevel;
const updateRedeemedMerchandise = (redeemedMerchandise, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isUpdated = yield user_repo_1.default.updateRedeemedMerchandises(redeemedMerchandise, userId);
        if (!isUpdated)
            throw user_responses_1.userResponses.CAN_NOT_REDEEM_MERCHANDISE;
        return isUpdated;
    }
    catch (e) {
        throw e;
    }
});
exports.updateRedeemedMerchandise = updateRedeemedMerchandise;
const updateMerchandiseRequestStatus = (updates) => __awaiter(void 0, void 0, void 0, function* () { return user_repo_1.default.updateMerchandiseRequestStatus(updates); });
exports.updateMerchandiseRequestStatus = updateMerchandiseRequestStatus;
const deleteUserById = (userId, deletedBy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (deletedBy.toString() === userId)
            throw "YOU CAN NOT DELETE YOURSELF";
        const isDeleted = yield user_repo_1.default.deleteUserById(userId);
        if (!isDeleted)
            throw user_responses_1.userResponses.CAN_NOT_DELETE_USER;
        return user_responses_1.userResponses.USER_DELETED_SUCCESSFULLY;
    }
    catch (e) {
        throw e;
    }
});
exports.deleteUserById = deleteUserById;
exports.default = {
    findUser: exports.findUser,
    createUser: exports.createUser,
    addProductToInventory: exports.addProductToInventory,
    getUserById: exports.getUserById,
    getInventory: exports.getInventory,
    getMerchandiseRequests: exports.getMerchandiseRequests,
    updateInventory: exports.updateInventory,
    updateUser: exports.updateUser,
    updatePointesEarned: exports.updatePointesEarned,
    checkPointsLevel: exports.checkPointsLevel,
    updateRedeemedMerchandise: exports.updateRedeemedMerchandise,
    updateMerchandiseRequestStatus: exports.updateMerchandiseRequestStatus,
    getAllDistributors: exports.getAllDistributors,
    deleteUserById: exports.deleteUserById,
    getUserEmails: exports.getUserEmails,
};
