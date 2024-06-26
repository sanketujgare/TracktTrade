import customerService from "../customers/customer.service";
import inventoryService from "../inventory/inventory.service";
import userService from "../users/user.service";
import salesRepo from "./sales.repo";
import { salesResponses } from "./sales.responses";
import { ISalesSchema } from "./sales.types";

export const createSales = async (sale: ISalesSchema) => {
    try {
        const user = await userService.getUserById(sale.distributorId);

        // aggregation
        await inventoryService.checkInventoryLevel(user, sale.products);

        await inventoryService.updateInventory(
            user._id.toString(),

            sale.products.map((product) => ({
                productId: product.productId,
                quantity: -product.quantity,
            }))
        );

        const totalPrice = calculateTotalPrice(sale);

        sale.totalPrice = totalPrice;
        const points = totalPrice / 1000;

        // transactional
        await userService.updatePointesEarned(sale.distributorId, points);
        const newSale = salesRepo.createSales(sale);

        if (!newSale) throw salesResponses.CAN_NOT_UPDATE_SALES;

        const customerDetails = extractCustomerDetails(newSale);

        if (customerDetails) {
            const updateCustomerDetails =
                await customerService.updateCustomerDetails(
                    customerDetails,
                    newSale._id.toString()
                );
            if (updateCustomerDetails) {
                return salesResponses.SALES_UPDATED_SUCCESSFULLY;
            }
        }
    } catch (e) {
        throw e;
    }
};

export const calculateTotalPrice = (sale: ISalesSchema) => {
    try {
        const totalPrice = sale.products.reduce((totalPrice, product) => {
            if (product.currentPrice && product.quantity) {
                return totalPrice + product.currentPrice * product.quantity;
            }
            return totalPrice;
        }, 0);
        return totalPrice;
    } catch (e) {
        throw e;
    }
};

export const extractCustomerDetails = (sale: ISalesSchema) => {
    try {
        const { customerName, customerEmail, customerMobileNumber } = sale;
        const customerDetails = {
            name: customerName,
            email: customerEmail,
            mobileNumber: customerMobileNumber,
        };
        return customerDetails;
    } catch (e) {
        throw e;
    }
};

export const getSalesPerProduct = async (
    startDate: Date,
    endDate: Date,
    distributorId?: string
) => {
    try {
        const matchStage: any = {
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        };
        if (distributorId) {
            matchStage.distributorId = distributorId;
        }

        const pipeline = [
            {
                $match: matchStage,
            },
            {
                $unwind: "$products",
            },
            {
                $group: {
                    _id: "$products.productId",
                    totalQuantity: { $sum: "$products.quantity" },
                    totalRevenue: {
                        $sum: {
                            $multiply: [
                                "$products.quantity",
                                "$products.currentPrice",
                            ],
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
            {
                $unwind: "$productDetails",
            },
            {
                $project: {
                    productId: "$_id",
                    productName: "$productDetails.productName",
                    totalQuantity: 1,
                    totalRevenue: 1,
                },
            },
            {
                $sort: { totalQuantity: -1 },
            },
        ];

        const sales = await salesRepo.aggregate(pipeline);

        if (!sales || sales.length === 0) throw salesResponses.NO_DATA_FOUND;
        return sales;
    } catch (e) {
        throw e;
    }
};

export const getTopPerformers = async (startDate: Date, endDate: Date) => {
    try {
        const pipeline = [
            {
                $match: {
                    createdAt: {
                        $gte: new Date(startDate),
                        $lte: new Date(endDate),
                    },
                },
            },
            {
                $group: {
                    _id: "$distributorId",
                    totalSales: { $sum: "$totalPrice" },
                },
            },
            {
                $sort: { totalSales: -1 },
            },
            {
                $limit: 10,
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "distributorDetails",
                },
            },
            {
                $unwind: "$distributorDetails",
            },
            {
                $project: {
                    _id: 0,
                    distributorId: "$_id",
                    totalSales: 1,
                    distributorName: "$distributorDetails.name",
                },
            },
        ];

        const topPerformers = await salesRepo.aggregate(pipeline);
        if (!topPerformers) throw salesResponses.NO_DATA_FOUND;
        return topPerformers;
    } catch (e) {
        throw e;
    }
};
export const getTopSellingProducts = async (
    startDate: Date,
    endDate: Date,
    distributorId: string
) => {
    try {
        const matchStage: any = {
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate),
            },
        };
        if (distributorId) {
            matchStage.distributorId = distributorId;
        }
        const pipeline = [
            {
                $match: matchStage,
            },
            {
                $unwind: "$products",
            },
            {
                $group: {
                    _id: "$products.productId",
                    totalQuantitySold: { $sum: "$products.quantity" },
                },
            },
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productDetails",
                },
            },
            {
                $unwind: "$productDetails",
            },
            {
                $project: {
                    _id: 0,
                    productId: "$_id",
                    productName: "$productDetails.productName",
                    totalQuantitySold: 1,
                },
            },
            {
                $sort: { totalQuantitySold: -1 },
            },
            {
                $limit: 10,
            },
        ];

        const products = await salesRepo.aggregate(pipeline);

        if (!products) throw salesResponses.NO_DATA_FOUND;
        return products;
    } catch (e) {
        throw e;
    }
};
export default {
    createSales,
    getSalesPerProduct,
    getTopPerformers,
    getTopSellingProducts,
};
