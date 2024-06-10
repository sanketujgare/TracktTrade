"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createValidations = void 0;
const validator_1 = require("../utility/validator");
const user_types_1 = require("./user.types");
exports.createValidations = [(0, validator_1.body)(user_types_1.userSchema)];
