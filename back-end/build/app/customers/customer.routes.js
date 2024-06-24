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
const express_1 = require("express");
const routes_types_1 = require("../routes/routes.types");
const customer_service_1 = __importDefault(require("./customer.service"));
const response_handler_1 = require("../utility/response-handler");
const auth_permissions_1 = require("../utility/auth-permissions");
const customer_validations_1 = require("./customer.validations");
const customerRouter = (0, express_1.Router)();
customerRouter.get("/allcustomers", (0, auth_permissions_1.authPermissions)(["viewCustomers"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield customer_service_1.default.getAllCustomers();
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
customerRouter.get("customer/:mobilenumber", (0, auth_permissions_1.authPermissions)(["viewCustomers"]), ...customer_validations_1.getCustomerValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mobileNumber = req.params.mobilenumber;
        console.log(mobileNumber);
        const result = yield customer_service_1.default.getSpecificCustomer(mobileNumber);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
exports.default = new routes_types_1.Route("/customer", customerRouter);
