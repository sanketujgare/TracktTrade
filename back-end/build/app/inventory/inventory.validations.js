"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryValidations = void 0;
const validator_1 = require("../utility/validator");
const inventory_types_1 = require("./inventory.types");
exports.inventoryValidations = [(0, validator_1.body)(inventory_types_1.inventorySchema)];
