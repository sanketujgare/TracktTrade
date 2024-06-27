"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.aggregate = exports.createSales = void 0;
const sales_schema_1 = __importDefault(require("./sales.schema"));
const createSales = (sale) => {
    const newSale = new sales_schema_1.default(sale);
    newSale.save();
    return newSale;
};
exports.createSales = createSales;
const aggregate = (pipeline) => sales_schema_1.default.aggregate(pipeline);
exports.aggregate = aggregate;
exports.default = {
    createSales: exports.createSales,
    aggregate: exports.aggregate,
};
