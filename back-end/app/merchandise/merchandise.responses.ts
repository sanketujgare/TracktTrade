import { IMerchandiseResponses } from "./merchandise.types";

export const merchandiseResponses: IMerchandiseResponses = {
    CAN_NOT_ADD_MERCHANDISE: {
        statusCode: 400,
        message: "CAN NOT ADD MERCHANDISE",
    },
    MERCHANDISE_ADDED: {
        statusCode: 200,
        message: "MERCHANDISE ADDED SUCCESSFULLY",
    },
    MERCHANDISE_NOT_FOUND: {
        statusCode: 404,
        message: "MERCHANDISE NOT FOUND",
    },
};
