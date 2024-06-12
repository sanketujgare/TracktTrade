import { Router } from "express";
import { Route } from "../routes/routes.types";
import orderService from "./order.service";
import { ResponseHandler } from "../utility/response-handler";

const orderRouter = Router();

orderRouter.post("/placeorder", (req, res, next) => {
    try {
        const result = orderService.placeOrder(req.body);
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
});

orderRouter.put("/update/:orderid", async (req, res, next) => {
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
});
export default new Route("/order", orderRouter);
