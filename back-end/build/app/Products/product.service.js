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
exports.deleteProduct = exports.updateProduct = exports.getSpecificProduct = exports.getAllProduct = exports.addProduct = void 0;
const product_repo_1 = __importDefault(require("./product.repo"));
const product_responses_1 = require("./product.responses");
const inventoy_service_1 = __importDefault(require("../inventory/inventoy.service"));
const addProduct = (product, manufacturerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        product.createdBy = manufacturerId;
        const newProduct = product_repo_1.default.insertOne(product);
        if (!newProduct)
            throw product_responses_1.productResponses.CAN_NOT_ADD_PRODUCT;
        yield inventoy_service_1.default.addProductToInventory(newProduct._id.toString());
        return product_responses_1.productResponses.PRODUCT_ADDED;
    }
    catch (e) {
        throw e;
    }
});
exports.addProduct = addProduct;
const getAllProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_repo_1.default.getAllProduct();
        if (!products)
            throw product_responses_1.productResponses.PRODUCTS_NOT_FOUND;
        return products;
    }
    catch (e) {
        throw e;
    }
});
exports.getAllProduct = getAllProduct;
const getSpecificProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_repo_1.default.getSpecificProduct(productId);
        if (!product)
            throw product_responses_1.productResponses.PRODUCTS_NOT_FOUND;
        return product;
    }
    catch (e) {
        throw e;
    }
});
exports.getSpecificProduct = getSpecificProduct;
const updateProduct = (updatedFields, productId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        updatedFields.updatedBy = userId;
        const isUpdated = yield product_repo_1.default.updateProduct(updatedFields, productId);
        if (!isUpdated)
            throw product_responses_1.productResponses.CANNOT_UPDATE_PRODUCT;
        return product_responses_1.productResponses.PRODUCT_UPDATED;
    }
    catch (e) {
        throw e;
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isDeleted = yield product_repo_1.default.deleteProduct(productId);
        if (!isDeleted)
            throw product_responses_1.productResponses.CAN_NOT_DELETE_PRODUCT;
        return product_responses_1.productResponses.PRODUCT_DELETED_SUCCESSFULLY;
    }
    catch (e) {
        throw e;
    }
});
exports.deleteProduct = deleteProduct;
exports.default = {
    addProduct: exports.addProduct,
    getAllProduct: exports.getAllProduct,
    getSpecificProduct: exports.getSpecificProduct,
    updateProduct: exports.updateProduct,
    deleteProduct: exports.deleteProduct,
};
