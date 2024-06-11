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
exports.updateUser = exports.updateInventory = exports.getInventory = exports.getSpecificUser = exports.addProductToInventory = exports.createUser = exports.findUser = void 0;
const auth_responses_1 = require("../auth/auth.responses");
const encrypt_1 = require("../utility/encrypt");
const user_repo_1 = __importDefault(require("./user.repo"));
const user_responses_1 = require("./user.responses");
const inventory_responces_1 = require("../inventory/inventory.responces");
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
const createUser = (newUser) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email } = newUser;
        const existingUser = yield (0, exports.findUser)({ username, email });
        if (existingUser) {
            const { username, email } = existingUser;
            if (newUser.username === username)
                throw auth_responses_1.authResponses.USERNAME_ALREADY_EXIST;
            if (newUser.email === email)
                throw auth_responses_1.authResponses.EMAIL_ALREADY_EXIST;
        }
        newUser.password = yield (0, encrypt_1.encrypt)(newUser.password);
        const result = user_repo_1.default.insertOne(newUser);
        if (!result)
            throw user_responses_1.userResponses.CANNOT_CREATE_USER;
        return user_responses_1.userResponses.USER_CREATED_SUCCESSFULLY;
    }
    catch (e) {
        throw e;
    }
});
exports.createUser = createUser;
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
const getSpecificUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_repo_1.default.getSpecificUser(userId);
        if (!user)
            throw user_responses_1.userResponses.USER_NOT_FOUND;
        return user;
    }
    catch (e) {
        throw e;
    }
});
exports.getSpecificUser = getSpecificUser;
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
const updateUser = (updates, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield user_repo_1.default.updateUser(updates, userId);
    if (!isUpdated)
        throw user_responses_1.userResponses.CAN_NOT_UPDATE_USER;
    return user_responses_1.userResponses.USER_UPDATED_SUCCESSFULLY;
});
exports.updateUser = updateUser;
exports.default = {
    findUser: exports.findUser,
    createUser: exports.createUser,
    addProductToInventory: exports.addProductToInventory,
    getSpecificUser: exports.getSpecificUser,
    getInventory: exports.getInventory,
    updateInventory: exports.updateInventory,
    updateUser: exports.updateUser,
};
