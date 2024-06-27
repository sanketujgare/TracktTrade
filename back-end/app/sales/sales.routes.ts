import { Router } from "express";
import { Route } from "../routes/routes.types";
import salesService from "./sales.service";
import { ResponseHandler } from "../utility/response-handler";
import { authPermissions } from "../utility/auth-permissions";
import { dateRangeValidations, salesValidations } from "./sales.validation";
import salesModel from "./sales.schema";

const salesRouter = Router();

salesRouter.post(
    "/create-sales",
    authPermissions(["createSales"]),
    ...salesValidations,
    async (req, res, next) => {
        try {
            const result = await salesService.createSales(req.body);
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

salesRouter.get(
    "/salesperproduct",
    authPermissions(["viewSalesPerProduct"]),
    ...dateRangeValidations,
    async (req, res, next) => {
        try {
            const { startdate, enddate, distributorId } = req.query;
            const start = new Date(startdate as string);
            const end = new Date(enddate as string);
            const userId = distributorId as string;
            const result = await salesService.getSalesPerProduct(
                start,
                end,
                userId
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

salesRouter.get(
    "/topperformers",
    authPermissions(["viewTopPerformers"]),
    ...dateRangeValidations,
    async (req, res, next) => {
        try {
            const { startdate, enddate } = req.query;
            const start = new Date(startdate as string);
            const end = new Date(enddate as string);

            const result = await salesService.getTopPerformers(start, end);
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

salesRouter.get(
    "/topselling",
    authPermissions(["viewTopSelling"]),
    ...dateRangeValidations,
    async (req, res, next) => {
        try {
            const { startdate, enddate, distributorId } = req.query;
            const start = new Date(startdate as string);
            const end = new Date(enddate as string);
            const userId = distributorId as string;

            const result = await salesService.getTopSellingProducts(
                start,
                end,
                userId
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

export default new Route("/sales", salesRouter);
