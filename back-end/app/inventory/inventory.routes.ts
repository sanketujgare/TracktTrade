import { Router } from "express";
import { Route } from "../routes/routes.types";
import inventoryService, { updateInventory } from "./inventoy.service";
import { ResponseHandler } from "../utility/response-handler";
import { inventoryValidations } from "./inventory.validations";

const inventoryRouter = Router();

inventoryRouter.get("/getinventory", async (req, res, next) => {
    try {
        const userId = req.currentUser._id;
        const result = await inventoryService.getInventory(userId);
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
});

inventoryRouter.get("/getinventory/:id", async (req, res, next) => {
    try {
        const userId = req.params.id;
        const result = await inventoryService.getInventory(userId);
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
});

inventoryRouter.put(
    "/update",
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
