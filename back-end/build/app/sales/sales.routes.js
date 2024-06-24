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
const sales_service_1 = __importDefault(require("./sales.service"));
const response_handler_1 = require("../utility/response-handler");
const auth_permissions_1 = require("../utility/auth-permissions");
const sales_validation_1 = require("./sales.validation");
const sales_schema_1 = __importDefault(require("./sales.schema"));
const salesRouter = (0, express_1.Router)();
salesRouter.post("/create-sales", (0, auth_permissions_1.authPermissions)(["createSales"]), ...sales_validation_1.salesValidations, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield sales_service_1.default.createSales(req.body);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (e) {
        next(e);
    }
}));
salesRouter.get("/topperformers", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("here");
        const results = yield sales_schema_1.default.aggregate([
            {
                $group: {
                    _id: "$distributorId",
                    totalRevenue: { $sum: "$totalPrice" },
                },
            },
            { $sort: { totalRevenue: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "distributorDetails",
                },
            },
            { $unwind: "$distributorDetails" },
            {
                $project: {
                    distributorId: "$_id",
                    totalRevenue: 1,
                    distributorName: "$distributorDetails.name",
                    _id: 0,
                },
            },
        ]);
        res.send(new response_handler_1.ResponseHandler(results));
    }
    catch (e) {
        next(e);
    }
}));
exports.default = new routes_types_1.Route("/sales", salesRouter);
