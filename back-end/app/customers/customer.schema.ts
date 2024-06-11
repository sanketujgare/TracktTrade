import { model } from "mongoose";
import { BaseSchema } from "../utility/base.schema";
import { ICustomerSchema } from "./customer.types";

export const customerSchema = new BaseSchema({
    name: {
        type: String,
    },
    mobileNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    purchaseHistory: [
        {
            salesId: {
                type: String,
                ref: "Sale",
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
});

const customerModel = model<ICustomerSchema>("Customer", customerSchema);
export default customerModel;
