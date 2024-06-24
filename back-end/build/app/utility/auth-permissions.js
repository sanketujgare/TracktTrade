"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authPermissions = void 0;
const pemissions_1 = require("./pemissions");
const authPermissions = (requiredPermissions) => (req, res, next) => {
    try {
        const userRole = req.currentUser.role;
        let flag = false;
        if (pemissions_1.permissions[userRole]) {
            const rolePermissions = pemissions_1.permissions[userRole];
            for (let permission of rolePermissions) {
                if (requiredPermissions.includes(permission)) {
                    flag = true;
                    break;
                }
            }
        }
        if (flag) {
            next();
        }
        else {
            throw "";
        }
    }
    catch (e) {
        next({
            statusCode: 403,
            message: "ACCESS DENIED",
        });
    }
};
exports.authPermissions = authPermissions;
