import customerRepo, { findByMobileNumber } from "./customer.repo";
import { customerResponses } from "./customer.responses";
import { customerSchema, ICustomerSchema } from "./customer.types";

export const updateCustomerDetails = async (
    customerDetails: Partial<ICustomerSchema>,
    salesId: string
) => {
    try {
        const sale = { salesId: salesId };

        if (!customerDetails.mobileNumber) throw "";

        // try using upsert in mongo
        const user = await customerRepo.findByMobileNumber(
            customerDetails.mobileNumber
        );

        if (user) {
            let purchaceHistory = user.purchaseHistory;

            purchaceHistory.push(sale);
            await customerRepo.updatePurchaseHistroy(
                purchaceHistory,
                user._id.toString()
            );
            return customerResponses.PURCHACE_HISTORY_UPDATED;
        }

        const newCustomer = customerRepo.addCustomer(customerDetails);
        if (!newCustomer) throw customerResponses.CANNOT_CREATE_CUSTOMER;

        let purchaceHistory = newCustomer.purchaseHistory;
        purchaceHistory.push(sale);
        await customerRepo.updatePurchaseHistroy(
            purchaceHistory,
            newCustomer._id.toString()
        );

        return customerResponses.NEW_CUSTOMER_CREATED;
    } catch (e) {
        throw e;
    }
};

export const getAllCustomers = async () => {
    try {
        const customers = await customerRepo.getAllCustomers();
        if (!customers) throw customerResponses.NO_CUSTOMERS_FOUND;
        return customers;
    } catch (e) {
        throw e;
    }
};
export const getSpecificCustomer = async (mobileNumber: string) => {
    try {
        const customer = await findByMobileNumber(mobileNumber);
        if (!customer) throw customerResponses.CUSTOMER_NOT_FOUND;
        return customer;
    } catch (e) {
        throw e;
    }
};

export default {
    updateCustomerDetails,
    getAllCustomers,
    getSpecificCustomer,
};
