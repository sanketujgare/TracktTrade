import { Router } from "express";
import { Route } from "../routes/routes.types";
import authService from "./auth.service";
import { ResponseHandler } from "../utility/response-handler";
import { loginValidations } from "./auth.validations";
const authRouter = Router();

authRouter.post("/login", ...loginValidations, async (req, res, next) => {
    try {
        const result = await authService.login(req.body);
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
});

authRouter.post("/logout", (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        const result = authService.logout(token || "");
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
});
export default new Route("/auth", authRouter);
