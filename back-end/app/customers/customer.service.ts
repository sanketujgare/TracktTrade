import customerRepo from "./customer.repo";
import { customerResponses } from "./customer.responses";
import { ICustomerSchema } from "./customer.types";

export const updateCustomerDetails = async (
    customerDetails: Partial<ICustomerSchema>,
    salesId: string
) => {
    try {
        let user;
        if (customerDetails.mobileNumber) {
            user = await customerRepo.findByMobileNumber(
                customerDetails.mobileNumber
            );
        }

        if (user) {
            let purchaceHistory = user.purchaseHistory;
            if (salesId && purchaceHistory) {
                const sale = { salesId: salesId };
                purchaceHistory.push(sale);
            }

            if (purchaceHistory) {
                await customerRepo.updatePurchaseHistroy(
                    purchaceHistory,
                    user._id.toString()
                );
                return customerResponses.PURCHACE_HISTORY_UPDATED;
            }
        }
        if (salesId) {
            customerDetails.purchaseHistory?.push({ salesId });
        }

        const newCustomer = customerRepo.addCustomer(customerDetails);
        if (!newCustomer) throw customerResponses.CANNOT_CREATE_CUSTOMER;
        return customerResponses.NEW_CUSTOMER_CREATED;
    } catch (e) {
        throw e;
    }
};

export default {
    updateCustomerDetails,
};
