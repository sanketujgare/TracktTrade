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
exports.updateOrderStatus = exports.getSpecificOrder = exports.aggregate = exports.getAllorders = exports.placeOrder = void 0;
const order_schema_1 = __importDefault(require("./order.schema"));
const placeOrder = (order) => {
    const newOrder = new order_schema_1.default(order);
    newOrder.save();
    return newOrder;
};
exports.placeOrder = placeOrder;
const getAllorders = (status, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_schema_1.default
        .find({ status: status })
        .skip((page - 1) * limit)
        .limit(limit);
    return orders;
});
exports.getAllorders = getAllorders;
const aggregate = (pipeline) => order_schema_1.default.aggregate(pipeline);
exports.aggregate = aggregate;
const getSpecificOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_schema_1.default.findById(orderId);
    return order;
});
exports.getSpecificOrder = getSpecificOrder;
const updateOrderStatus = (updates, orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield order_schema_1.default.findByIdAndUpdate(orderId, updates);
    return isUpdated;
});
exports.updateOrderStatus = updateOrderStatus;
exports.default = {
    placeOrder: exports.placeOrder,
    getAllorders: exports.getAllorders,
    getSpecificOrder: exports.getSpecificOrder,
    updateOrderStatus: exports.updateOrderStatus,
    aggregate: exports.aggregate,
};
