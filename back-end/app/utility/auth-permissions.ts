import { Request, Response, NextFunction } from "express";
import { permissions, Role } from "./pemissions";

export const authPermissions =
    (requiredPermissions: string[]) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const userRole: Role = req.currentUser.role;
            let flag = false;
            if (permissions[userRole]) {
                const rolePermissions = permissions[userRole];
                for (let permission of rolePermissions) {
                    if (requiredPermissions.includes(permission)) {
                        flag = true;
                        break;
                    }
                }
            }
            if (flag) {
                next();
            } else {
                throw "";
            }
        } catch (e) {
            next({
                statusCode: 403,
                message: "ACCESS DENIED",
            });
        }
    };
