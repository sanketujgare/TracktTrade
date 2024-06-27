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
exports.getTopSellingProducts = exports.getTopPerformers = exports.getSalesPerProduct = exports.extractCustomerDetails = exports.calculateTotalPrice = exports.createSales = void 0;
const customer_service_1 = __importDefault(require("../customers/customer.service"));
const inventory_service_1 = __importDefault(require("../inventory/inventory.service"));
const user_service_1 = __importDefault(require("../users/user.service"));
const sales_repo_1 = __importDefault(require("./sales.repo"));
const sales_responses_1 = require("./sales.responses");
const createSales = (sale) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.default.getUserById(sale.distributorId);
        // aggregation
        yield inventory_service_1.default.checkInventoryLevel(user, sale.products);
        yield inventory_service_1.default.updateInventory(user._id.toString(), sale.products.map((product) => ({
            productId: product.productId,
            quantity: -product.quantity,
        })));
        const totalPrice = (0, exports.calculateTotalPrice)(sale);
        sale.totalPrice = totalPrice;
        const points = totalPrice / 1000;
        // transactional
        yield user_service_1.default.updatePointesEarned(sale.distributorId, points);
        const newSale = sales_repo_1.default.createSales(sale);
        if (!newSale)
            throw sales_responses_1.salesResponses.CAN_NOT_UPDATE_SALES;
        const customerDetails = (0, exports.extractCustomerDetails)(newSale);
        if (customerDetails) {
            const updateCustomerDetails = yield customer_service_1.default.updateCustomerDetails(customerDetails, newSale._id.toString());
            if (updateCustomerDetails) {
                return sales_responses_1.salesResponses.SALES_UPDATED_SUCCESSFULLY;
            }
        }
    }
    catch (e) {
        throw e;
    }
});
exports.createSales = createSales;
const calculateTotalPrice = (sale) => {
    try {
        const totalPrice = sale.products.reduce((totalPrice, product) => {
            if (product.currentPrice && product.quantity) {
                return totalPrice + product.currentPrice * product.quantity;
            }
            return totalPrice;
        }, 0);
        return totalPrice;
    }
    catch (e) {
        throw e;
    }
};
exports.calculateTotalPrice = calculateTotalPrice;
const extractCustomerDetails = (sale) => {
    try {
        const { customerName, customerEmail, customerMobileNumber } = sale;
        const customerDetails = {
            name: customerName,
            email: customerEmail,
            mobileNumber: customerMobileNumber,
        };
        return customerDetails;
    }
    catch (e) {
        throw e;
    }
};
exports.extractCustomerDetails = extractCustomerDetails;
const getSalesPerProduct = (startDate, endDate, distributorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matchStage = {
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
        const sales = yield sales_repo_1.default.aggregate(pipeline);
        if (!sales || sales.length === 0)
            throw sales_responses_1.salesResponses.NO_DATA_FOUND;
        return sales;
    }
    catch (e) {
        throw e;
    }
});
exports.getSalesPerProduct = getSalesPerProduct;
const getTopPerformers = (startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () {
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
        const topPerformers = yield sales_repo_1.default.aggregate(pipeline);
        if (!topPerformers)
            throw sales_responses_1.salesResponses.NO_DATA_FOUND;
        return topPerformers;
    }
    catch (e) {
        throw e;
    }
});
exports.getTopPerformers = getTopPerformers;
const getTopSellingProducts = (startDate, endDate, distributorId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const matchStage = {
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
        const products = yield sales_repo_1.default.aggregate(pipeline);
        if (!products)
            throw sales_responses_1.salesResponses.NO_DATA_FOUND;
        return products;
    }
    catch (e) {
        throw e;
    }
});
exports.getTopSellingProducts = getTopSellingProducts;
exports.default = {
    createSales: exports.createSales,
    getSalesPerProduct: exports.getSalesPerProduct,
    getTopPerformers: exports.getTopPerformers,
    getTopSellingProducts: exports.getTopSellingProducts,
};
