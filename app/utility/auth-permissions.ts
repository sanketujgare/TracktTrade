import { Request, Response, NextFunction } from "express";
import { permissions, Role, roles } from "../utility/pemissions";

export const authPermissions =
  (requiredPermissions: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRoles: Role[] = req.currentUser.role;
      for (let role of userRoles) {
        if (permissions[role]) {
          const rolePermissions = permissions[role];

          for (let permission of rolePermissions) {
            if (requiredPermissions.includes(permission)) {
              next();
            }
          }
        }
      }
    } catch (e) {
      next({
        statusCode: 403,
        message: "ACCESS DENIED",
      });
    }
  };
