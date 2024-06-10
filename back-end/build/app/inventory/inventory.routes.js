"use strict";
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
inventoryRouter.get("/getinventory/:userid", (req, res, next) => {
    try {
        const userId = req.params.userid || req.currentUser._id;
        //   const result =
    }
    catch (e) {
        next(e);
    }
});
inventoryRouter.put("/update", ...inventory_validations_1.inventoryValidations, (req, res, next) => {
    try {
        const manufacturerId = req.currentUser._id;
        const result = inventoy_service_1.default.updateInventory(manufacturerId, req.body.inventory);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});
exports.default = new routes_types_1.Route("/inventory", inventoryRouter);
