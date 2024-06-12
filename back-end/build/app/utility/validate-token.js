"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const validateToken = (excludedRoutes) => (req, res, next) => {
    var _a;
    try {
        const isExcludedRoute = excludedRoutes.some((r) => r.path(req.path) && r.method === req.method);
        if (isExcludedRoute) {
            return next();
        }
        const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            throw new Error("Access Denied. No valid Token.");
        }
        const { JWT_SECRET } = process.env;
        const payload = (0, jsonwebtoken_1.verify)(token, JWT_SECRET);
        req.currentUser = payload;
        next();
    }
    catch (e) {
        next({
            statusCode: 401,
            message: "UNAUTHORIZED ACCESS",
        });
    }
};
exports.validateToken = validateToken;
