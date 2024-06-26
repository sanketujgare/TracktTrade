import merchandiseModel from "./merchandise.schema";
import {
    IMerchandiseSchema,
    IUpdateMerchandiseSchema,
} from "./merchandise.types";

export const insertOne = (merchandise: IMerchandiseSchema) => {
    const newMerchandise = new merchandiseModel(merchandise);
    newMerchandise.save();
    return newMerchandise;
};

export const getAllMerchandise = async (page: number, limit: number) => {
    const merchandise = await merchandiseModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit);

    return merchandise;
};

export const getMerchandiseById = async (merchandiseId: string) => {
    const merchandise = await merchandiseModel.findById(merchandiseId);
    return merchandise;
};

export const findByIdAndUpdate = (
    merchandiseId: string,
    updates: IUpdateMerchandiseSchema
) =>
    merchandiseModel.findByIdAndUpdate(
        { _id: merchandiseId },
        { $set: updates }
    );

export const deleteById = (merchandiseId: string) =>
    merchandiseModel.findByIdAndDelete({ _id: merchandiseId });

export default {
    insertOne,
    getAllMerchandise,
    getMerchandiseById,
    deleteById,
    findByIdAndUpdate,
};
