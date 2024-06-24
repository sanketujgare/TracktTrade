import { model, Types } from "mongoose";
import { BaseSchema } from "../utility/base.schema";

const notificationSchema = new BaseSchema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    viewedBy: [
        {
            type: Types.ObjectId,
        },
    ],
});

const notificationModel = model("notifications", notificationSchema);
export default notificationModel;
