import { IAuthResponses } from "./auth.types";

export const authResponses: IAuthResponses = {
    INVALID_CREDENTIALS: {
        statusCode: 400,
        message: "INVALID CREDENTIALS",
    },
    EMAIL_ALREADY_EXISTS: {
        statusCode: 400,
        message: "EMAIL ALREADY EXISTS",
    },
    USERNAME_ALREADY_EXISTS: {
        statusCode: 400,
        message: "USERNAME ALREADY EXISTS",
    },
    MOBILE_NUMBER_ALREADY_EXISTS: {
        statusCode: 400,
        message: "MOBILE NUMBER ALREADY EXISTS",
    },
    USER_REGISTRATION_FAILED: {
        statusCode: 500,
        message: "USER REGISTRATION FAILED",
    },
    SOMETHING_WENT_WRONG: {
        statusCode: 500,
        message: "SOMETHING WENT WRONG",
    },
    USER_IS_NOT_AUTHORIZED: {
        statusCode: 401,
        message: "USER IS NOT AUTHORIZED",
    },
};
