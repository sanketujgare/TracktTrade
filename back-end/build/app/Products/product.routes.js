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
const express_1 = require("express");
const routes_types_1 = require("../routes/routes.types");
const product_validations_1 = require("./product.validations");
const product_service_1 = __importDefault(require("./product.service"));
const response_handler_1 = require("../utility/response-handler");
const auth_permissions_1 = require("../utility/auth-permissions");
const pemissions_1 = require("../utility/pemissions");
const productRouter = (0, express_1.Router)();
productRouter.post("/add-product", (0, auth_permissions_1.authPermissions)(pemissions_1.permissionsToCreate), ...product_validations_1.productValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const manufacturerId = req.currentUser._id;
        const creatorEmail = req.currentUser.email;
        const result = yield product_service_1.default.addProduct(req.body, manufacturerId, creatorEmail);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
productRouter.get("/allproducts/:page/:limit", (0, auth_permissions_1.authPermissions)(["viewProducts"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit } = req.params;
        const result = yield product_service_1.default.getAllProduct(parseInt(page), parseInt(limit));
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
productRouter.get("/product/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const result = yield product_service_1.default.getProductById(productId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
productRouter.put("/update/:id", (0, auth_permissions_1.authPermissions)(["updateProduct"]), ...product_validations_1.updateValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const userId = req.currentUser._id;
        const result = yield product_service_1.default.updateProduct(req.body, productId, userId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
productRouter.delete("/delete/:id", (0, auth_permissions_1.authPermissions)(["deleteProduct"]), ...product_validations_1.getAndDeleteValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const result = yield product_service_1.default.deleteProduct(productId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
exports.default = new routes_types_1.Route("/product", productRouter);
