import orderModel from "./order.schema";
import { IOrderSchema, IStatusUpdate, orderSchema } from "./orders.types";

export const placeOrder = (order: IOrderSchema) => {
    const newOrder = new orderModel(order);
    newOrder.save();
    return newOrder;
};

export const getAllorders = async () => {
    const orders = await orderModel.find();
    return orders;
};

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
};
