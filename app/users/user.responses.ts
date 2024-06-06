import { IUserResponses } from "./user.types";

export const userResponses: IUserResponses = {
  USER_NOT_FOUND: {
    statusCode: 404,
    message: "User not found",
  },
  VALIDATION_ERROR: {
    statusCode: 400,
    message: "Validation error",
  },
  USER_CREATED_SUCCESSFULLY: {
    statusCode: 201,
    message: "User created successfully",
  },
  NO_CUSTOMERS_FOUND: {
    statusCode: 404,
    message: "No customers found",
  },
  USER_DELETED_SUCCESSFULLY: {
    statusCode: 200,
    message: "User deleted successfully",
  },
  CANNOT_CREATE_USER: {
    statusCode: 400,
    message: "Cannot create user",
  },
};
