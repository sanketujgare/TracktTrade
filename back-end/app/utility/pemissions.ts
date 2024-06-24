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

export type Role = "Manufacturer" | "Distributor";

export const roles: Role[] = ["Manufacturer", "Distributor"];

export const permissionsToCreate = [
    "createDistributor",
    "createProduct",
    "createMerchandise",
];
export const viewUser = ["viewCustomer", "viewDistributor"];
export const updateDistributor = [""];
