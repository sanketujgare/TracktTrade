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
    CAN_NOT_REDEEM_MERCHANDISE: {
        statusCode: 400,
        message: "CAN NOT UPDATE REDEEMED MERCHANDISES",
    },
    REQUESTED_TO_REDEEM_MERCHANDISE: {
        statusCode: 200,
        message: "REQUESTED TO REDDEM MERCHANDISE",
    },
    CAN_NOT_UPDATE_REQUEST_STATUS: {
        statusCode: 400,
        message: " CAN NOT UPDATE REWUEST STATUS",
    },
    MERCHANDISE_APPROVED: {
        statusCode: 200,
        message: "MERCHANDISE APPROVED",
    },
    CAN_NOT_UPDATE_MERCHANDISE: {
        statusCode: 400,
        message: "CAN NOT UPDATE MERCHANDISE",
    },
    MERCHANDISE_UPDATED: {
        statusCode: 200,
        message: "MERCHANDISE UPDATED SUCCESSFULLY",
    },
    CAN_NOT_DELETE_MERCHANDISE: {
        statusCode: 400,
        message: "CAN NOT DELETE MERCHANDISE",
    },
    MERCHANDISE_DELETED: {
        statusCode: 200,
        message: "MERCHANDISE DELETED SUCCESSFULLY",
    },
};
