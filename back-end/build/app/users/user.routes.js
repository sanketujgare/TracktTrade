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
const user_service_1 = __importDefault(require("./user.service"));
const response_handler_1 = require("../utility/response-handler");
const user_validations_1 = require("./user.validations");
const pemissions_1 = require("../utility/pemissions");
const auth_permissions_1 = require("../utility/auth-permissions");
const userRouter = (0, express_1.Router)();
userRouter.post("/create-user", (0, auth_permissions_1.authPermissions)(pemissions_1.permissionsToCreate), ...user_validations_1.createValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const creatorId = req.currentUser._id;
        const creatorEmail = req.currentUser.email;
        const result = yield user_service_1.default.createUser(req.body, creatorId, creatorEmail);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
userRouter.get("/profile", (0, auth_permissions_1.authPermissions)(["viewProfile"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.currentUser._id;
        const result = yield user_service_1.default.getUserById(userId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
userRouter.get("/getuser/:id", ...user_validations_1.getAndDeleteValidations, (0, auth_permissions_1.authPermissions)(pemissions_1.viewUser), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const result = yield user_service_1.default.getUserById(userId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
userRouter.get("/distributors/:page/:limit", (0, auth_permissions_1.authPermissions)(pemissions_1.viewUser), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit } = req.params;
        const result = yield user_service_1.default.getAllDistributors(parseInt(page), parseInt(limit));
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
userRouter.put("/update/:id", (0, auth_permissions_1.authPermissions)(["updateDistributor"]), ...user_validations_1.updateValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const updatorId = req.currentUser._id;
        const result = yield user_service_1.default.updateUser(req.body, userId, updatorId);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
userRouter.delete("/delete/:id", (0, auth_permissions_1.authPermissions)(["deleteUser"]), ...user_validations_1.getAndDeleteValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const deletedBy = req.currentUser._id;
        const result = yield user_service_1.default.deleteUserById(userId, deletedBy);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
exports.default = new routes_types_1.Route("/user", userRouter);
