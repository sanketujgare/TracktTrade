"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderResponses = void 0;
exports.orderResponses = {
    CAN_NOT_PLACE_ORDER: {
        statusCode: 420,
        message: "CAN NOT PLACE ORDER",
    },
    ORDER_PLACED_SUCCESSFULLY: {
        statusCode: 200,
        message: "ORDER PLACED SUCCESSFULLY",
    },
    ORDERS_NOT_FOUND: {
        statusCode: 404,
        message: "PRODUCTS NOT FOUND",
    },
    CAN_NOT_UPDATE_ORDER: {
        statusCode: 400,
        message: "CAN NOT UPDATE PRODUCT",
    },
    ORDER_STATUS_UPDATED: {
        statusCode: 200,
        message: "ORDER STATUS UPDATED SUCCESSFULLY",
    },
    ORDER_OR_USER_NOT_FOUND: {
        statusCode: 404,
        message: "ORDER OR USER NOT FOUND",
    },
};
