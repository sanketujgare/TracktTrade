import merchandiseModel from "./merchandise.schema";
import { IMerchandiseSchema } from "./merchandise.types";

export const insertOne = (merchandise: IMerchandiseSchema) => {
    const newMerchandise = new merchandiseModel(merchandise);
    newMerchandise.save();
    return newMerchandise;
};

export const getAllMerchandise = async () => {
    const merchandise = await merchandiseModel.find();

    return merchandise;
};
export default {
    insertOne,
    getAllMerchandise,
};
