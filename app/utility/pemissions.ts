export interface permissionsI {
  boardAdmin: string[];
  boardMember: string[];
  superAdmin: string[];
  supervisor: string[];
  fieldStaff: string[];
  customer: string[];
}

export const permissions: permissionsI = {
  boardAdmin: [
    "createBoardMember",
    "deleteBoardMember",
    "viewAllCustomers",
    "deleteCustomer",
    "assignMeter",
    "updateCustomer",
    "configureServices",
    "uploadBulk",
    "createCustomer",
    "viewDeletedCustomers",
    "getTotalCustomersCount",
    "viewCustomer",
    "viewMeter",
    "searchCustomers",
  ],
  boardMember: [
    "viewAllCustomers",
    "deleteCustomer",
    "assignMeter",
    "updateCustomer",
    "createCustomer",
    "viewDeletedCustomers",
    "viewCustomer",
    "configureServices",
    "viewMeter",
    "searchCustomers",
  ],
  superAdmin: [
    "searchEmployees",
    "searchCustomers",
    "deleteEmployee",
    "viewAllCustomer",
    "viewAllEmployees",
    "getTotalCustomersCount",
    "getTotalEmployeeCount",
    "createEmployee",
    "updateEmployee",
    "viewCustomer",
    "viewEmployee",
    "viewAllBoards",
    "createBoard",
    "deleteBoard",
    "viewMeter",
  ],
  supervisor: [
    "searchEmployees",
    "viewAllCustomer",
    "viewAllEmployees",
    "viewTickets",
    "updateTickets",
  ],
  fieldStaff: ["viewAllCustomers", "viewPendingReadings", "uploadReadings"],
  customer: ["viewBills", "raiseticket"],
};

export type Role =
  | "boardAdmin"
  | "boardMember"
  | "superAdmin"
  | "supervisor"
  | "fieldStaff"
  | "customer";

export const roles: Role[] = [
  "boardAdmin",
  "boardMember",
  "superAdmin",
  "supervisor",
  "fieldStaff",
  "customer",
];

export const permissionsToCreate = [
  "createBoardMember",
  "createCustomer",
  "createEmployee",
];

export const permissionsToViewUser = ["viewCustomer", "viewEmployee"];
export const permissionsToViewAllCustomers = ["viewAllCustomers"];
export const permissionsToViewAllEmployees = ["viewAllEmployees"];
export const permissionsToDeleteCustomer = ["deleteCustomer"];
export const permissionsTODeleteBoardMember = ["deleteBoardMember"];
export const permissionsToViewDeleted = ["viewDeletedCustomers"];
export const permissionsToAssignMeter = ["assignMeter"];
export const permissionsToCreateBoard = ["createBoard"];
export const permissionsToDeleteBoard = ["deleteBoard"];
export const permissionsToDeleteEmployee = ["deleteEmployee"];
export const permissionsToViewMeter = ["viewMeter"];
export const permissionsToSearchEmp = ["searchEmployees"];
export const permissionsTosearchCustomer = ["viewAllCustomer"];
export const permissionsToUpdateCustomers = ["updateCustomer"];
export const permissionsToCreateBoardMember = ["createBoardMember"];
export const permissionsToConfigureServices = ["configureServices"];
export const permissionsToUploadBulk = ["uploadBulk"];
export const permissionsToGetTotalCustomersCount = ["getTotalCustomersCount"];
export const permissionsToGetTotalEmployeeCount = ["getTotalEmployeeCount"];

export default {
  permissionsToAssignMeter,
  permissionsToCreate,
  permissionsToViewAllCustomers,
  permissionsToViewDeleted,
  permissionsToViewUser,
  permissionsToCreateBoard,
  permissionsToDeleteCustomer,
};
