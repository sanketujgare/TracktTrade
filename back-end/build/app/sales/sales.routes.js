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
const sales_service_1 = __importDefault(require("./sales.service"));
const response_handler_1 = require("../utility/response-handler");
const auth_permissions_1 = require("../utility/auth-permissions");
const sales_validation_1 = require("./sales.validation");
const salesRouter = (0, express_1.Router)();
salesRouter.post("/create-sales", (0, auth_permissions_1.authPermissions)(["createSales"]), ...sales_validation_1.salesValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield sales_service_1.default.createSales(req.body);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
salesRouter.get("/salesperproduct", (0, auth_permissions_1.authPermissions)(["viewSalesPerProduct"]), ...sales_validation_1.dateRangeValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startdate, enddate, distributorId } = req.query;
        const start = new Date(startdate);
        const end = new Date(enddate);
        const userId = distributorId;
        const result = yield sales_service_1.default.getSalesPerProduct(start, end, userId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
salesRouter.get("/topperformers", (0, auth_permissions_1.authPermissions)(["viewTopPerformers"]), ...sales_validation_1.dateRangeValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startdate, enddate } = req.query;
        const start = new Date(startdate);
        const end = new Date(enddate);
        const result = yield sales_service_1.default.getTopPerformers(start, end);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
salesRouter.get("/topselling", (0, auth_permissions_1.authPermissions)(["viewTopSelling"]), ...sales_validation_1.dateRangeValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { startdate, enddate, distributorId } = req.query;
        const start = new Date(startdate);
        const end = new Date(enddate);
        const userId = distributorId;
        const result = yield sales_service_1.default.getTopSellingProducts(start, end, userId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
exports.default = new routes_types_1.Route("/sales", salesRouter);
