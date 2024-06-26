import { Router } from "express";
import { Route } from "../routes/routes.types";
import inventoryService, { updateInventory } from "./inventory.service";
import { ResponseHandler } from "../utility/response-handler";
import { inventoryValidations } from "./inventory.validations";
import { authPermissions } from "../utility/auth-permissions";

const inventoryRouter = Router();

inventoryRouter.get(
    "/getinventory",
    authPermissions(["viewOwnInventory"]),
    async (req, res, next) => {
        try {
            // const { page, limit } = req.params;
            const userId = req.currentUser._id;
            const result = await inventoryService.getInventory(userId);
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

inventoryRouter.get(
    "/getinventory/:id",
    authPermissions(["viewInventory"]),
    async (req, res, next) => {
        try {
            const userId = req.params.id;
            const result = await inventoryService.getInventory(userId);
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

inventoryRouter.put(
    "/update",
    authPermissions(["updateInventory"]),
    ...inventoryValidations,
    async (req, res, next) => {
        try {
            const manufacturerId = req.currentUser._id;
            const result = await inventoryService.updateManufacturersInventory(
                manufacturerId,
                req.body
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

export default new Route("/inventory", inventoryRouter);
