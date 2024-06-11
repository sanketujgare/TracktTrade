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
exports.extractCustomerDetails = exports.calculateTotalPrice = exports.createSales = void 0;
const customer_service_1 = __importDefault(require("../customers/customer.service"));
const inventoy_service_1 = __importDefault(require("../inventory/inventoy.service"));
const user_service_1 = __importDefault(require("../users/user.service"));
const sales_repo_1 = __importDefault(require("./sales.repo"));
const sales_responses_1 = require("./sales.responses");
const createSales = (sale) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.default.getSpecificUser(sale.distributorId);
        yield inventoy_service_1.default.checkInventoryLevel(user, sale.products);
        // await inventoyService.updateInventory(
        //     user._id.toString(),
        //     sale.products.map((product) => ({
        //         productId: product.productId,
        //         quantity: -product.quantity,
        //     }))
        // );
        const totalPrice = (0, exports.calculateTotalPrice)(sale);
        sale.totalPrice = totalPrice;
        const points = totalPrice / 1000;
        const newSale = sales_repo_1.default.createSales(sale);
        if (!newSale)
            throw sales_responses_1.salesResponses.CAN_NOT_UPDATE_SALES;
        const customerDetails = (0, exports.extractCustomerDetails)(newSale);
        if (customerDetails) {
            const updateCustomerDetails = yield customer_service_1.default.updateCustomerDetails(customerDetails, newSale._id.toString());
            if (updateCustomerDetails) {
                return sales_responses_1.salesResponses.SALES_UPDATED_SUCCESSFULLY;
            }
        }
    }
    catch (e) {
        throw e;
    }
});
exports.createSales = createSales;
const calculateTotalPrice = (sale) => {
    try {
        const totalPrice = sale.products.reduce((totalPrice, product) => {
            if (product.currentPrice && product.quantity) {
                return totalPrice + product.currentPrice * product.quantity;
            }
            return totalPrice;
        }, 0);
        return totalPrice;
    }
    catch (e) {
        throw e;
    }
};
exports.calculateTotalPrice = calculateTotalPrice;
const extractCustomerDetails = (sale) => {
    try {
        const { customerName, customerEmail, customerMobileNumber } = sale;
        const customerDetails = {
            name: customerName,
            email: customerEmail,
            mobileNumber: customerMobileNumber,
        };
        return customerDetails;
    }
    catch (e) {
        throw e;
    }
};
exports.extractCustomerDetails = extractCustomerDetails;
exports.default = {
    createSales: exports.createSales,
};
