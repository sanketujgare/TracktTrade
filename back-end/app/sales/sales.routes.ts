import { Router } from "express";
import { Route } from "../routes/routes.types";

const salesRouter = Router();

export default new Route("/sales", salesRouter);
