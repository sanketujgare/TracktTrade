import { model } from "mongoose";
import { BaseSchema } from "../utility/base.schema";
import { IMerchandiseSchema } from "./merchandise.types";

const merchandiseSchema = new BaseSchema({
    merchandiseName: {
        type: String,
    },
    merchandiseDescription: {
        type: String,
    },
    pointsRequired: {
        type: Number,
        required: true,
    },
    merchandiseImage: {
        type: String,
    },
});

const merchandiseModel = model<IMerchandiseSchema>(
    "Merchandise",
    merchandiseSchema
);
export default merchandiseModel;
