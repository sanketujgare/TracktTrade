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
const inventoy_service_1 = __importDefault(require("./inventoy.service"));
const response_handler_1 = require("../utility/response-handler");
const inventory_validations_1 = require("./inventory.validations");
const inventoryRouter = (0, express_1.Router)();
inventoryRouter.get("/getinventory", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.currentUser._id;
        const result = yield inventoy_service_1.default.getInventory(userId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
inventoryRouter.get("/getinventory/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const result = yield inventoy_service_1.default.getInventory(userId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
inventoryRouter.put("/update", ...inventory_validations_1.inventoryValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const manufacturerId = req.currentUser._id;
        const result = yield inventoy_service_1.default.updateManufacturersInventory(manufacturerId, req.body);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
exports.default = new routes_types_1.Route("/inventory", inventoryRouter);
