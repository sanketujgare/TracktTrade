import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ExcludedRoutes } from "../routes/routes.types";

export const validateToken =
    (excludedRoutes: ExcludedRoutes) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const isExcludedRoute = excludedRoutes.some(
                (r) => r.path(req.path) && r.method === req.method
            );

            if (isExcludedRoute) {
                return next();
            }

            const token = req.headers["authorization"]?.split(" ")[1];
            if (!token) {
                throw new Error("Access Denied. No valid Token.");
            }

            const { JWT_SECRET } = process.env;

            const payload = verify(token, JWT_SECRET);
            req.currentUser = payload;
            next();
        } catch (e) {
            next({
                statusCode: 401,
                message: "UNAUTHORIZED ACCESS",
            });
        }
    };
