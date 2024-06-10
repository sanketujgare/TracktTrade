import userService from "../users/user.service";
import salesRepo from "./sales.repo";
import { salesResponses } from "./sales.responses";
import { ISalesSchema } from "./sales.types";

export const createSales = async (sale: ISalesSchema) => {
    try {
        const totalPrice = calculateTotalPrice(sale);
        if (totalPrice) sale.totalPrice = totalPrice;

        const newSale = salesRepo.createSales(sale);
        if (!newSale) return salesResponses.CAN_NOT_UPDATE_SALES;

        const customerDetails = extractCustomerDetails(newSale);

        if (customerDetails) {
            const updateCustomerDetails =
                await userService.updateCustomerDetails(customerDetails);
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
        return sale.products.reduce((totalPriice, product) => {
            if (product.currentPrice && product.quantity) {
                return totalPriice + product.currentPrice * product.quantity;
            }
            return totalPriice;
        }, 0);
    } catch (e) {
        throw e;
    }
};

export const extractCustomerDetails = (sale: ISalesSchema) => {
    try {
        const { customerName, customerEmail, customerMobileNumber, _id } = sale;
        const customerDetails = {
            name: customerName,
            email: customerEmail,
            mobileNumber: customerMobileNumber,
            salesId: _id,
        };
        return customerDetails;
    } catch (e) {
        throw e;
    }
};

export default {
    createSales,
};
