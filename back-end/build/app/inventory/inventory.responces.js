"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryResponses = void 0;
exports.inventoryResponses = {
    CAN_NOT_UPDATE_INVENTORY: {
        statusCode: 400,
        message: "CAN NOT UPDATE INVENTORY",
    },
    INVENTORY_UPDATED: {
        statusCode: 200,
        message: "INVENTORY UPDATED",
    },
    EMPTY_INVENTORY: {
        statusCode: 400,
        message: "NO ITEMS FOUND IN INVENTORY ITS EMPTY",
    },
    NO_DATA_FOUND: {
        statusCode: 404,
        message: "NO DATA FOUND",
    },
};
