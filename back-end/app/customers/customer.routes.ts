import { Router } from "express";
import { Route } from "../routes/routes.types";

const customerRouter = Router();

export default new Route("/customer", customerRouter);
