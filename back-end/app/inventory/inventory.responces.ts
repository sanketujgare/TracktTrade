import { IInventoryResponses } from "./inventory.types";

export const inventoryResponses: IInventoryResponses = {
  CANNOT_UPDATE_INVENTORY: {
    statusCode: 400,
    message: "CAN NOT UPDATE INVENTORY",
  },
  INVENTORY_UPDATED: {
    statusCode: 400,
    message: "INVENTORY UPDATED",
  },
  EMPTY_INVENTORY: {
    statusCode: 400,
    message: "NO ITEMS FOUND IN INVENTORY ITS EMPTY",
  },
};
