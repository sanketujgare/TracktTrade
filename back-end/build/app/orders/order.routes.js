"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_types_1 = require("../routes/routes.types");
const order_service_1 = __importDefault(require("./order.service"));
const response_handler_1 = require("../utility/response-handler");
const orderRouter = (0, express_1.Router)();
orderRouter.post("/placeorder", (req, res, next) => {
    try {
        const result = order_service_1.default.placeOrder(req.body);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});
orderRouter.put("/update/:orderid", (req, res, next) => {
    try {
        const updates = req.body;
        const manufacturerId = req.currentUser._id;
        const orderId = req.params.orderid;
        const result = order_service_1.default.updateOrderStatus(updates, orderId, manufacturerId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});
exports.default = new routes_types_1.Route("/order", orderRouter);
