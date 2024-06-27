"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateRangeValidations = exports.salesValidations = void 0;
const validator_1 = require("../utility/validator");
const sales_types_1 = require("./sales.types");
exports.salesValidations = [(0, validator_1.body)(sales_types_1.salesSchema)];
exports.dateRangeValidations = [(0, validator_1.query)(sales_types_1.dateRangeSchema)];
