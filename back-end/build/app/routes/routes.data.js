"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.excludedRoutes = exports.routes = void 0;
const path_to_regexp_1 = require("path-to-regexp");
const auth_routes_1 = __importDefault(require("../auth/auth.routes"));
const order_routes_1 = __importDefault(require("../orders/order.routes"));
const product_routes_1 = __importDefault(require("../Products/product.routes"));
const sales_routes_1 = __importDefault(require("../sales/sales.routes"));
const user_routes_1 = __importDefault(require("../users/user.routes"));
const merchandise_routes_1 = __importDefault(require("../merchandise/merchandise.routes"));
const inventory_routes_1 = __importDefault(require("../inventory/inventory.routes"));
exports.routes = [
    auth_routes_1.default,
    user_routes_1.default,
    product_routes_1.default,
    order_routes_1.default,
    merchandise_routes_1.default,
    sales_routes_1.default,
    inventory_routes_1.default,
];
exports.excludedRoutes = [
    {
        path: (0, path_to_regexp_1.match)("/auth/login"),
        method: "POST",
    },
    {
        path: (0, path_to_regexp_1.match)("/auth/signup"),
        method: "POST",
    },
];
