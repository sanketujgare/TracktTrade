import merchandiseRepo from "./merchandise.repo";
import { merchandiseResponses } from "./merchandise.responses";
import { IMerchandiseSchema } from "./merchandise.types";

export const addMerchandise = (
    merchandise: IMerchandiseSchema,
    manufacturerId: string
) => {
    try {
        merchandise.createdBy = manufacturerId;
        const newMerchandise = merchandiseRepo.insertOne(merchandise);
        if (!newMerchandise) throw merchandiseResponses.CAN_NOT_ADD_MERCHANDISE;
        return merchandiseResponses.MERCHANDISE_ADDED;
    } catch (e) {
        throw e;
    }
};

export const getAllMerchandise = async () => {
    try {
        const merchandise = await merchandiseRepo.getAllMerchandise();
        if (!merchandise) throw merchandiseResponses.MERCHANDISE_NOT_FOUND;

        return merchandise;
    } catch (e) {
        throw e;
    }
};

export default {
    addMerchandise,
    getAllMerchandise,
};
