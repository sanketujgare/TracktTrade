"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidations = exports.loginValidations = void 0;
const user_types_1 = require("../users/user.types");
const validator_1 = require("../utility/validator");
exports.loginValidations = [(0, validator_1.body)(user_types_1.credentials)];
exports.signupValidations = [(0, validator_1.body)(user_types_1.userSchema)];
