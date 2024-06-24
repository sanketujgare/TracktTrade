"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDistributor = exports.viewUser = exports.permissionsToCreate = exports.roles = exports.permissions = void 0;
exports.permissions = {
    Manufacturer: [
        "createDistributor",
        "createProduct",
        "createMerchandise",
        "updateDistributor",
        "updateProduct",
        "updateMerchandise",
        "updateInventory",
        "updateOrder",
        "viewInventory",
        "viewMerchandise",
        "viewCustomers",
        "viewProducts",
        "viewDistrinutors",
        "completeOrder",
        "viewCustomer",
        "deleteProduct",
        "deleteUser",
        "viewOwnInventory",
    ],
    Distributor: [
        "redeemMerchandise",
        "placeOrder",
        "createSales",
        "viewProducts",
        "viewOwnInventory",
    ],
};
exports.roles = ["Manufacturer", "Distributor"];
exports.permissionsToCreate = [
    "createDistributor",
    "createProduct",
    "createMerchandise",
];
exports.viewUser = ["viewCustomer", "viewDistributor"];
exports.updateDistributor = [""];
