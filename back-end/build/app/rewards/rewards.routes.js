"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_types_1 = require("../routes/routes.types");
const rewardRouter = (0, express_1.Router)();
exports.default = new routes_types_1.Route("/reward", rewardRouter);
