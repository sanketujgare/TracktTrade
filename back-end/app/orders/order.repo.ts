import orderModel from "./order.schema";
import { IOrderSchema, IStatusUpdate, orderSchema } from "./orders.types";

export const placeOrder = (order: IOrderSchema) => {
    const newOrder = new orderModel(order);
    newOrder.save();
    return newOrder;
};

export const getAllorders = async (
    status: string,
    page: number,
    limit: number
) => {
    const orders = await orderModel
        .find({ status: status })
        .skip((page - 1) * limit)
        .limit(limit);
    return orders;
};

export const aggregate = (pipeline: any) => orderModel.aggregate(pipeline);
export const getSpecificOrder = async (orderId: string) => {
    const order = await orderModel.findById(orderId);
    return order;
};

export const updateOrderStatus = async (
    updates: IStatusUpdate,
    orderId: string
) => {
    const isUpdated = await orderModel.findByIdAndUpdate(orderId, updates);
    return isUpdated;
};

export default {
    placeOrder,
    getAllorders,
    getSpecificOrder,
    updateOrderStatus,
    aggregate,
};
