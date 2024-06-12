"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPermissions = void 0;
const pemissions_1 = require("./pemissions");
const authPermissions = (requiredPermissions) => (req, res, next) => {
    try {
        const userRoles = req.currentUser.role;
        let flag = false;
        if (pemissions_1.permissions[userRoles]) {
            const rolePermissions = pemissions_1.permissions[userRoles];
            for (let permission of rolePermissions) {
                if (requiredPermissions.includes(permission)) {
                    flag = true;
                    break;
                }
            }
        }
        if (flag)
            next();
    }
    catch (e) {
        next({
            statusCode: 403,
            message: "ACCESS DENIED",
        });
    }
};
exports.authPermissions = authPermissions;
