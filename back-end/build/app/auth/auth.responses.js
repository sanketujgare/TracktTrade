"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResponses = void 0;
exports.authResponses = {
    INVALID_CREDENTIALS: {
        statusCode: 400,
        message: "Invalid credentials",
    },
    EMAIL_ALREADY_EXISTS: {
        statusCode: 400,
        message: "Email already exists",
    },
    USERNAME_ALREADY_EXISTS: {
        statusCode: 400,
        message: "Username already exists",
    },
    USER_REGISTRATION_FAILED: {
        statusCode: 500,
        message: "User registration failed",
    },
    SOMETHING_WENT_WRONG: {
        statusCode: 500,
        message: "Something went wrong",
    },
    USER_IS_NOT_AUTHORIZED: {
        statusCode: 401,
        message: "User is not authorized",
    },
};
