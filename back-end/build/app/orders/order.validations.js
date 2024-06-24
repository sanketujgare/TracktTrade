"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderValidations = exports.orderValidations = void 0;
const validator_1 = require("../utility/validator");
const orders_types_1 = require("./orders.types");
exports.orderValidations = [(0, validator_1.body)(orders_types_1.orderSchema)];
exports.UpdateOrderValidations = [(0, validator_1.body)(orders_types_1.statusUpdate)];
