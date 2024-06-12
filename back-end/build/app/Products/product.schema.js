"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../utility/base.schema");
const productSchema = new base_schema_1.BaseSchema({
    productName: {
        type: String,
    },
    productDescription: {
        type: String,
    },
    productPrice: {
        type: Number,
    },
    productImage: {
        type: String,
    },
});
const productModel = (0, mongoose_1.model)("Product", productSchema);
exports.default = productModel;
