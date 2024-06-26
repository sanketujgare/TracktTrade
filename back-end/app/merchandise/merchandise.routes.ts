import { Router } from "express";
import { Route } from "../routes/routes.types";
import {
    approveValidations,
    deleteAndUpdateValidation,
    merchandiseValidations,
    redeemRequestValidation,
} from "./merchandise.validations";
import merchandiseService from "./merchandise.service";
import { ResponseHandler } from "../utility/response-handler";
import { authPermissions } from "../utility/auth-permissions";
import { permissionsToCreate } from "../utility/pemissions";

const merchandiseRouter = Router();

merchandiseRouter.post(
    "/add-merchandise",
    authPermissions(permissionsToCreate),
    ...merchandiseValidations,
    (req, res, next) => {
        try {
            const manufacturerId = req.currentUser._id;
            const result = merchandiseService.addMerchandise(
                req.body,
                manufacturerId
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

merchandiseRouter.get(
    "/allmerchandise/:page/:limit",
    authPermissions(["viewMerchandise"]),
    async (req, res, next) => {
        try {
            const { page, limit } = req.params;
            const result = await merchandiseService.getAllMerchandise(
                parseInt(page),
                parseInt(limit)
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

merchandiseRouter.get(
    "/request/:status/:page/:limit",
    authPermissions(["viewRedeemRequest"]),
    async (req, res, next) => {
        try {
            const { status, page, limit } = req.params;
            const distributorId = req.query.userid as string;

            const result = await merchandiseService.getMerchandiseRequests(
                status,
                parseInt(page),
                parseInt(limit),
                distributorId
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

merchandiseRouter.post(
    "/redeem",
    authPermissions(["redeemMerchandise"]),
    ...redeemRequestValidation,
    async (req, res, next) => {
        try {
            const result = await merchandiseService.reedeemMerchandises(
                req.body
            );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

merchandiseRouter.put(
    "/approve",
    authPermissions(["approveMerchandise"]),
    ...approveValidations,
    async (req, res, next) => {
        try {
            const result =
                await merchandiseService.updateMerchandiseRequestStatus(
                    req.body
                );
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

merchandiseRouter.put("/update/:id", async (req, res, next) => {
    try {
        const manufacturerId = req.currentUser._id;
        const merchandiseId = req.params.id;
        const result = await merchandiseService.findByIdAndUpdate(
            merchandiseId,
            req.body,
            manufacturerId
        );
        res.send(new ResponseHandler(result));
    } catch (e) {
        next(e);
    }
});

merchandiseRouter.delete(
    "/delete/:id",
    authPermissions(["deleteMerchandise"]),
    ...deleteAndUpdateValidation,
    async (req, res, next) => {
        try {
            const merchandiseId = req.params.id;
            const result = await merchandiseService.deleteById(merchandiseId);
            res.send(new ResponseHandler(result));
        } catch (e) {
            next(e);
        }
    }
);

export default new Route("/merchandise", merchandiseRouter);
