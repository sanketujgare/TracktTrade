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
const order_service_1 = __importDefault(require("./order.service"));
const response_handler_1 = require("../utility/response-handler");
const auth_permissions_1 = require("../utility/auth-permissions");
const order_validations_1 = require("./order.validations");
const orderRouter = (0, express_1.Router)();
orderRouter.get("/allorder/:field/:page/:limit", (0, auth_permissions_1.authPermissions)(["viewOrders"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit } = req.params;
        const status = req.params.field;
        const result = yield order_service_1.default.getAllOrders(status, parseInt(page), parseInt(limit));
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
orderRouter.post("/placeorder", (0, auth_permissions_1.authPermissions)(["placeOrder"]), ...order_validations_1.orderValidations, (req, res, next) => {
    try {
        const result = order_service_1.default.placeOrder(req.body);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});
orderRouter.put("/update/:orderid", (0, auth_permissions_1.authPermissions)(["updateOrder"]), ...order_validations_1.UpdateOrderValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updates = req.body;
        const manufacturerId = req.currentUser._id;
        const orderId = req.params.orderid;
        const result = yield order_service_1.default.updateOrderStatus(updates, orderId, manufacturerId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
exports.default = new routes_types_1.Route("/order", orderRouter);
