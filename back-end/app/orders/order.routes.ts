import { Router } from "express";
import { Route } from "../routes/routes.types";
import orderService from "./order.service";
import { ResponseHandler } from "../utility/response-handler";
import { authPermissions } from "../utility/auth-permissions";
import { orderValidations, UpdateOrderValidations } from "./order.validations";

const orderRouter = Router();

orderRouter.get(
    "/allorder/:field/:page/:limit",
    authPermissions(["viewOrders"]),
    async (req, res, next) => {
        try {
            const { page, limit } = req.params;
            const status = req.params.field;
            const result = await orderService.getAllOrders(
                status,
                parseInt(page),
                parseInt(limit)
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

orderRouter.post(
    "/placeorder",
    authPermissions(["placeOrder"]),
    ...orderValidations,
    (req, res, next) => {
        try {
            const result = orderService.placeOrder(req.body);
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

orderRouter.put(
    "/update/:orderid",
    authPermissions(["updateOrder"]),
    ...UpdateOrderValidations,
    async (req, res, next) => {
        try {
            const updates = req.body;
            const manufacturerId = req.currentUser._id;
            const orderId = req.params.orderid;

            const result = await orderService.updateOrderStatus(
                updates,
                orderId,
                manufacturerId
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);
export default new Route("/order", orderRouter);
