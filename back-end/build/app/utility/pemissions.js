"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewUser = exports.permissionsToCreate = exports.roles = exports.permissions = void 0;
exports.permissions = {
    Manufacturer: [
        "createDistributor",
        "createProduct",
        "createMerchandise",
        "viewAllMerchandise",
        "viewCustomer",
        "viewAllProducts",
    ],
    Distributor: [],
};
exports.roles = ["Manufacturer", "Distributor"];
exports.permissionsToCreate = [
    "createDistributor",
    "createProduct",
    "createMerchandise",
];
exports.viewUser = ["viewCustomer", "viewDistributor"];
exports.default = {};
