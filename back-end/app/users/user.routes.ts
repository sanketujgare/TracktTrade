import { Router } from "express";
import { Route } from "../routes/routes.types";
import userService from "./user.service";
import { ResponseHandler } from "../utility/response-handler";
import {
    createValidations,
    getAndDeleteValidations,
    updateValidations,
} from "./user.validations";
import { permissionsToCreate, viewUser } from "../utility/pemissions";
import { authPermissions } from "../utility/auth-permissions";
import userRepo from "./user.repo";

const userRouter = Router();

userRouter.post(
    "/create-user",
    authPermissions(permissionsToCreate),
    ...createValidations,
    async (req, res, next) => {
        try {
            const creatorId = req.currentUser._id;
            const creatorEmail = req.currentUser.email;
            const result = await userService.createUser(
                req.body,
                creatorId,
                creatorEmail
            );

            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);
userRouter.get(
    "/profile",
    authPermissions(["viewProfile"]),
    async (req, res, next) => {
        try {
            const userId = req.currentUser._id;
            const result = await userService.getUserById(userId);
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

userRouter.get(
    "/getuser/:id",
    ...getAndDeleteValidations,
    authPermissions(viewUser),

    async (req, res, next) => {
        try {
            const userId = req.params.id;
            const result = await userService.getUserById(userId);
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

userRouter.get(
    "/distributors/:page/:limit",
    authPermissions(viewUser),
    async (req, res, next) => {
        try {
            const { page, limit } = req.params;
            const result = await userService.getAllDistributors(
                parseInt(page),
                parseInt(limit)
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

userRouter.put(
    "/update/:id",
    authPermissions(["updateDistributor"]),
    ...updateValidations,
    async (req, res, next) => {
        try {
            const userId = req.params.id;
            const updatorId = req.currentUser._id;
            const result = await userService.updateUser(
                req.body,
                userId,
                updatorId
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

userRouter.delete(
    "/delete/:id",
    authPermissions(["deleteUser"]),
    ...getAndDeleteValidations,
    async (req, res, next) => {
        try {
            const userId = req.params.id;
            const deletedBy = req.currentUser._id;
            const result = await userService.deleteUserById(userId, deletedBy);
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

export default new Route("/user", userRouter);
