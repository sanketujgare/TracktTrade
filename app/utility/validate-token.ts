import { verify } from "jsonwebtoken";
import { match, MatchFunction } from "path-to-regexp";
import { Request, Response, NextFunction } from "express";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type ExcludedRoute = {
  path: MatchFunction<any>;
  method: Method;
};
type ExcludedRoutes = ExcludedRoute[];

export const excludedRoutes: ExcludedRoutes = [
  {
    path: match("/auth/login"),
    method: "POST",
  },
  {
    path: match("/auth/signup"),
    method: "POST",
  },
];

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
      //   console.log(req.currentUser);
      next();
    } catch (e) {
      next({
        statusCode: 401,
        message: "UNAUTHORIZED ACCESS",
      });
    }
  };
