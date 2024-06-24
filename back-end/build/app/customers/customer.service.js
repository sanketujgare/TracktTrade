"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSpecificCustomer = exports.getAllCustomers = exports.updateCustomerDetails = void 0;
const customer_repo_1 = __importStar(require("./customer.repo"));
const customer_responses_1 = require("./customer.responses");
const updateCustomerDetails = (customerDetails, salesId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sale = { salesId: salesId };
        if (!customerDetails.mobileNumber)
            throw "";
        // try using upsert in mongo
        const user = yield customer_repo_1.default.findByMobileNumber(customerDetails.mobileNumber);
        if (user) {
            let purchaceHistory = user.purchaseHistory;
            purchaceHistory.push(sale);
            yield customer_repo_1.default.updatePurchaseHistroy(purchaceHistory, user._id.toString());
            return customer_responses_1.customerResponses.PURCHACE_HISTORY_UPDATED;
        }
        const newCustomer = customer_repo_1.default.addCustomer(customerDetails);
        if (!newCustomer)
            throw customer_responses_1.customerResponses.CANNOT_CREATE_CUSTOMER;
        let purchaceHistory = newCustomer.purchaseHistory;
        purchaceHistory.push(sale);
        yield customer_repo_1.default.updatePurchaseHistroy(purchaceHistory, newCustomer._id.toString());
        return customer_responses_1.customerResponses.NEW_CUSTOMER_CREATED;
    }
    catch (e) {
        throw e;
    }
});
exports.updateCustomerDetails = updateCustomerDetails;
const getAllCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customers = yield customer_repo_1.default.getAllCustomers();
        if (!customers)
            throw customer_responses_1.customerResponses.NO_CUSTOMERS_FOUND;
        return customers;
    }
    catch (e) {
        throw e;
    }
});
exports.getAllCustomers = getAllCustomers;
const getSpecificCustomer = (mobileNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield (0, customer_repo_1.findByMobileNumber)(mobileNumber);
        if (!customer)
            throw customer_responses_1.customerResponses.CUSTOMER_NOT_FOUND;
        return customer;
    }
    catch (e) {
        throw e;
    }
});
exports.getSpecificCustomer = getSpecificCustomer;
exports.default = {
    updateCustomerDetails: exports.updateCustomerDetails,
    getAllCustomers: exports.getAllCustomers,
    getSpecificCustomer: exports.getSpecificCustomer,
};
