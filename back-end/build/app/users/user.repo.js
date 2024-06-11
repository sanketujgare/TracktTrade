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
exports.updateInventory = exports.findByMobileNumber = exports.getInventory = exports.getSpecificUser = exports.addProductToInventory = exports.addCustomer = exports.insertOne = exports.findUser = void 0;
const user_schema_1 = __importDefault(require("./user.schema"));
const findUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_schema_1.default.findOne({
        $or: [{ username: query.username }, { email: query.email }],
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
const addCustomer = (customer) => {
    const newCustomer = new user_schema_1.default(customer);
    newCustomer.save();
    return newCustomer;
};
exports.addCustomer = addCustomer;
const addProductToInventory = (newProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const isAdded = yield user_schema_1.default.updateMany({
        $push: { inventory: newProduct },
    });
    return isAdded;
});
exports.addProductToInventory = addProductToInventory;
const getSpecificUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = user_schema_1.default.findById(userId);
    return user;
});
exports.getSpecificUser = getSpecificUser;
const getInventory = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const inventory = yield user_schema_1.default
        .findById(userId)
        .select("inventory")
        .populate("inventory.productId");
    return inventory;
});
exports.getInventory = getInventory;
const findByMobileNumber = (mobileNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_schema_1.default.findOne({ mobileNumber });
    return user;
});
exports.findByMobileNumber = findByMobileNumber;
const updateInventory = (newInventory, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield user_schema_1.default.findOneAndUpdate({ _id: userId }, { $set: { inventory: newInventory } });
    return isUpdated;
});
exports.updateInventory = updateInventory;
exports.default = {
    findUser: exports.findUser,
    insertOne: exports.insertOne,
    addCustomer: exports.addCustomer,
    addProductToInventory: exports.addProductToInventory,
    getSpecificUser: exports.getSpecificUser,
    getInventory: exports.getInventory,
    findByMobileNumber: exports.findByMobileNumber,
    updateInventory: exports.updateInventory,
    // addSaleToPurchaceHistory,
};
