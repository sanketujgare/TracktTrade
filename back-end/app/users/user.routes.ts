import { Router } from "express";
import { Route } from "../routes/routes.types";
import userService from "./user.service";
import { ResponseHandler } from "../utility/response-handler";
import { createValidations } from "./user.validations";

import { permissionsToCreate, viewUser } from "../utility/pemissions";
import { authPermissions } from "../utility/auth-permissions";

const userRouter = Router();

userRouter.post(
    "/create-user",
    authPermissions(permissionsToCreate),
    ...createValidations,
    async (req, res, next) => {
        try {
            const result = await userService.createUser(req.body);
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

userRouter.get(
    "/getuser/:userid",
    authPermissions(viewUser),
    async (req, res, next) => {
        try {
            const userId = req.params.userid;
            const result = userService.getSpecificUser(userId);
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

userRouter.put("/update/:id", async (req, res, next) => {
    try {
        const userId = req.params.id;
        const result = await userService.updateUser(req.body, userId);
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
});

export default new Route("/users", userRouter);
