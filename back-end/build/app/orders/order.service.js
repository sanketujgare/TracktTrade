"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllOrders = exports.updateOrderStatus = exports.placeOrder = void 0;
const inventory_service_1 = __importDefault(require("../inventory/inventory.service"));
const user_service_1 = __importDefault(require("../users/user.service"));
const order_repo_1 = __importDefault(require("./order.repo"));
const order_responses_1 = require("./order.responses");
const placeOrder = (order) => {
    try {
        const newOrder = order_repo_1.default.placeOrder(order);
        if (!newOrder)
            throw order_responses_1.orderResponses.CAN_NOT_PLACE_ORDER;
        return order_responses_1.orderResponses.ORDER_PLACED_SUCCESSFULLY;
    }
    catch (e) {
        throw e;
    }
};
exports.placeOrder = placeOrder;
const updateOrderStatus = (updates, orderId, manufacturerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderToComplete = yield order_repo_1.default.getSpecificOrder(orderId);
        const user = yield user_service_1.default.getUserById(manufacturerId);
        if (orderToComplete && user) {
            yield inventory_service_1.default.checkInventoryLevel(user, orderToComplete.products);
            // transaction
            yield inventory_service_1.default.updateInventory(manufacturerId, orderToComplete.products.map((product) => ({
                productId: product.productId,
                quantity: -product.quantity,
            })));
            yield inventory_service_1.default.updateInventory(orderToComplete.distributorId, orderToComplete.products);
            const isUpdated = yield order_repo_1.default.updateOrderStatus(updates, orderId);
            if (!isUpdated) {
                throw order_responses_1.orderResponses.CAN_NOT_UPDATE_ORDER;
            }
            return order_responses_1.orderResponses.ORDER_STATUS_UPDATED;
        }
        else {
            throw order_responses_1.orderResponses.ORDER_OR_USER_NOT_FOUND;
        }
    }
    catch (e) {
        throw e;
    }
});
exports.updateOrderStatus = updateOrderStatus;
const getAllOrders = (status, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
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
        const orders = yield order_repo_1.default.aggregate(pipeline);
        if (!orders)
            throw order_responses_1.orderResponses.ORDERS_NOT_FOUND;
        return orders;
    }
    catch (e) {
        throw e;
    }
});
exports.getAllOrders = getAllOrders;
exports.default = {
    getAllOrders: exports.getAllOrders,
    placeOrder: exports.placeOrder,
    updateOrderStatus: exports.updateOrderStatus,
};
