export interface IPermissions {
    Manufacturer: string[];
    Distributor: string[];
}

export const permissions: IPermissions = {
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

export type Role = "Manufacturer" | "Distributor";

export const roles: Role[] = ["Manufacturer", "Distributor"];

export const permissionsToCreate = [
    "createDistributor",
    "createProduct",
    "createMerchandise",
];
export const viewUser = ["viewCustomer", "viewDistributor"];
