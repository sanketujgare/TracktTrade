import { IInventoryResponses } from "./inventory.types";

export const inventoryResponses: IInventoryResponses = {
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
