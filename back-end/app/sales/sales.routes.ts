import { Router } from "express";
import { Route } from "../routes/routes.types";
import salesService from "./sales.service";
import { ResponseHandler } from "../utility/response-handler";

const salesRouter = Router();

salesRouter.post("/create-sales", async (req, res, next) => {
    try {
        const result = await salesService.createSales(req.body);
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
});
export default new Route("/sales", salesRouter);
