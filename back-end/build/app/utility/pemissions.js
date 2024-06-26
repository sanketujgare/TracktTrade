"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewUser = exports.permissionsToCreate = exports.roles = exports.permissions = void 0;
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
        "viewOrders",
        "viewInventory",
        "viewMerchandise",
        "viewCustomers",
        "viewProducts",
        "viewDistrinutors",
        "completeOrder",
        "viewCustomer",
        "deleteProduct",
        "deleteUser",
        "deleteMerchandise",
        "viewOwnInventory",
        "viewRedeemRequest",
        "approveMerchandise",
        "viewSalesPerProduct",
        "viewTopPerformers",
        "viewTopSelling",
        "viewProfile",
    ],
    Distributor: [
        "redeemMerchandise",
        "placeOrder",
        "createSales",
        "viewProducts",
        "viewOwnInventory",
        "viewMerchandise",
        "viewTopSelling",
        "viewRedeemRequest",
        "viewSalesPerProduct",
        "viewProfile",
    ],
};
exports.roles = ["Manufacturer", "Distributor"];
exports.permissionsToCreate = [
    "createDistributor",
    "createProduct",
    "createMerchandise",
];
exports.viewUser = ["viewCustomer", "viewDistributor"];
