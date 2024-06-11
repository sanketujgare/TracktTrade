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
exports.updateCustomerDetails = void 0;
const customer_repo_1 = __importDefault(require("./customer.repo"));
const customer_responses_1 = require("./customer.responses");
const updateCustomerDetails = (customerDetails, salesId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let user;
        if (customerDetails.mobileNumber) {
            user = yield customer_repo_1.default.findByMobileNumber(customerDetails.mobileNumber);
        }
        if (user) {
            let purchaceHistory = user.purchaseHistory;
            if (salesId && purchaceHistory) {
                const sale = { salesId: salesId };
                purchaceHistory.push(sale);
            }
            if (purchaceHistory) {
                yield customer_repo_1.default.updatePurchaseHistroy(purchaceHistory, user._id.toString());
                return customer_responses_1.customerResponses.PURCHACE_HISTORY_UPDATED;
            }
        }
        if (salesId) {
            (_a = customerDetails.purchaseHistory) === null || _a === void 0 ? void 0 : _a.push({ salesId });
        }
        const newCustomer = customer_repo_1.default.addCustomer(customerDetails);
        if (!newCustomer)
            throw customer_responses_1.customerResponses.CANNOT_CREATE_CUSTOMER;
        return customer_responses_1.customerResponses.NEW_CUSTOMER_CREATED;
    }
    catch (e) {
        throw e;
    }
});
exports.updateCustomerDetails = updateCustomerDetails;
exports.default = {
    updateCustomerDetails: exports.updateCustomerDetails,
};
