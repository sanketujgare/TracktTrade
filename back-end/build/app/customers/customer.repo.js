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
exports.getAllCustomers = exports.updatePurchaseHistroy = exports.findByMobileNumber = exports.addCustomer = void 0;
const customer_schema_1 = __importDefault(require("./customer.schema"));
const addCustomer = (customer) => {
    const newCustomer = new customer_schema_1.default(customer);
    newCustomer.save();
    return newCustomer;
};
exports.addCustomer = addCustomer;
const findByMobileNumber = (mobileNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield customer_schema_1.default.findOne({ mobileNumber });
    return user;
});
exports.findByMobileNumber = findByMobileNumber;
const updatePurchaseHistroy = (newHistory, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpated = yield customer_schema_1.default.findOneAndUpdate({ _id: userId }, { $set: { purchaseHistory: newHistory } });
    return isUpated;
});
exports.updatePurchaseHistroy = updatePurchaseHistroy;
const getAllCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield customer_schema_1.default.find();
    return customers;
});
exports.getAllCustomers = getAllCustomers;
exports.default = {
    addCustomer: exports.addCustomer,
    findByMobileNumber: exports.findByMobileNumber,
    getAllCustomers: exports.getAllCustomers,
    updatePurchaseHistroy: exports.updatePurchaseHistroy,
};
