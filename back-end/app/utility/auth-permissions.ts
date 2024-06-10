import { Request, Response, NextFunction } from "express";
import { permissions, Role, roles } from "./pemissions";

export const authPermissions =
    (requiredPermissions: string[]) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const userRoles: Role = req.currentUser.role;
            let flag = false;
            if (permissions[userRoles]) {
                const rolePermissions = permissions[userRoles];
                for (let permission of rolePermissions) {
                    if (requiredPermissions.includes(permission)) {
                        flag = true;
                        break;
                    }
                }
            }
            if (flag) next();
        } catch (e) {
            next({
                statusCode: 403,
                message: "ACCESS DENIED",
            });
        }
    };
