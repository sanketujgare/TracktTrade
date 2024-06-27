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
exports.deleteUserById = exports.updateRedeemedMerchandises = exports.updatePointesEarned = exports.updateInventory = exports.updateUser = exports.aggregate = exports.getInventory = exports.getUserById = exports.getAllDistributors = exports.addProductToInventory = exports.insertOne = exports.findUser = void 0;
const user_schema_1 = __importDefault(require("./user.schema"));
const findUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_schema_1.default.findOne({
        $or: [
            { username: query.username },
            { email: query.email },
            { mobileNumber: query.mobileNumber },
        ],
    });
    return user;
});
exports.findUser = findUser;
const insertOne = (newUser) => {
    const User = new user_schema_1.default(newUser);
    User.save();
    return User;
};
exports.insertOne = insertOne;
const addProductToInventory = (newProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const isAdded = yield user_schema_1.default.updateMany({
        $push: { inventory: newProduct },
    });
    return isAdded;
});
exports.addProductToInventory = addProductToInventory;
const getAllDistributors = (page, limit) => user_schema_1.default
    .find({ role: "Distributor" }, { password: 0 })
    .skip((page - 1) * limit)
    .limit(limit);
exports.getAllDistributors = getAllDistributors;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () { return user_schema_1.default.findById(userId, { password: 0 }); });
exports.getUserById = getUserById;
const getInventory = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const inventory = yield user_schema_1.default
        .findById(userId)
        .select("inventory")
        .populate("inventory.productId");
    return inventory;
});
exports.getInventory = getInventory;
const aggregate = (pipeline) => __awaiter(void 0, void 0, void 0, function* () { return user_schema_1.default.aggregate(pipeline); });
exports.aggregate = aggregate;
const updateUser = (updates, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield user_schema_1.default.findByIdAndUpdate(userId, updates);
    return isUpdated;
});
exports.updateUser = updateUser;
const updateInventory = (newInventory, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield user_schema_1.default.findOneAndUpdate({ _id: userId }, { $set: { inventory: newInventory } });
    return isUpdated;
});
exports.updateInventory = updateInventory;
const updatePointesEarned = (points, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield user_schema_1.default.findByIdAndUpdate({ _id: userId }, { $set: { pointsEarned: points } });
    return isUpdated;
});
exports.updatePointesEarned = updatePointesEarned;
const updateRedeemedMerchandises = (newRedeemed, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield user_schema_1.default.findByIdAndUpdate({ _id: userId }, { $set: { merchandiseRedeemed: newRedeemed } });
    return isUpdated;
});
exports.updateRedeemedMerchandises = updateRedeemedMerchandises;
const updateMerchandiseRequestStatus = (updates) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_schema_1.default.updateOne({
        _id: updates.userId,
        "merchandiseRedeemed.merchandiseId": updates.merchandiseId,
    }, {
        $set: { "merchandiseRedeemed.$.status": updates.status },
    });
    return result;
});
const deleteUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = user_schema_1.default.findByIdAndDelete({ _id: userId });
    return isDeleted;
});
exports.deleteUserById = deleteUserById;
exports.default = {
    findUser: exports.findUser,
    insertOne: exports.insertOne,
    addProductToInventory: exports.addProductToInventory,
    getUserById: exports.getUserById,
    getInventory: exports.getInventory,
    aggregate: exports.aggregate,
    updateInventory: exports.updateInventory,
    updateUser: exports.updateUser,
    updatePointesEarned: exports.updatePointesEarned,
    updateRedeemedMerchandises: exports.updateRedeemedMerchandises,
    updateMerchandiseRequestStatus,
    getAllDistributors: exports.getAllDistributors,
    deleteUserById: exports.deleteUserById,
};
