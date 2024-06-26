import inventoyService from "../inventory/inventory.service";
import userService from "../users/user.service";
import orderRepo from "./order.repo";
import { orderResponses } from "./order.responses";
import { IOrderSchema, IStatusUpdate, statusUpdate } from "./orders.types";

export const placeOrder = (order: IOrderSchema) => {
    try {
        const newOrder = orderRepo.placeOrder(order);
        if (!newOrder) throw orderResponses.CAN_NOT_PLACE_ORDER;
        return orderResponses.ORDER_PLACED_SUCCESSFULLY;
    } catch (e) {
        throw e;
    }
};

export const updateOrderStatus = async (
    updates: IStatusUpdate,
    orderId: string,
    manufacturerId: string
) => {
    try {
        const orderToComplete = await orderRepo.getSpecificOrder(orderId);
        const user = await userService.getUserById(manufacturerId);

        if (orderToComplete && user) {
            await inventoyService.checkInventoryLevel(
                user,
                orderToComplete.products
            );

            // transaction
            await inventoyService.updateInventory(
                manufacturerId,
                orderToComplete.products.map((product) => ({
                    productId: product.productId,
                    quantity: -product.quantity,
                }))
            );

            await inventoyService.updateInventory(
                orderToComplete.distributorId,
                orderToComplete.products
            );

            const isUpdated = await orderRepo.updateOrderStatus(
                updates,
                orderId
            );

            if (!isUpdated) {
                throw orderResponses.CAN_NOT_UPDATE_ORDER;
            }
            return orderResponses.ORDER_STATUS_UPDATED;
        } else {
            throw orderResponses.ORDER_OR_USER_NOT_FOUND;
        }
    } catch (e) {
        throw e;
    }
};

export const getAllOrders = async (
    status: string,
    page: number,
    limit: number
) => {
    try {
        const pipeline = [
            {
                $match: {
                    status: status,
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "distributorId",
                    foreignField: "_id",
                    as: "distributor",
                },
            },
            {
                $unwind: "$distributor",
            },
            {
                $lookup: {
                    from: "products",
                    localField: "products.productId",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
            {
                $project: {
                    _id: 1,
                    distributorId: 1,
                    distributorName: "$distributor.name",
                    status: 1,
                    products: {
                        $map: {
                            input: "$products",
                            as: "p",
                            in: {
                                productId: "$$p.productId",
                                quantity: "$$p.quantity",
                                productName: {
                                    $arrayElemAt: [
                                        {
                                            $map: {
                                                input: {
                                                    $filter: {
                                                        input: "$productDetails",
                                                        as: "pd",
                                                        cond: {
                                                            $eq: [
                                                                "$$pd._id",
                                                                "$$p.productId",
                                                            ],
                                                        },
                                                    },
                                                },
                                                as: "filteredProduct",
                                                in: "$$filteredProduct.productName",
                                            },
                                        },
                                        0,
                                    ],
                                },
                            },
                        },
                    },
                },
            },
            { $skip: (page - 1) * limit },
            { $limit: limit },
        ];
        const orders = await orderRepo.aggregate(pipeline);
        if (!orders) throw orderResponses.ORDERS_NOT_FOUND;
        return orders;
    } catch (e) {
        throw e;
    }
};

export default {
    getAllOrders,
    placeOrder,
    updateOrderStatus,
};
