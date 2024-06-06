import { Router } from "express";
import { Route } from "../routes/routes.types";
import userService from "./user.service";
import { ResponseHandler } from "../utility/response-handler";
import {
  assignMeterValidations,
  getUsersValidations,
  userValidations,
} from "./user.validations";

import { authPermissions } from "../utility/auth-permissions";

import {
  permissionsToCreate,
  permissionsToViewUser,
} from "../utility/pemissions";

const userRouter = Router();

userRouter.post(
  "/create-user",
  authPermissions(permissionsToCreate),
  ...userValidations,
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
  "get-user/:userid",
  authPermissions(permissionsToViewUser),
  (req, res, next) => {
    try {
      const userId = req.params.userid;
      // const result =
    } catch (e) {
      next(e);
    }
  }
);

export default new Route("/users", userRouter);
