import { Router } from "express";
import { Route } from "../routes/routes.types";
import customerService from "./customer.service";
import { ResponseHandler } from "../utility/response-handler";
import { authPermissions } from "../utility/auth-permissions";
import { getCustomerValidations } from "./customer.validations";

const customerRouter = Router();

customerRouter.get(
    "/allcustomers",
    authPermissions(["viewCustomers"]),

    async (req, res, next) => {
        try {
            const result = await customerService.getAllCustomers();
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

customerRouter.get(
    "customer/:mobilenumber",
    authPermissions(["viewCustomers"]),
    ...getCustomerValidations,
    async (req, res, next) => {
        try {
            const mobileNumber = req.params.mobilenumber;
            console.log(mobileNumber);
            const result = await customerService.getSpecificCustomer(
                mobileNumber
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);
export default new Route("/customer", customerRouter);
