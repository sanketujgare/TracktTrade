import { Router } from "express";
import { Route } from "../routes/routes.types";
import {
    getAndDeleteValidations,
    productValidations,
} from "./product.validations";
import productService from "./product.service";
import { ResponseHandler } from "../utility/response-handler";
import { authPermissions } from "../utility/auth-permissions";
import { permissionsToCreate } from "../utility/pemissions";

const productRouter = Router();

productRouter.post(
    "/add-product",
    authPermissions(permissionsToCreate),
    ...productValidations,
    async (req, res, next) => {
        try {
            const manufacturerId = req.currentUser._id;
            const result = await productService.addProduct(
                req.body,
                manufacturerId
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

productRouter.get(
    "/allproducts",
    authPermissions(["viewProducts"]),
    async (req, res, next) => {
        try {
            const result = await productService.getAllProduct();
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

productRouter.put(
    "/update/:id",
    authPermissions(["updateProduct"]),

    async (req, res, next) => {
        try {
            const productId = req.params.id;
            const userId = req.currentUser._id;

            const result = await productService.updateProduct(
                req.body,
                productId,
                userId
            );

            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

productRouter.delete(
    "/delete/:id",
    authPermissions(["deleteProduct"]),
    ...getAndDeleteValidations,
    async (req, res, next) => {
        try {
            const productId = req.params.id;
            const result = await productService.deleteProduct(productId);
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);
export default new Route("/product", productRouter);
