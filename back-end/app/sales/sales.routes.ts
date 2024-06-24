import { Router } from "express";
import { Route } from "../routes/routes.types";
import salesService from "./sales.service";
import { ResponseHandler } from "../utility/response-handler";
import { authPermissions } from "../utility/auth-permissions";
import { salesValidations } from "./sales.validation";
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

salesRouter.get("/topperformers", async (req, res, next) => {
    try {
        console.log("here");
        const results = await salesModel.aggregate([
            {
                $group: {
                    _id: "$distributorId",
                    totalRevenue: { $sum: "$totalPrice" },
                },
            },
            { $sort: { totalRevenue: -1 } },
            { $limit: 10 },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "distributorDetails",
                },
            },
            { $unwind: "$distributorDetails" },
            {
                $project: {
                    distributorId: "$_id",
                    totalRevenue: 1,
                    distributorName: "$distributorDetails.name",
                    _id: 0,
                },
            },
        ]);
        res.send(new ResponseHandler(results));
    } catch (e) {
        next(e);
    }
});
export default new Route("/sales", salesRouter);
