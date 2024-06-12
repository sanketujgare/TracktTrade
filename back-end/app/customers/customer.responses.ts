import { ICustomerResponses } from "./customer.types";

export const customerResponses: ICustomerResponses = {
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
