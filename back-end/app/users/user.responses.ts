import { IUserResponses } from "./user.types";

export const userResponses: IUserResponses = {
    USER_NOT_FOUND: {
        statusCode: 404,
        message: "USER NOT FOUND",
    },
    VALIDATION_ERROR: {
        statusCode: 400,
        message: "VALIDATION ERROR",
    },
    USER_CREATED_SUCCESSFULLY: {
        statusCode: 201,
        message: "USER CREATED SUCCESSFULLY",
    },

    USER_DELETED_SUCCESSFULLY: {
        statusCode: 200,
        message: "USER DELETED SUCCESSFULLY",
    },
    CANNOT_CREATE_USER: {
        statusCode: 400,
        message: "CAN NOT CREATE USER",
    },
    COULD_NOT_UPDATE_PURCHACE_HISTORY: {
        statusCode: 400,
        message: "COULD NOT UPDATE CUSTOMERS PURCHACE HISTORY",
    },
    PURCHACE_HISTORY_UPDATED: {
        statusCode: 200,
        message: "CUSTOMER PURCHACE HISTORY UPDATED",
    },
    CANNOT_CREATE_CUSTOMER: {
        statusCode: 400,
        message: "CAN NOT CREATE USER",
    },
    NEW_CUSTOMER_CREATED: {
        statusCode: 200,
        message: "NEW CUSTOMER CREATED",
    },
};
