export interface IPermissions {
    Manufacturer: string[];
    Distributor: string[];
}

export const permissions: IPermissions = {
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

export type Role = "Manufacturer" | "Distributor";

export const roles: Role[] = ["Manufacturer", "Distributor"];

export const permissionsToCreate = [
    "createDistributor",
    "createProduct",
    "createMerchandise",
];
export const viewUser = ["viewCustomer", "viewDistributor"];

export default {};
