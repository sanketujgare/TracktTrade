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
const merchandise_validations_1 = require("./merchandise.validations");
const merchandise_service_1 = __importDefault(require("./merchandise.service"));
const response_handler_1 = require("../utility/response-handler");
const auth_permissions_1 = require("../utility/auth-permissions");
const pemissions_1 = require("../utility/pemissions");
const merchandiseRouter = (0, express_1.Router)();
merchandiseRouter.post("/add-merchandise", (0, auth_permissions_1.authPermissions)(pemissions_1.permissionsToCreate), ...merchandise_validations_1.merchandiseValidations, (req, res, next) => {
    try {
        const manufacturerId = req.currentUser._id;
        const result = merchandise_service_1.default.addMerchandise(req.body, manufacturerId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
});
merchandiseRouter.get("/allmerchandise/:page/:limit", (0, auth_permissions_1.authPermissions)(["viewMerchandise"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit } = req.params;
        const result = yield merchandise_service_1.default.getAllMerchandise(parseInt(page), parseInt(limit));
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
merchandiseRouter.get("/request/:status/:page/:limit", (0, auth_permissions_1.authPermissions)(["viewRedeemRequest"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status, page, limit } = req.params;
        const distributorId = req.query.userid;
        const result = yield merchandise_service_1.default.getMerchandiseRequests(status, parseInt(page), parseInt(limit), distributorId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
merchandiseRouter.post("/redeem", (0, auth_permissions_1.authPermissions)(["redeemMerchandise"]), ...merchandise_validations_1.redeemRequestValidation, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield merchandise_service_1.default.reedeemMerchandises(req.body);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
merchandiseRouter.put("/approve", (0, auth_permissions_1.authPermissions)(["approveMerchandise"]), ...merchandise_validations_1.approveValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield merchandise_service_1.default.updateMerchandiseRequestStatus(req.body);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
merchandiseRouter.put("/update/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const manufacturerId = req.currentUser._id;
        const merchandiseId = req.params.id;
        const result = yield merchandise_service_1.default.findByIdAndUpdate(merchandiseId, req.body, manufacturerId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
merchandiseRouter.delete("/delete/:id", (0, auth_permissions_1.authPermissions)(["deleteMerchandise"]), ...merchandise_validations_1.deleteAndUpdateValidation, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const merchandiseId = req.params.id;
        const result = yield merchandise_service_1.default.deleteById(merchandiseId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
exports.default = new routes_types_1.Route("/merchandise", merchandiseRouter);
