"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getSpecificProduct = exports.getAllProduct = exports.insertOne = void 0;
const product_schema_1 = __importDefault(require("./product.schema"));
const insertOne = (product) => {
    const newProduct = new product_schema_1.default(product);
    newProduct.save();
    return newProduct;
};
exports.insertOne = insertOne;
const getAllProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_schema_1.default.find();
    return products;
});
exports.getAllProduct = getAllProduct;
const getSpecificProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = product_schema_1.default.findById(productId);
    return product;
});
exports.getSpecificProduct = getSpecificProduct;
const updateProduct = (updateFields, productId) => __awaiter(void 0, void 0, void 0, function* () {
    const isUpdated = yield product_schema_1.default.findByIdAndUpdate(productId, updateFields);
    return isUpdated;
});
exports.updateProduct = updateProduct;
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const isDeleted = yield product_schema_1.default.findByIdAndDelete({ productId });
    return isDeleted;
});
exports.deleteProduct = deleteProduct;
exports.default = {
    insertOne: exports.insertOne,
    getAllProduct: exports.getAllProduct,
    getSpecificProduct: exports.getSpecificProduct,
    updateProduct: exports.updateProduct,
    deleteProduct: exports.deleteProduct,
};
