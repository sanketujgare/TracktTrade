import customerService from "../customers/customer.service";
import inventoyService from "../inventory/inventoy.service";
import userService from "../users/user.service";
import salesRepo from "./sales.repo";
import { salesResponses } from "./sales.responses";
import { ISalesSchema } from "./sales.types";

export const createSales = async (sale: ISalesSchema) => {
    try {
        const user = await userService.getSpecificUser(sale.distributorId);

        await inventoyService.checkInventoryLevel(user, sale.products);

        // await inventoyService.updateInventory(
        //     user._id.toString(),

        //     sale.products.map((product) => ({
        //         productId: product.productId,
        //         quantity: -product.quantity,
        //     }))
        // );

        const totalPrice = calculateTotalPrice(sale);

        sale.totalPrice = totalPrice;
        const points = totalPrice / 1000;

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

export default {
    createSales,
};
