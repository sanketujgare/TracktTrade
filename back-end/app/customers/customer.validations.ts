import { params } from "../utility/validator";
import { mobileNumber } from "./customer.types";

export const getCustomerValidations = [params(mobileNumber)];
