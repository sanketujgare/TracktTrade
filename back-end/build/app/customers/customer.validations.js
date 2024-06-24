"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerValidations = void 0;
const validator_1 = require("../utility/validator");
const customer_types_1 = require("./customer.types");
exports.getCustomerValidations = [(0, validator_1.params)(customer_types_1.mobileNumber)];
