import { Router } from "express";
import { Route } from "../routes/routes.types";
import inventoyService, { updateInventory } from "./inventoy.service";
import { ResponseHandler } from "../utility/response-handler";
import { inventoryValidations } from "./inventory.validations";

const inventoryRouter = Router();

inventoryRouter.get("/getinventory/:userid", (req, res, next) => {
  try {
    const userId = req.params.userid || req.currentUser._id;
    //   const result =
  } catch (e) {
    next(e);
  }
});

inventoryRouter.put("/update", ...inventoryValidations, (req, res, next) => {
  try {
    const manufacturerId = req.currentUser._id;
    const result = inventoyService.updateInventory(
      manufacturerId,
      req.body.inventory
    );
    res.send(new ResponseHandler(result));
  } catch (e) {
    next(e);
  }
});

export default new Route("/inventory", inventoryRouter);
