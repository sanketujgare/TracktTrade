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
merchandiseRouter.get("/allmerchandise", (0, auth_permissions_1.authPermissions)(["viewAllMerchandise"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield merchandise_service_1.default.getAllMerchandise();
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
exports.default = new routes_types_1.Route("/merchandise", merchandiseRouter);
