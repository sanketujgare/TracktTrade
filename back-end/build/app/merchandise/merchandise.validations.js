"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAndUpdateValidation = exports.approveValidations = exports.redeemRequestValidation = exports.merchandiseValidations = void 0;
const validator_1 = require("../utility/validator");
const merchandise_types_1 = require("./merchandise.types");
exports.merchandiseValidations = [(0, validator_1.body)(merchandise_types_1.merchandiseSchema)];
exports.redeemRequestValidation = [(0, validator_1.body)(merchandise_types_1.redeemRequest)];
exports.approveValidations = [(0, validator_1.body)(merchandise_types_1.udpateRequestSchema)];
exports.deleteAndUpdateValidation = [(0, validator_1.params)(merchandise_types_1.id)];
