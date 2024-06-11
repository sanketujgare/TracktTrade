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
    CAN_NOT_UPDATE_USER: {
        statusCode: 400,
        message: "CAN NOT UPDATE USER",
    },
    USER_UPDATED_SUCCESSFULLY: {
        statusCode: 200,
        message: "USER UPDATED SUCCESSFULLY",
    },
};
