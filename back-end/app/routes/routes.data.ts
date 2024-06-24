import { match } from "path-to-regexp";
import authRoutes from "../auth/auth.routes";
import orderRoutes from "../orders/order.routes";
import productRoutes from "../Products/product.routes";
import salesRoutes from "../sales/sales.routes";
import userRoutes from "../users/user.routes";
import { ExcludedRoutes } from "./routes.types";
import merchandiseRoutes from "../merchandise/merchandise.routes";
import inventoryRoutes from "../inventory/inventory.routes";
import customerRoutes from "../customers/customer.routes";

export const routes = [
    authRoutes,
    userRoutes,
    productRoutes,
    orderRoutes,
    merchandiseRoutes,
    salesRoutes,
    inventoryRoutes,
    customerRoutes,
];

export const excludedRoutes: ExcludedRoutes = [
    {
        path: match("/auth/login"),
        method: "POST",
    },
    {
        path: match("/auth/signup"),
        method: "POST",
    },
];
